import { useState, useEffect } from 'react';
import { 
  salesApi, 
  SalesFilters, 
  SalesReport, 
  CategoryBreakdown, 
  ProviderPerformance 
} from '../api';

export const useSales = (initialFilters: SalesFilters = {}) => {
  const [salesReport, setSalesReport] = useState<SalesReport | null>(null);
  const [categoryBreakdown, setCategoryBreakdown] = useState<CategoryBreakdown[]>([]);
  const [providerPerformance, setProviderPerformance] = useState<ProviderPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SalesFilters>(initialFilters);

  const fetchSalesData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [
        reportData,
        categoryData,
        providerData
      ] = await Promise.all([
        salesApi.getSalesReport(filters),
        salesApi.getCategoryBreakdown(filters),
        salesApi.getProviderPerformance(filters)
      ]);

      setSalesReport(reportData);
      setCategoryBreakdown(categoryData);
      setProviderPerformance(providerData);
    } catch (err) {
      setError('Failed to load sales data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [JSON.stringify(filters)]);

  const updateFilters = (newFilters: SalesFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getRevenueTrends = async (customFilters?: SalesFilters) => {
    try {
      return await salesApi.getRevenueTrends(customFilters || filters);
    } catch (err) {
      setError('Failed to load revenue trends');
      console.error(err);
      throw err;
    }
  };

  const getRevenueProjection = async (months: number) => {
    try {
      return await salesApi.getRevenueProjection(months);
    } catch (err) {
      setError('Failed to load revenue projection');
      console.error(err);
      throw err;
    }
  };

  const exportSalesData = async (format: 'csv' | 'pdf', customFilters?: SalesFilters) => {
    try {
      const blob = await salesApi.exportSalesData(customFilters || filters, format);
      // Create a download link and trigger it
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download', 
        `sales-report-${new Date().toISOString().split('T')[0]}.${format}`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to export sales data');
      console.error(err);
      throw err;
    }
  };

  return {
    salesReport,
    categoryBreakdown,
    providerPerformance,
    isLoading,
    error,
    filters,
    updateFilters,
    getRevenueTrends,
    getRevenueProjection,
    exportSalesData,
    refetch: fetchSalesData
  };
};