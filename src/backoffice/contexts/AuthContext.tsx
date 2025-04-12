import React, { createContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'support';
  permissions: string[];
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };
    
    initAuth();
  }, []);

  const checkAuth = async (): Promise<boolean> => {
    const token = localStorage.getItem('admin_token');
    
    if (!token) {
      setUser(null);
      return false;
    }
    
    try {
      // In a real app, verify the token with your backend
      const response = await fetch('/api/admin/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return true;
      } else {
        // Token is invalid
        localStorage.removeItem('admin_token');
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      localStorage.removeItem('admin_token');
      setUser(null);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // In a real app, send credentials to your backend
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const { token, user: userData } = await response.json();
      
      // Store the token
      localStorage.setItem('admin_token', token);
      
      // Set the user
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        checkAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };