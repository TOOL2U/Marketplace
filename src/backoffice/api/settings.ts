import { api } from './apiClient';

export interface PlatformSettings {
  currencySymbol: string;
  timeZone: string;
  dateFormat: string;
  bookingLeadTime: number;
  cancellationPeriod: number;
  platformFee: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'support';
  active: boolean;
  lastLogin: string;
}

export interface AdminUserInput {
  name: string;
  email: string;
  role: AdminUser['role'];
  password?: string;
}

export const settingsApi = {
  /**
   * Get current platform settings
   */
  getPlatformSettings: () => 
    api.get<PlatformSettings>('/admin/settings/platform'),
  
  /**
   * Update platform settings
   */
  updatePlatformSettings: (settings: Partial<PlatformSettings>) => 
    api.patch<PlatformSettings>('/admin/settings/platform', settings),
  
  /**
   * Get list of admin users
   */
  getAdminUsers: () => 
    api.get<AdminUser[]>('/admin/settings/users'),
  
  /**
   * Create a new admin user
   */
  createAdminUser: (userData: AdminUserInput) => 
    api.post<AdminUser>('/admin/settings/users', userData),
  
  /**
   * Update an existing admin user
   */
  updateAdminUser: (id: string, userData: Partial<AdminUserInput>) => 
    api.put<AdminUser>(`/admin/settings/users/${id}`, userData),
  
  /**
   * Delete an admin user
   */
  deleteAdminUser: (id: string) => 
    api.delete<{ success: boolean }>(`/admin/settings/users/${id}`),
  
  /**
   * Reset an admin user's password
   */
  resetAdminUserPassword: (id: string) => 
    api.post<{ success: boolean }>(`/admin/settings/users/${id}/reset-password`, {}),
  
  /**
   * Get notification settings
   */
  getNotificationSettings: () => 
    api.get<{
      email: boolean;
      sms: boolean;
      push: boolean;
      templates: any[];
    }>('/admin/settings/notifications'),
  
  /**
   * Update notification settings
   */
  updateNotificationSettings: (settings: {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
    templates?: any[];
  }) => 
    api.patch<{
      email: boolean;
      sms: boolean;
      push: boolean;
      templates: any[];
    }>('/admin/settings/notifications', settings),
};