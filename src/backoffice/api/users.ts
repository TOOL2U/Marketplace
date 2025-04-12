import { api } from './apiClient';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'blocked';
  joinedDate: string;
  bookingsCount: number;
  lastBookingDate: string | null;
  avatarUrl?: string;
  totalSpend: number;
}

export interface UserFilters {
  status?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface UserStats {
  totalUsers: number;
  newUsersThisMonth: number;
  activeUsers: number;
  blockedUsers: number;
  averageBookingsPerUser: number;
  averageUserSpend: number;
}

export interface UserBooking {
  id: string;
  serviceType: string;
  provider: {
    id: string;
    name: string;
  };
  date: string;
  status: string;
  price: number;
}

export const usersApi = {
  /**
   * Get all users with optional filters
   */
  getUsers: (filters?: UserFilters) => 
    api.get<{ users: User[]; total: number }>('/admin/users', { params: filters }),
  
  /**
   * Get a single user by ID
   */
  getUser: (id: string) => 
    api.get<User & { 
      bookings: UserBooking[];
      paymentHistory: any[];
    }>(`/admin/users/${id}`),
  
  /**
   * Update user status
   */
  updateUserStatus: (id: string, status: User['status']) => 
    api.patch<User>(`/admin/users/${id}/status`, { status }),
  
  /**
   * Get user statistics
   */
  getUserStats: () => 
    api.get<UserStats>('/admin/users/stats'),
  
  /**
   * Get user booking history
   */
  getUserBookings: (id: string, filters?: {
    page?: number;
    limit?: number;
    status?: string;
  }) => 
    api.get<{ 
      bookings: UserBooking[]; 
      total: number 
    }>(`/admin/users/${id}/bookings`, { params: filters }),
  
  /**
   * Create a new user (admin-only)
   */
  createUser: (userData: Omit<User, 'id' | 'joinedDate' | 'bookingsCount' | 'lastBookingDate' | 'totalSpend'>) => 
    api.post<User>('/admin/users', userData),
  
  /**
   * Update user profile
   */
  updateUser: (id: string, userData: Partial<Omit<User, 'id'>>) => 
    api.put<User>(`/admin/users/${id}`, userData),
  
  /**
   * Export users data
   */
  exportUsers: (filters: UserFilters, format: 'csv' | 'pdf') => 
    api.get<Blob>('/admin/users/export', {
      params: { ...filters, format },
      responseType: 'blob'
    }),
};