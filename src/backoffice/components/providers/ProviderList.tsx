import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { 
  PencilIcon, 
  TrashIcon, 
  SearchIcon, 
  AdjustmentsIcon,
  ExclamationIcon
} from '@heroicons/react/outline';

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
}

interface ProviderListProps {
  providers: Provider[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const ProviderList: React.FC<ProviderListProps> = ({
  providers,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  
  // Get unique service categories for the filter
  const categories = [...new Set(providers.map(p => p.serviceCategory))];
  
  // Filter providers based on search term and filters
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = 
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.serviceCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.location.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory ? provider.serviceCategory === selectedCategory : true;
    const matchesStatus = selectedStatus ? provider.status === selectedStatus : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const statusVariant = {
    active: 'success',
    pending: 'warning',
    inactive: 'danger',
  } as const;
  
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to delete this provider?')) {
      onDelete(id);
    }
  };
  
  if (isLoading) {
    return (
      <Card>
        <div className="animate-pulse">
          <div className="flex justify-between mb-4">
            <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-10 w-1/4 bg-gray-200 rounded"></div>
          </div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-20 bg-gray-200 rounded mb-3"></div>
          ))}
        </div>
      </Card>
    );
  }
  
  return (
    <Card>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        {/* Search */}
        <div className="relative md:w-1/3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
            placeholder="Search providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Category Filter */}
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          {/* Status Filter */}
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>
          
          {/* Add New Provider Button */}
          <Button
            variant="primary"
            onClick={() => navigate('/admin/providers/new')}
          >
            Add New Provider
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provider
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Verified
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bookings
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProviders.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                  No providers found matching your criteria
                </td>
              </tr>
            ) : (
              filteredProviders.map((provider) => (
                <tr key={provider.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {provider.avatarUrl ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={provider.avatarUrl}
                            alt={provider.name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            {provider.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {provider.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {provider.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {provider.serviceCategory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {provider.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant={statusVariant[provider.status]} 
                      rounded 
                      size="sm"
                    >
                      {provider.status.charAt(0).toUpperCase() + provider.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {provider.verified ? (
                      <span className="inline-flex items-center text-green-600">
                        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-red-600">
                        <ExclamationIcon className="w-5 h-5 mr-1" />
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      {provider.rating.toFixed(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {provider.bookingsCompleted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        leftIcon={<PencilIcon className="w-4 h-4" />}
                        onClick={() => onEdit(provider.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        leftIcon={<TrashIcon className="w-4 h-4" />}
                        onClick={() => handleDeleteClick(provider.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ProviderList;