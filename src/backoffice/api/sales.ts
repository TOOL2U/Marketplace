import { api } from './apiClient';

export interface RevenueData {
  date: string;
  revenue: number;
  bookings: number;
}

export interface CategoryBreakdown {
  category: string;
  revenue: number;
  percentage: number;
  bookings: number;
}

export interface ProviderPerformance {
  providerId: string;
  providerName: string;
  totalRevenue: number;
  totalBookings: number;
  averageBookingValue: number;
}

export interface SalesReport {
  totalRevenue: number;
  totalBookings: number;
  averageBookingValue: number;
  conversionRate: number;
  dailyData: RevenueData[];
  weeklyData: RevenueData[];
  monthlyData: RevenueData[];
  categoryBreakdown: CategoryBreakdown[];
  providerPerformance: ProviderPerformance[];
  regionBreakdown: CategoryBreakdown[];
}

export interface SalesFilters {
  startDate?: string;
  endDate?: string;
  groupBy?: 'daily' | 'weekly' | 'monthly';
  category?: string;
  provider?: string;
}

export const salesApi = {
  /**
   * Get comprehensive sales report
   */
  getSalesReport: (filters?: SalesFilters) => 
    api.get<SalesReport>('/admin/sales/report', { params: filters }),
  
  /**
   * Get revenue breakdown by category
   */
  getCategoryBreakdown: (filters?: SalesFilters) => 
    api.get<CategoryBreakdown[]>('/admin/sales/category-breakdown', { params: filters }),
  
  /**
   * Get provider performance metrics
   */
  getProviderPerformance: (filters?: SalesFilters) => 
    api.get<ProviderPerformance[]>('/admin/sales/provider-performance', { params: filters }),
  
  /**
   * Export sales data
   */
  exportSalesData: (filters: SalesFilters, format: 'csv' | 'pdf') => 
    api.get<Blob>('/admin/sales/export', {
      params: { ...filters, format },
      responseType: 'blob'
    }),
  
  /**
   * Get revenue trends
   */
  getRevenueTrends: (filters?: SalesFilters) => 
    api.get<RevenueData[]>('/admin/sales/revenue-trends', { params: filters }),
  
  /**
   * Calculate projected revenue
   */
  getRevenueProjection: (months: number) => 
    api.get<{ projectedRevenue: number }>(`/admin/sales/revenue-projection/${months}`),
};