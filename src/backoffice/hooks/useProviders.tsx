import { useState, useEffect } from 'react';
import { providersApi, Provider, ProviderFilters } from '../api';

export const useProviders = (initialFilters: ProviderFilters = {}) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProviderFilters>(initialFilters);

  const fetchProviders = async () => {
    setIsLoading(true);
    try {
      const { providers: fetchedProviders, total: totalProviders } = await providersApi.getProviders(filters);
      
      setProviders(fetchedProviders);
      setTotal(totalProviders);
    } catch (err) {
      setError('Failed to load providers');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [JSON.stringify(filters)]);

  const updateFilters = (newFilters: ProviderFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const createProvider = async (providerData: Omit<Provider, 'id'>) => {
    try {
      const newProvider = await providersApi.createProvider(providerData);
      setProviders(prev => [...prev, newProvider]);
      return newProvider;
    } catch (err) {
      setError('Failed to create provider');
      console.error(err);
      throw err;
    }
  };

  const updateProvider = async (id: string, providerData: Partial<Provider>) => {
    try {
      const updatedProvider = await providersApi.updateProvider(id, providerData);
      setProviders(prev => 
        prev.map(provider => 
          provider.id === id ? updatedProvider : provider
        )
      );
      return updatedProvider;
    } catch (err) {
      setError('Failed to update provider');
      console.error(err);
      throw err;
    }
  };

  const deleteProvider = async (id: string) => {
    try {
      await providersApi.deleteProvider(id);
      setProviders(prev => prev.filter(provider => provider.id !== id));
    } catch (err) {
      setError('Failed to delete provider');
      console.error(err);
      throw err;
    }
  };

  return {
    providers,
    total,
    isLoading,
    error,
    filters,
    updateFilters,
    createProvider,
    updateProvider,
    deleteProvider,
    refetch: fetchProviders
  };
};