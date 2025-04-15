export interface Booking {
  id: string;
  providerId: string;
  providerName: string;
  providerImage: string;
  service: string;
  date: string;
  time: string;
  address: string;
  notes?: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

// Function to save a booking
export function saveBooking(booking: Omit<Booking, 'id' | 'createdAt'>) {
  // Get existing bookings
  const bookings = getBookings();
  
  // Create a new booking with ID and timestamp
  const newBooking: Booking = {
    ...booking,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  
  // Add to bookings and save
  bookings.push(newBooking);
  localStorage.setItem('bookings', JSON.stringify(bookings));
  
  return newBooking;
}

// Function to get all bookings
export function getBookings(): Booking[] {
  const bookingsStr = typeof window !== 'undefined' 
    ? localStorage.getItem('bookings') 
    : null;
  
  return bookingsStr ? JSON.parse(bookingsStr) : [];
}

// Function to generate a unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}