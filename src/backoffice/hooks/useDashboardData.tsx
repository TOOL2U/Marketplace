import { useState, useEffect } from 'react';
import { salesApi, providersApi, bookingsApi } from '../api';

export const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Parallel API calls for dashboard data
        const [
          salesReport,
          providerStats,
          bookingSummary
        ] = await Promise.all([
          salesApi.getSalesReport({ groupBy: 'weekly' }),
          providersApi.getProviders({ limit: 5 }),
          bookingsApi.getBookingSummary()
        ]);

        setDashboardData({
          salesReport,
          topProviders: providerStats.providers,
          bookingSummary
        });
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    dashboardData,
    isLoading,
    error,
    refetch: () => {} // Placeholder for potential refetch functionality
  };
};