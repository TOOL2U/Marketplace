import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AdminRoutes from './routes';

/**
 * Main component for the Admin Dashboard
 * This component wraps all admin routes with the necessary providers
 */
const AdminDashboard: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </AuthProvider>
  );
};

export default AdminDashboard;