import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import BookingList from '../../components/bookings/BookingList';
import BookingDetails from '../../components/bookings/BookingDetails';
import type { Booking } from '../../components/bookings/BookingList';

// Mock API functions - Replace with real API calls
const fetchBookings = async (): Promise<Booking[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: '12345',
      serviceType: 'Plumbing',
      customer: {
        id: 'c1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
      },
      provider: {
        id: 'p1',
        name: 'Mike Smith',
        email: 'mike.smith@example.com',
        phone: '(555) 987-6543',
      },
      status: 'completed',
      dateTime: '2023-05-15T14:30:00',
      address: '123 Main St, New York, NY 10001',
      price: 125.00,
      duration: 2,
      notes: 'Fixed leaking kitchen sink and replaced faucet.',
      createdAt: '2023-05-10T09:15:00',
    },
    {
      id: '12346',
      serviceType: 'Electrical',
      customer: {
        id: 'c2',
        name: 'Jane Wilson',
        email: 'jane.wilson@example.com',
        phone: '(555) 234-5678',
      },
      provider: {
        id: 'p2',
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        phone: '(555) 876-5432',
      },
      status: 'confirmed',
      dateTime: '2023-05-18T10:00:00',
      address: '456 Oak St, Los Angeles, CA 90001',
      price: 89.50,
      duration: 1.5,
      notes: 'Install new light fixtures in living room and bedroom.',
      createdAt: '2023-05-12T11:22:00',
    },
    {
      id: '12347',
      serviceType: 'Carpentry',
      customer: {
        id: 'c3',
        name: 'Emily Brown',
        email: 'emily.brown@example.com',
        phone: '(555) 345-6789',
      },
      provider: {
        id: 'p3',
        name: 'David Williams',
        email: 'david.williams@example.com',
        phone: '(555) 765-4321',
      },
      status: 'pending',
      dateTime: '2023-05-20T09:15:00',
      address: '789 Pine St, Chicago, IL 60007',
      price: 210.75,
      duration: 3,
      notes: 'Build custom shelving unit for home office.',
      createdAt: '2023-05-13T15:45:00',
    },
    {
      id: '12348',
      serviceType: 'Gardening',
      customer: {
        id: 'c4',
        name: 'Michael Taylor',
        email: 'michael.taylor@example.com',
        phone: '(555) 456-7890',
      },
      provider: {
        id: 'p4',
        name: 'Sarah Davis',
        email: 'sarah.davis@example.com',
        phone: '(555) 654-3210',
      },
      status: 'cancelled',
      dateTime: '2023-05-16T16:45:00',
      address: '101 Maple St, Houston, TX 77001',
      price: 75.00,
      duration: 2,
      notes: 'Customer cancelled due to weather forecast.',
      createdAt: '2023-05-11T10:30:00',
    },
    {
      id: '12349',
      serviceType: 'Plumbing',
      customer: {
        id: 'c5',
        name: 'Alex Johnson',
        email: 'alex.johnson@example.com',
        phone: '(555) 567-8901',
      },
      provider: {
        id: 'p1',
        name: 'Mike Smith',
        email: 'mike.smith@example.com',
        phone: '(555) 987-6543',
      },
      status: 'confirmed',
      dateTime: '2023-05-22T13:00:00',
      address: '202 Elm St, Phoenix, AZ 85001',
      price: 145.25,
      duration: 2.5,
      notes: 'Bathroom drain is clogged and toilet is leaking.',
      createdAt: '2023-05-14T08:20:00',
    },
  ];
};

const fetchBooking = async (id: string): Promise<Booking | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const bookings = await fetchBookings();
  return bookings.find(b => b.id === id) || null;
};

const updateBookingStatus = async (id: string, status: Booking['status']): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would be an API call to update the booking status
  console.log(`Updating booking ${id} status to ${status}`);
  
  return true;
};

const BookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isViewingDetails = !!id;
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const bookingsData = await fetchBookings();
        setBookings(bookingsData);
        
        if (isViewingDetails && id) {
          const bookingData = await fetchBooking(id);
          setCurrentBooking(bookingData);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [id, isViewingDetails]);
  
  const handleViewDetails = (id: string) => {
    navigate(`/admin/bookings/${id}`);
  };
  
  const handleUpdateStatus = async (id: string, status: Booking['status']) => {
    try {
      const success = await updateBookingStatus(id, status);
      
      if (success) {
        // Update the booking in state
        const updatedBookings = bookings.map(booking =>
          booking.id === id ? { ...booking, status } : booking
        );
        
        setBookings(updatedBookings);
        
        if (currentBooking && currentBooking.id === id) {
          setCurrentBooking({ ...currentBooking, status });
        }
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {isViewingDetails ? 'Booking Details' : 'Booking Management'}
        </h1>
        {!isViewingDetails && (
          <p className="mt-1 text-sm text-gray-600">
            View and manage all bookings across the platform
          </p>
        )}
      </div>
      
      {isViewingDetails ? (
        isLoading ? (
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
            <div className="h-60 bg-gray-200 rounded"></div>
          </div>
        ) : currentBooking ? (
          <BookingDetails
            booking={currentBooking}
            onUpdateStatus={handleUpdateStatus}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Booking not found</p>
            <button
              onClick={() => navigate('/admin/bookings')}
              className="mt-4 text-indigo-600 hover:text-indigo-800"
            >
              Back to Bookings
            </button>
          </div>
        )
      ) : (
        <BookingList
          bookings={bookings}
          onViewDetails={handleViewDetails}
          onUpdateStatus={handleUpdateStatus}
          isLoading={isLoading}
        />
      )}
    </Layout>
  );
};

export default BookingsPage;