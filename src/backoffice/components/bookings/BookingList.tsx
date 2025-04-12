import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { 
  EyeIcon, 
  SearchIcon, 
  CalendarIcon, 
  FilterIcon,
  PencilIcon
} from '@heroicons/react/outline';

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
  duration: number; // in hours
  notes?: string;
  createdAt: string;
}

interface BookingListProps {
  bookings: Booking[];
  onViewDetails: (id: string) => void;
  onUpdateStatus: (id: string, status: Booking['status']) => void;
  isLoading?: boolean;
}

const BookingList: React.FC<BookingListProps> = ({
  bookings,
  onViewDetails,
  onUpdateStatus,
  isLoading = false
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [serviceFilter, setServiceFilter] = useState<string>('');
  const [dateRange, setDateRange] = useState<{start: string; end: string}>({ start: '', end: '' });
  
  // Get unique service types for the filter
  const serviceTypes = [...new Set(bookings.map(b => b.serviceType))];
  
  // Filter bookings based on search term and filters
  const filteredBookings = bookings.filter(booking => {
    // Search filter
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.address.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Status filter
    const matchesStatus = statusFilter ? booking.status === statusFilter : true;
    
    // Service filter
    const matchesService = serviceFilter ? booking.serviceType === serviceFilter : true;
    
    // Date range filter
    const bookingDate = new Date(booking.dateTime);
    const matchesDateStart = dateRange.start ? new Date(dateRange.start) <= bookingDate : true;
    const matchesDateEnd = dateRange.end ? new Date(dateRange.end) >= bookingDate : true;
    
    return matchesSearch && matchesStatus && matchesService && matchesDateStart && matchesDateEnd;
  });
  
  const statusVariant = {
    pending: 'warning',
    confirmed: 'info',
    completed: 'success',
    cancelled: 'danger',
  } as const;
  
  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];
  
  if (isLoading) {
    return (
      <Card>
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
            <div className="h-10 w-full md:w-1/3 bg-gray-200 rounded"></div>
            <div className="flex gap-2">
              <div className="h-10 w-32 bg-gray-200 rounded"></div>
              <div className="h-10 w-32 bg-gray-200 rounded"></div>
            </div>
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
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-end mb-6">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Add booking button */}
          <Button
            variant="primary"
            onClick={() => navigate('/admin/bookings/new')}
          >
            Add New Booking
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Status Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        
        {/* Service Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Type
          </label>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
          >
            <option value="">All Services</option>
            {serviceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        {/* Date Range Start */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CalendarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
          </div>
        </div>
        
        {/* Date Range End */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CalendarIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </div>
        </div>
      </div>
      
      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provider
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                  No bookings found matching your criteria
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{booking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.serviceType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.customer.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.customer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.provider.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.provider.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(booking.dateTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${booking.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      variant={statusVariant[booking.status]} 
                      rounded 
                      size="sm"
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<EyeIcon className="w-4 h-4" />}
                        onClick={() => onViewDetails(booking.id)}
                      >
                        View
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<PencilIcon className="w-4 h-4" />}
                        onClick={() => navigate(`/admin/bookings/${booking.id}/edit`)}
                      >
                        Edit
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

export default BookingList;