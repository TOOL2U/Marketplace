import { useState, useEffect } from "react";
import { useParams, Link } from "@remix-run/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { getBookings, Booking } from "~/utils/bookingsstore"; // Fixed casing to match the actual filename
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";

export default function BookingDetail() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the specific booking
    const allBookings = getBookings();
    const foundBooking = allBookings.find(b => b.id === bookingId) || null;
    setBooking(foundBooking);
    setIsLoading(false);
  }, [bookingId]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container-custom py-12 flex-grow">
          <div className="text-center py-8">
            <div className="spinner"></div>
            <p className="mt-4 text-gray-600">Loading booking details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container-custom py-12 flex-grow">
          <div className="max-w-4xl mx-auto">
            <Link to="/bookings" className="flex items-center text-gray-600 hover:text-black mb-6">
              <FaArrowLeft className="mr-2" /> Back to all bookings
            </Link>
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">Booking not found</h2>
              <p className="text-gray-600 mb-6">
                The booking you're looking for doesn't exist or has been removed.
              </p>
              <Link to="/bookings" className="btn btn-primary">
                View All Bookings
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container-custom py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <Link to="/bookings" className="flex items-center text-gray-600 hover:text-black mb-6">
            <FaArrowLeft className="mr-2" /> Back to all bookings
          </Link>
          
          <div className="card overflow-hidden border border-gray-200">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-6">Booking Details</h1>
              
              <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
                <img 
                  src={booking.providerImage} 
                  alt={booking.providerName} 
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h2 className="font-semibold text-xl">{booking.service}</h2>
                  <p className="text-gray-600">with {booking.providerName}</p>
                  <span className={`inline-block mt-2 px-3 py-1 text-sm rounded-full ${
                    booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                    booking.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <FaCalendarAlt className="text-yellow mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium mb-1">Date</h3>
                      <p>{booking.date}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <FaClock className="text-yellow mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium mb-1">Time</h3>
                      <p>{booking.time}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-yellow mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium mb-1">Address</h3>
                      <p>{booking.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {booking.notes && (
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h3 className="font-medium mb-2">Additional Notes</h3>
                  <p>{booking.notes}</p>
                </div>
              )}
              
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <div>
                  <h3 className="font-medium mb-1">Booking ID</h3>
                  <p className="text-sm text-gray-500">{booking.id}</p>
                </div>
                {/* Add more actions here if needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}