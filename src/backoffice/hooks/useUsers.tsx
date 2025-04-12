import { useState, useEffect } from 'react';
import { 
  usersApi, 
  User, 
  UserFilters, 
  UserStats, 
  UserBooking 
} from '../api';

export const useUsers = (initialFilters: UserFilters = {}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<UserFilters>(initialFilters);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { users: fetchedUsers, total: totalUsers } = await usersApi.getUsers(filters);
      setUsers(fetchedUsers);
      setTotal(totalUsers);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserStats = async () => {
    setIsStatsLoading(true);
    try {
      const stats = await usersApi.getUserStats();
      setUserStats(stats);
    } catch (err) {
      setError('Failed to load user statistics');
      console.error(err);
    } finally {
      setIsStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchUserStats();
  }, [JSON.stringify(filters)]);

  const updateFilters = (newFilters: UserFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getUserBookings = async (userId: string, bookingFilters?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<{ bookings: UserBooking[]; total: number }> => {
    try {
      return await usersApi.getUserBookings(userId, bookingFilters);
    } catch (err) {
      setError('Failed to load user bookings');
      console.error(err);
      throw err;
    }
  };

  const updateUserStatus = async (userId: string, status: User['status']) => {
    try {
      const updatedUser = await usersApi.updateUserStatus(userId, status);
      setUsers(prev =>
        prev.map(user =>
          user.id === userId ? updatedUser : user
        )
      );
      // Refresh user stats after status update
      fetchUserStats();
      return updatedUser;
    } catch (err) {
      setError('Failed to update user status');
      console.error(err);
      throw err;
    }
  };

  const createUser = async (userData: Omit<User, 'id' | 'joinedDate' | 'bookingsCount' | 'lastBookingDate' | 'totalSpend'>) => {
    try {
      const newUser = await usersApi.createUser(userData);
      setUsers(prev => [...prev, newUser]);
      fetchUserStats(); // Refresh stats after creating new user
      return newUser;
    } catch (err) {
      setError('Failed to create user');
      console.error(err);
      throw err;
    }
  };

  const updateUser = async (id: string, userData: Partial<Omit<User, 'id'>>) => {
    try {
      const updatedUser = await usersApi.updateUser(id, userData);
      setUsers(prev =>
        prev.map(user =>
          user.id === id ? updatedUser : user
        )
      );
      return updatedUser;
    } catch (err) {
      setError('Failed to update user');
      console.error(err);
      throw err;
    }
  };

  const exportUsers = async (format: 'csv' | 'pdf') => {
    try {
      const blob = await usersApi.exportUsers(filters, format);
      // Create a download link and trigger it
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `users-export.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to export users');
      console.error(err);
      throw err;
    }
  };

  return {
    users,
    total,
    userStats,
    isLoading,
    isStatsLoading,
    error,
    filters,
    updateFilters,
    getUserBookings,
    updateUserStatus,
    createUser,
    updateUser,
    exportUsers,
    refetch: () => {
      fetchUsers();
      fetchUserStats();
    }
  };
};