import { api } from './apiClient';

export interface Booking {
  id: string;
  serviceType: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  provider: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  dateTime: string;
  address: string;
  price: number;
  duration: number;
  notes?: string;
  createdAt: string;
}

export interface BookingFilters {
  status?: string;
  serviceType?: string;
  providerId?: string;
  customerId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface BookingSummary {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  totalRevenue: number;
  averageBookingValue: number;
}

export const bookingsApi = {
  /**
   * Get all bookings with optional filters
   */
  getBookings: (filters?: BookingFilters) => 
    api.get<{ bookings: Booking[]; total: number }>('/admin/bookings', { params: filters }),
  
  /**
   * Get a single booking by ID
   */
  getBooking: (id: string) => 
    api.get<Booking>(`/admin/bookings/${id}`),
  
  /**
   * Create a new booking
   */
  createBooking: (data: Omit<Booking, 'id' | 'createdAt'>) => 
    api.post<Booking>('/admin/bookings', data),
  
  /**
   * Update a booking
   */
  updateBooking: (id: string, data: Partial<Booking>) => 
    api.put<Booking>(`/admin/bookings/${id}`, data),
  
  /**
   * Update booking status
   */
  updateStatus: (id: string, status: Booking['status']) => 
    api.patch<Booking>(`/admin/bookings/${id}/status`, { status }),
  
  /**
   * Delete a booking
   */
  deleteBooking: (id: string) => 
    api.delete<{ success: boolean }>(`/admin/bookings/${id}`),
  
  /**
   * Get booking summary statistics
   */
  getBookingSummary: (startDate?: string, endDate?: string) => 
    api.get<BookingSummary>('/admin/bookings/summary', { params: { startDate, endDate } }),
  
  /**
   * Export bookings data
   */
  exportBookings: (filters: BookingFilters, format: 'csv' | 'pdf') => 
    api.get<Blob>('/admin/bookings/export', { params: { ...filters, format }, responseType: 'blob' })
};