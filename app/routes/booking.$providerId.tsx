import { useParams, Link } from "@remix-run/react";
import { useState } from "react";
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaCheck } from "react-icons/fa";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default function Booking() {
  const { providerId } = useParams();
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState(1);

  // Mock data for provider
  const provider = {
    id: providerId,
    name: "John Smith",
    service: "Plumbing",
    rating: 4.9,
    reviews: 124,
    price: "$50-80/hr",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "New York, NY",
    services: [
      "Leak repairs",
      "Pipe installation",
      "Drain cleaning",
      "Fixture installation",
      "Water heater services",
      "Emergency repairs"
    ]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // In a real app, this would submit the booking
      console.log("Booking submitted:", {
        providerId,
        selectedService,
        selectedDate,
        selectedTime,
        address,
        notes
      });
      setStep(3);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-yellow' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-yellow bg-yellow text-black' : 'border-gray-300'} mb-2`}>
                  1
                </div>
                <span className="text-sm font-medium">Service Details</span>
              </div>
              <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-yellow' : 'bg-gray-300'}`}></div>
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-yellow' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-yellow bg-yellow text-black' : 'border-gray-300'} mb-2`}>
                  2
                </div>
                <span className="text-sm font-medium">Confirm Details</span>
              </div>
              <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-yellow' : 'bg-gray-300'}`}></div>
              <div className={`flex flex-col items-center ${step >= 3 ? 'text-yellow' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 3 ? 'border-yellow bg-yellow text-black' : 'border-gray-300'} mb-2`}>
                  3
                </div>
                <span className="text-sm font-medium">Confirmation</span>
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="card">
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Book a Service</h1>
                
                <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
                  <img 
                    src={provider.image} 
                    alt={provider.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h2 className="font-semibold">{provider.name}</h2>
                    <p className="text-gray-600">{provider.service} Professional</p>
                    <div className="flex items-center mt-1">
                      <FaStar className="text-yellow mr-1" />
                      <span>{provider.rating}</span>
                      <span className="text-gray-500 ml-1">({provider.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Select Service</label>
                      <select 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        required
                      >
                        <option value="">Select a service</option>
                        {provider.services.map((service, index) => (
                          <option key={index} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Select Date</label>
                      <input 
                        type="date" 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Select Time</label>
                      <select 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        required
                      >
                        <option value="">Select a time slot</option>
                        <option value="Morning (8AM - 12PM)">Morning (8AM - 12PM)</option>
                        <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
                        <option value="Evening (4PM - 8PM)">Evening (4PM - 8PM)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Your Address</label>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={3}
                        placeholder="Enter your full address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Additional Notes (Optional)</label>
                      <textarea 
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows={3}
                        placeholder="Any specific details about the service you need"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end">
                      <button 
                        type="submit"
                        className="btn btn-primary"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="card">
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Confirm Your Booking</h1>
                
                <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
                  <img 
                    src={provider.image} 
                    alt={provider.name} 
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h2 className="font-semibold">{provider.name}</h2>
                    <p className="text-gray-600">{provider.service} Professional</p>
                    <div className="flex items-center mt-1">
                      <FaStar className="text-yellow mr-1" />
                      <span>{provider.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-2" />
                        <div>
                          <h3 className="font-medium">Service</h3>
                          <p>{selectedService}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-start">
                        <FaCalendarAlt className="text-yellow mt-1 mr-2" />
                        <div>
                          <h3 className="font-medium">Date</h3>
                          <p>{selectedDate}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-start">
                        <FaClock className="text-yellow mt-1 mr-2" />
                        <div>
                          <h3 className="font-medium">Time</h3>
                          <p>{selectedTime}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="text-yellow mt-1 mr-2" />
                        <div>
                          <h3 className="font-medium">Address</h3>
                          <p>{address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {notes && (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-medium mb-2">Additional Notes</h3>
                      <p>{notes}</p>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Estimated Price</h3>
                    <p>{provider.price} (final price may vary based on job complexity)</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-between">
                    <button 
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="btn btn-primary"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="card">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-green-500 text-2xl" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
                <p className="text-gray-600 mb-6">
                  Your booking with {provider.name} has been confirmed for {selectedDate} during {selectedTime}.
                </p>
                <div className="bg-gray-50 p-4 rounded-md mb-6 max-w-md mx-auto">
                  <h3 className="font-medium mb-2">Booking Details</h3>
                  <p><strong>Service:</strong> {selectedService}</p>
                  <p><strong>Date:</strong> {selectedDate}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p><strong>Address:</strong> {address}</p>
                </div>
                <p className="mb-6">
                  We've sent a confirmation email with all the details. The service provider will contact you before the appointment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/dashboard" className="btn btn-primary">
                    Go to Dashboard
                  </Link>
                  <Link to="/" className="btn btn-outline">
                    Return to Home
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
