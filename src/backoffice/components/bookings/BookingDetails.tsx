import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import type { Booking } from './BookingList';

interface BookingDetailsProps {
  booking: Booking;
  onUpdateStatus: (id: string, status: Booking['status']) => void;
  isLoading?: boolean;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  booking,
  onUpdateStatus,
  isLoading = false
}) => {
  const navigate = useNavigate();
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  
  const statusVariant = {
    pending: 'warning',
    confirmed: 'info',
    completed: 'success',
    cancelled: 'danger',
  } as const;
  
  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };
  
  const formatDate = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString();
  };
  
  const handleStatusUpdate = async (status: Booking['status']) => {
    setIsUpdatingStatus(true);
    try {
      await onUpdateStatus(booking.id, status);
    } finally {
      setIsUpdatingStatus(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
        <div className="h-60 bg-gray-200 rounded"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header with booking ID and status */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Booking #{booking.id}
          </h1>
          <p className="text-gray-500">
            Created on {formatDate(booking.createdAt)}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <Badge
            variant={statusVariant[booking.status]}
            size="lg"
            rounded
            className="mr-4"
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/admin/bookings/${booking.id}/edit`)}
          >
            Edit Booking
          </Button>
        </div>
      </div>
      
      {/* Booking details cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Service Details */}
        <Card title="Service Information">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Service Type</p>
              <p className="text-base">{booking.serviceType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Date & Time</p>
              <p className="text-base">{formatDateTime(booking.dateTime)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Duration</p>
              <p className="text-base">{booking.duration} hour{booking.duration !== 1 ? 's' : ''}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Price</p>
              <p className="text-lg font-semibold text-indigo-600">${booking.price.toFixed(2)}</p>
            </div>
          </div>
        </Card>
        
        {/* Customer Information */}
        <Card title="Customer Information">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-base">{booking.customer.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base break-all">{booking.customer.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-base">{booking.customer.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Service Address</p>
              <p className="text-base">{booking.address}</p>
            </div>
          </div>
        </Card>
        
        {/* Provider Information */}
        <Card title="Provider Information">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-base">{booking.provider.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base break-all">{booking.provider.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-base">{booking.provider.phone}</p>
            </div>
            <div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => navigate(`/admin/providers/${booking.provider.id}`)}
              >
                View Provider Profile
              </Button>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Notes and Status Update */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Notes */}
        <div className="md:col-span-2">
          <Card title="Notes">
            <div className="min-h-[100px]">
              {booking.notes ? (
                <p className="text-gray-700 whitespace-pre-line">{booking.notes}</p>
              ) : (
                <p className="text-gray-500 italic">No notes for this booking</p>
              )}
            </div>
          </Card>
        </div>
        
        {/* Status Updates */}
        <div>
          <Card title="Update Status">
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Current Status: <Badge variant={statusVariant[booking.status]} size="sm" rounded>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </p>
              
              <div className="flex flex-col space-y-2">
                {booking.status !== 'confirmed' && (
                  <Button
                    variant="info"
                    size="sm"
                    isLoading={isUpdatingStatus}
                    disabled={isUpdatingStatus}
                    onClick={() => handleStatusUpdate('confirmed')}
                    fullWidth
                  >
                    Mark as Confirmed
                  </Button>
                )}
                
                {booking.status !== 'completed' && (
                  <Button
                    variant="success"
                    size="sm"
                    isLoading={isUpdatingStatus}
                    disabled={isUpdatingStatus}
                    onClick={() => handleStatusUpdate('completed')}
                    fullWidth
                  >
                    Mark as Completed
                  </Button>
                )}
                
                {booking.status !== 'cancelled' && (
                  <Button
                    variant="danger"
                    size="sm"
                    isLoading={isUpdatingStatus}
                    disabled={isUpdatingStatus}
                    onClick={() => handleStatusUpdate('cancelled')}
                    fullWidth
                  >
                    Cancel Booking
                  </Button>
                )}
                
                {booking.status === 'cancelled' && booking.status !== 'pending' && (
                  <Button
                    variant="warning"
                    size="sm"
                    isLoading={isUpdatingStatus}
                    disabled={isUpdatingStatus}
                    onClick={() => handleStatusUpdate('pending')}
                    fullWidth
                  >
                    Reopen as Pending
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-between pt-4">
        <Button
          variant="secondary"
          onClick={() => navigate('/admin/bookings')}
        >
          Back to Bookings
        </Button>
      </div>
    </div>
  );
};

export default BookingDetails;