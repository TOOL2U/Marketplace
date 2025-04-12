import { useState, useEffect } from 'react';
import { bookingsApi, Booking, BookingFilters, BookingSummary } from '../api';

export const useBookings = (initialFilters: BookingFilters = {}) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [summary, setSummary] = useState<BookingSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<BookingFilters>(initialFilters);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const { bookings: fetchedBookings, total: totalBookings } = await bookingsApi.getBookings(filters);
      setBookings(fetchedBookings);
      setTotal(totalBookings);
    } catch (err) {
      setError('Failed to load bookings');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSummary = async () => {
    setIsSummaryLoading(true);
    try {
      const summaryData = await bookingsApi.getBookingSummary(
        filters.startDate,
        filters.endDate
      );
      setSummary(summaryData);
    } catch (err) {
      setError('Failed to load booking summary');
      console.error(err);
    } finally {
      setIsSummaryLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchSummary();
  }, [JSON.stringify(filters)]);

  const updateFilters = (newFilters: BookingFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const updateBookingStatus = async (bookingId: string, status: Booking['status']) => {
    try {
      const updatedBooking = await bookingsApi.updateStatus(bookingId, status);
      setBookings(prev =>
        prev.map(booking =>
          booking.id === bookingId ? updatedBooking : booking
        )
      );
      // Refresh summary after status update
      fetchSummary();
      return updatedBooking;
    } catch (err) {
      setError('Failed to update booking status');
      console.error(err);
      throw err;
    }
  };

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    try {
      const newBooking = await bookingsApi.createBooking(bookingData);
      setBookings(prev => [...prev, newBooking]);
      fetchSummary(); // Refresh summary after creating new booking
      return newBooking;
    } catch (err) {
      setError('Failed to create booking');
      console.error(err);
      throw err;
    }
  };

  const updateBooking = async (id: string, bookingData: Partial<Booking>) => {
    try {
      const updatedBooking = await bookingsApi.updateBooking(id, bookingData);
      setBookings(prev =>
        prev.map(booking =>
          booking.id === id ? updatedBooking : booking
        )
      );
      return updatedBooking;
    } catch (err) {
      setError('Failed to update booking');
      console.error(err);
      throw err;
    }
  };

  const exportBookings = async (format: 'csv' | 'pdf') => {
    try {
      const blob = await bookingsApi.exportBookings(filters, format);
      // Create a download link and trigger it
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `bookings-export.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to export bookings');
      console.error(err);
      throw err;
    }
  };

  return {
    bookings,
    total,
    summary,
    isLoading,
    isSummaryLoading,
    error,
    filters,
    updateFilters,
    updateBookingStatus,
    createBooking,
    updateBooking,
    exportBookings,
    refetch: () => {
      fetchBookings();
      fetchSummary();
    }
  };
};