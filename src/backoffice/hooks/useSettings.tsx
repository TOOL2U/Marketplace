import { useState, useEffect } from 'react';
import { 
  settingsApi, 
  PlatformSettings, 
  AdminUser, 
  AdminUserInput 
} from '../api';

export const useSettings = () => {
  const [platformSettings, setPlatformSettings] = useState<PlatformSettings | null>(null);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlatformSettings = async () => {
    try {
      const settings = await settingsApi.getPlatformSettings();
      setPlatformSettings(settings);
    } catch (err) {
      setError('Failed to load platform settings');
      console.error(err);
    }
  };

  const fetchAdminUsers = async () => {
    try {
      const users = await settingsApi.getAdminUsers();
      setAdminUsers(users);
    } catch (err) {
      setError('Failed to load admin users');
      console.error(err);
    }
  };

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchPlatformSettings(),
        fetchAdminUsers()
      ]);
    } catch (err) {
      setError('Failed to load settings');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const updatePlatformSettings = async (settings: Partial<PlatformSettings>) => {
    try {
      const updatedSettings = await settingsApi.updatePlatformSettings(settings);
      setPlatformSettings(prev => ({ ...prev!, ...updatedSettings }));
      return updatedSettings;
    } catch (err) {
      setError('Failed to update platform settings');
      console.error(err);
      throw err;
    }
  };

  const createAdminUser = async (userData: AdminUserInput) => {
    try {
      const newUser = await settingsApi.createAdminUser(userData);
      setAdminUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      setError('Failed to create admin user');
      console.error(err);
      throw err;
    }
  };

  const updateAdminUser = async (id: string, userData: Partial<AdminUserInput>) => {
    try {
      const updatedUser = await settingsApi.updateAdminUser(id, userData);
      setAdminUsers(prev =>
        prev.map(user =>
          user.id === id ? updatedUser : user
        )
      );
      return updatedUser;
    } catch (err) {
      setError('Failed to update admin user');
      console.error(err);
      throw err;
    }
  };

  const deleteAdminUser = async (id: string) => {
    try {
      await settingsApi.deleteAdminUser(id);
      setAdminUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete admin user');
      console.error(err);
      throw err;
    }
  };

  const resetAdminUserPassword = async (id: string) => {
    try {
      const result = await settingsApi.resetAdminUserPassword(id);
      return result;
    } catch (err) {
      setError('Failed to reset admin user password');
      console.error(err);
      throw err;
    }
  };

  return {
    platformSettings,
    adminUsers,
    isLoading,
    error,
    updatePlatformSettings,
    createAdminUser,
    updateAdminUser,
    deleteAdminUser,
    resetAdminUserPassword,
    refetch: loadInitialData
  };
};