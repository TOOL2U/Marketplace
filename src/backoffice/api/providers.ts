import { api } from './apiClient';

export interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceCategory: string;
  location: string;
  rating: number;
  bookingsCompleted: number;
  status: 'active' | 'pending' | 'inactive';
  verified: boolean;
  joinedDate: string;
  avatarUrl?: string;
  description?: string;
  hourlyRate: number;
}

export interface ProviderFilters {
  status?: string;
  category?: string;
  location?: string;
  verified?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ProviderStats {
  totalBookings: number;
  completionRate: number;
  averageRating: number;
  totalRevenue: number;
  lastMonthBookings: number;
}

export const providersApi = {
  /**
   * Get all providers with optional filters
   */
  getProviders: (filters?: ProviderFilters) => 
    api.get<{ providers: Provider[]; total: number }>('/admin/providers', { params: filters }),
  
  /**
   * Get a single provider by ID
   */
  getProvider: (id: string) => 
    api.get<Provider>(`/admin/providers/${id}`),
  
  /**
   * Create a new provider
   */
  createProvider: (data: Omit<Provider, 'id' | 'rating' | 'bookingsCompleted' | 'joinedDate'>) => 
    api.post<Provider>('/admin/providers', data),
  
  /**
   * Update a provider
   */
  updateProvider: (id: string, data: Partial<Provider>) => 
    api.put<Provider>(`/admin/providers/${id}`, data),
  
  /**
   * Delete a provider
   */
  deleteProvider: (id: string) => 
    api.delete<{ success: boolean }>(`/admin/providers/${id}`),
  
  /**
   * Get provider statistics
   */
  getProviderStats: (id: string) => 
    api.get<ProviderStats>(`/admin/providers/${id}/stats`),
  
  /**
   * Verify a provider
   */
  verifyProvider: (id: string) => 
    api.post<Provider>(`/admin/providers/${id}/verify`, {}),
  
  /**
   * Update provider status
   */
  updateStatus: (id: string, status: Provider['status']) => 
    api.patch<Provider>(`/admin/providers/${id}/status`, { status }),
};