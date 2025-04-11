import { useParams, Link } from "@remix-run/react";
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaThumbsUp, FaClock, FaTools } from "react-icons/fa";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

// Helper component for styled icons in stats
const StatIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="bg-black w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 transition-transform duration-300 ease-in-out hover:scale-110">
    <span className="text-yellow text-xl">{icon}</span>
  </div>
);

// Helper component for styled check icons
const StyledCheckIcon = () => (
  <div className="bg-black w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 transition-transform duration-300 ease-in-out hover:scale-110">
    <FaCheck className="text-yellow text-xs" />
  </div>
);

export default function ProviderDetail() {
  const { providerId } = useParams();
  
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
    description: "Professional plumber with over 10 years of experience. Specializing in residential and commercial plumbing services including repairs, installations, and maintenance.",
    availability: "Available today",
    yearsExperience: 10,
    completedJobs: 350,
    responseTime: "Under 1 hour",
    services: [
      "Leak repairs",
      "Pipe installation",
      "Drain cleaning",
      "Fixture installation",
      "Water heater services",
      "Emergency repairs"
    ]
  };

  // Mock reviews
  const reviews = [
    {
      id: 1,
      name: "Emily Davis",
      rating: 5,
      date: "2 weeks ago",
      comment: "John was professional, punctual, and fixed our leaking sink quickly. Highly recommend!",
      image: "https://randomuser.me/api/portraits/women/67.jpg"
    },
    {
      id: 2,
      name: "Michael Brown",
      rating: 5,
      date: "1 month ago",
      comment: "Great service! John arrived on time and completed the job efficiently. Fair pricing too.",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      id: 3,
      name: "Sarah Johnson",
      rating: 4,
      date: "2 months ago",
      comment: "John did a good job installing our new bathroom fixtures. He was knowledgeable and professional.",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Provider Info */}
          <div className="lg:col-span-2">
            <div className="card mb-8">
              <div className="p-6">
                <div className="flex flex-col md:flex-row">
                  <div className="md:mr-6 mb-4 md:mb-0 flex-shrink-0">
                    <img 
                      src={provider.image} 
                      alt={provider.name} 
                      className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div>
                        <h1 className="text-2xl font-bold">{provider.name}</h1>
                        <p className="text-gray-600">{provider.service} Professional</p>
                        <div className="flex items-center mt-2">
                          <FaMapMarkerAlt className="text-gray-500 mr-1" />
                          <span className="text-gray-600">{provider.location}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 text-center md:text-right">
                        <div className="flex items-center justify-center md:justify-end">
                          <FaStar className="text-yellow mr-1" />
                          <span className="font-semibold">{provider.rating}</span>
                          <span className="text-gray-600 ml-1">({provider.reviews} reviews)</span>
                        </div>
                        <p className="font-semibold mt-1">{provider.price}</p>
                        <div className="flex items-center justify-center md:justify-end mt-2">
                          <FaCalendarAlt className="text-gray-500 mr-1" />
                          <span className="text-gray-600">{provider.availability}</span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-700">{provider.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center group">
                <StatIcon icon={<FaTools />} /> {/* Updated Icon */}
                <p className="font-semibold">{provider.yearsExperience}+ Years</p>
                <p className="text-gray-600 text-sm">Experience</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center group">
                <StatIcon icon={<FaThumbsUp />} /> {/* Updated Icon */}
                <p className="font-semibold">{provider.completedJobs}+</p>
                <p className="text-gray-600 text-sm">Jobs Completed</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center group">
                <StatIcon icon={<FaClock />} /> {/* Updated Icon */}
                <p className="font-semibold">{provider.responseTime}</p>
                <p className="text-gray-600 text-sm">Response Time</p>
              </div>
            </div>

            {/* Services Offered */}
            <div className="card mb-8">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Services Offered</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {provider.services.map((service, index) => (
                    <div key={index} className="flex items-center">
                      <StyledCheckIcon /> {/* Updated Icon */}
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="card">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Reviews</h2>
                  <div className="flex items-center">
                    <FaStar className="text-yellow mr-1" />
                    <span className="font-semibold">{provider.rating}</span>
                    <span className="text-gray-600 ml-1">({provider.reviews} reviews)</span>
                  </div>
                </div>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-start">
                        <img 
                          src={review.image} 
                          alt={review.name} 
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <h3 className="font-semibold">{review.name}</h3>
                            <p className="text-gray-500 text-sm">{review.date}</p>
                          </div>
                          <div className="flex mt-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <FaStar 
                                key={i} 
                                className={i < review.rating ? "text-yellow" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <button className="btn btn-outline">
                    View All Reviews
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="card sticky top-6">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Book This Professional</h2>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Select Service</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Select a service</option>
                    {provider.services.map((service, index) => (
                      <option key={index}>{service}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Select Date</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Select Time</label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Morning (8AM - 12PM)</option>
                    <option>Afternoon (12PM - 4PM)</option>
                    <option>Evening (4PM - 8PM)</option>
                  </select>
                </div>
                <Link 
                  to={`/booking/${provider.id}`} 
                  className="btn btn-primary w-full text-center mb-4"
                >
                  Book Now
                </Link>
                <Link 
                  to={`/contact/${provider.id}`} 
                  className="btn btn-outline w-full text-center"
                >
                  Contact Professional
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
