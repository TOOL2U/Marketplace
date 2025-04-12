import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import ProviderList from '../../components/providers/ProviderList';
import ProviderForm from '../../components/providers/ProviderForm';
import type { Provider } from '../../components/providers/ProviderList';

// Example data - In a real app, this would come from an API
const serviceCategories = [
  'Plumbing',
  'Electrical',
  'Carpentry',
  'Gardening',
  'Handyman',
  'Cleaning',
  'Painting',
  'Roofing',
  'HVAC',
  'Appliance Repair'
];

// Mock API functions - Replace with real API calls
const fetchProviders = async (): Promise<Provider[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      serviceCategory: 'Plumbing',
      location: 'New York, NY',
      rating: 4.8,
      bookingsCompleted: 145,
      status: 'active',
      verified: true,
      joinedDate: '2022-01-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '(555) 987-6543',
      serviceCategory: 'Electrical',
      location: 'Los Angeles, CA',
      rating: 4.6,
      bookingsCompleted: 98,
      status: 'active',
      verified: true,
      joinedDate: '2022-02-20'
    },
    {
      id: '3',
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      phone: '(555) 456-7890',
      serviceCategory: 'Carpentry',
      location: 'Chicago, IL',
      rating: 4.2,
      bookingsCompleted: 72,
      status: 'active',
      verified: true,
      joinedDate: '2022-03-10'
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      phone: '(555) 789-0123',
      serviceCategory: 'Gardening',
      location: 'Houston, TX',
      rating: 4.9,
      bookingsCompleted: 120,
      status: 'active',
      verified: true,
      joinedDate: '2022-01-05'
    },
    {
      id: '5',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      phone: '(555) 234-5678',
      serviceCategory: 'Handyman',
      location: 'Phoenix, AZ',
      rating: 4.5,
      bookingsCompleted: 85,
      status: 'pending',
      verified: false,
      joinedDate: '2022-04-25'
    },
    {
      id: '6',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '(555) 345-6789',
      serviceCategory: 'Cleaning',
      location: 'Philadelphia, PA',
      rating: 4.7,
      bookingsCompleted: 110,
      status: 'active',
      verified: true,
      joinedDate: '2022-02-15'
    },
    {
      id: '7',
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      phone: '(555) 567-8901',
      serviceCategory: 'Painting',
      location: 'San Antonio, TX',
      rating: 4.3,
      bookingsCompleted: 65,
      status: 'inactive',
      verified: true,
      joinedDate: '2022-03-30'
    },
    {
      id: '8',
      name: 'Lisa Martinez',
      email: 'lisa.martinez@example.com',
      phone: '(555) 678-9012',
      serviceCategory: 'Plumbing',
      location: 'San Diego, CA',
      rating: 4.4,
      bookingsCompleted: 78,
      status: 'active',
      verified: true,
      joinedDate: '2022-04-10'
    }
  ];
};

const fetchProvider = async (id: string): Promise<Provider | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const providers = await fetchProviders();
  return providers.find(p => p.id === id) || null;
};

const saveProvider = async (provider: any): Promise<Provider> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real app, this would be an API call to save the provider
  console.log('Saving provider:', provider);
  
  // Return the provider with a fake ID if it's a new provider
  if (!provider.id) {
    return {
      ...provider,
      id: Math.random().toString(36).substr(2, 9),
      joinedDate: new Date().toISOString().split('T')[0],
      rating: 0,
      bookingsCompleted: 0
    };
  }
  
  return provider;
};

const deleteProvider = async (id: string): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would be an API call to delete the provider
  console.log('Deleting provider:', id);
  
  return true;
};

const ProvidersPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = id !== undefined && id !== 'new';
  const isCreating = id === 'new';
  
  const [providers, setProviders] = useState<Provider[]>([]);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const providersData = await fetchProviders();
        setProviders(providersData);
        
        if (isEditing) {
          const providerData = await fetchProvider(id);
          setProvider(providerData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [id, isEditing]);
  
  const handleEditProvider = (id: string) => {
    navigate(`/admin/providers/${id}`);
  };
  
  const handleDeleteProvider = async (id: string) => {
    try {
      await deleteProvider(id);
      // Update the providers list by removing the deleted provider
      setProviders(providers.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting provider:', error);
    }
  };
  
  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const savedProvider = await saveProvider({
        ...data,
        id: isEditing ? id : undefined
      });
      
      if (isCreating) {
        // Add the new provider to the list
        setProviders([...providers, savedProvider]);
      } else if (isEditing) {
        // Update the provider in the list
        setProviders(providers.map(p => 
          p.id === id ? savedProvider : p
        ));
      }
      
      // Navigate back to the providers list
      navigate('/admin/providers');
    } catch (error) {
      console.error('Error saving provider:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/admin/providers');
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {isCreating ? 'Add New Provider' : isEditing ? 'Edit Provider' : 'Providers'}
        </h1>
        {(isCreating || isEditing) && (
          <p className="mt-1 text-sm text-gray-600">
            {isCreating 
              ? 'Create a new provider account.' 
              : 'Update the provider\'s information.'}
          </p>
        )}
      </div>
      
      {isCreating ? (
        <ProviderForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
          serviceCategories={serviceCategories}
        />
      ) : isEditing ? (
        isLoading ? (
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        ) : provider ? (
          <ProviderForm
            initialData={{
              name: provider.name,
              email: provider.email,
              phone: provider.phone,
              serviceCategory: provider.serviceCategory,
              location: provider.location,
              status: provider.status,
              verified: provider.verified,
              hourlyRate: 50, // Example default value
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isSubmitting}
            serviceCategories={serviceCategories}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Provider not found</p>
            <button
              onClick={() => navigate('/admin/providers')}
              className="mt-4 text-indigo-600 hover:text-indigo-800"
            >
              Back to Providers
            </button>
          </div>
        )
      ) : (
        <ProviderList
          providers={providers}
          onEdit={handleEditProvider}
          onDelete={handleDeleteProvider}
          isLoading={isLoading}
        />
      )}
    </Layout>
  );
};

export default ProvidersPage;