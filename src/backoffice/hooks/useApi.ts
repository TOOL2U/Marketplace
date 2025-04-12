import { useState, useCallback } from 'react';

/**
 * Generic hook for managing API calls with loading and error states
 */
export function useApi<T = any>(apiCall: (...args: any[]) => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const execute = useCallback(async (...args: any[]) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall(...args);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiCall]);
  
  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };
  
  return {
    data,
    loading,
    error,
    execute,
    reset
  };
}

/**
 * Hook for paginated API calls
 */
export function usePaginatedApi<T = any>(
  apiCall: (params: { page?: number; limit?: number }) => Promise<{ 
    [key: string]: T[]; 
    total: number 
  }>,
  initialPage = 1,
  initialLimit = 10
) {
  const [data, setData] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = useCallback(async (currentPage?: number, currentLimit?: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall({
        page: currentPage || page,
        limit: currentLimit || limit
      });
      
      setData(result[Object.keys(result).find(k => Array.isArray(result[k])) || 'data'] || []);
      setTotal(result.total);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [page, limit, apiCall]);
  
  const changePage = (newPage: number) => {
    setPage(newPage);
    fetchData(newPage);
  };
  
  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    fetchData(page, newLimit);
  };
  
  return {
    data,
    total,
    page,
    limit,
    loading,
    error,
    fetchData,
    changePage,
    changeLimit
  };
}

/**
 * Create a custom hook for a specific API call
 * 
 * @example
 * const { data, loading, error, execute } = useCustomApi(providersApi.getProviders)
 */
export function useCustomApi<T = any, Args extends any[] = any[]>(
  apiCall: (...args: Args) => Promise<T>
) {
  return useApi<T>(apiCall);
}