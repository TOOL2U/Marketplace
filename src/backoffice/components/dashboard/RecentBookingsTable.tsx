import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { EyeIcon } from '@heroicons/react/outline';

interface Booking {
  id: string;
  serviceType: string;
  customerName: string;
  providerName: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  dateTime: string;
  price: number;
}

interface RecentBookingsTableProps {
  bookings: Booking[];
  isLoading?: boolean;
}

const RecentBookingsTable: React.FC<RecentBookingsTableProps> = ({ 
  bookings, 
  isLoading = false 
}) => {
  const navigate = useNavigate();
  
  const statusVariant = {
    pending: 'warning',
    confirmed: 'info',
    completed: 'success',
    cancelled: 'danger',
  } as const;
  
  const viewBookingDetails = (bookingId: string) => {
    navigate(`/admin/bookings/${bookingId}`);
  };
  
  if (isLoading) {
    return (
      <Card title="Recent Bookings">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-16 bg-gray-200 rounded mb-3"></div>
          ))}
        </div>
      </Card>
    );
  }
  
  return (
    <Card title="Recent Bookings" 
      footer={
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{bookings.length}</span> bookings
          </p>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/admin/bookings')}
          >
            View all bookings
          </Button>
        </div>
      }
    >
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
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{booking.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.serviceType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.providerName}
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.dateTime}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${booking.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<EyeIcon className="w-4 h-4" />}
                    onClick={() => viewBookingDetails(booking.id)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentBookingsTable;