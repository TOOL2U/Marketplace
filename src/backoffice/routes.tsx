import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Import pages
import Dashboard from './pages/Dashboard';
import Providers from './pages/Providers';
import Bookings from './pages/Bookings';
import Sales from './pages/Sales';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Developers from './pages/Developers';

// Protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    // You can add a loading spinner here
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="providers" 
        element={
          <ProtectedRoute>
            <Providers />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="providers/:id" 
        element={
          <ProtectedRoute>
            <Providers />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="bookings" 
        element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="bookings/:id" 
        element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="sales" 
        element={
          <ProtectedRoute>
            <Sales />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="users" 
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="settings" 
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="developers" 
        element={
          <ProtectedRoute>
            <Developers />
          </ProtectedRoute>
        } 
      />
      
      {/* Redirect to dashboard if path doesn't match */}
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

export default AdminRoutes;