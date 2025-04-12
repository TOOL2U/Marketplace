import { api } from './apiClient';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    permissions: string[];
  };
}

interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export const authApi = {
  /**
   * Authenticate admin user
   */
  login: (email: string, password: string) => 
    api.post<LoginResponse>('/admin/auth/login', { email, password }),
  
  /**
   * Verify current authentication token
   */
  verifyToken: () => 
    api.get<LoginResponse>('/admin/auth/verify'),
  
  /**
   * Request password reset
   */
  requestPasswordReset: (email: string) => 
    api.post<{ success: boolean }>('/admin/auth/reset-password', { email }),
  
  /**
   * Reset password with token
   */
  resetPassword: (token: string, newPassword: string) => 
    api.post<ResetPasswordResponse>('/admin/auth/reset-password/confirm', { 
      token, 
      newPassword 
    }),
  
  /**
   * Update current user's password
   */
  updatePassword: (currentPassword: string, newPassword: string) => 
    api.post<{ success: boolean }>('/admin/auth/update-password', {
      currentPassword,
      newPassword
    }),
  
  /**
   * Logout current user
   */
  logout: () => 
    api.post<{ success: boolean }>('/admin/auth/logout', {}),

  /**
   * Register a new user
   */
  register: (name: string, email: string, password: string) => 
    api.post<{ success: boolean; message: string }>('/admin/auth/register', {
      name,
      email,
      password,
    }),
};