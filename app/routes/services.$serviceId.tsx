import { useParams, Link } from "@remix-run/react";
import { FaStar, FaMapMarkerAlt, FaCalendarAlt, FaCheck } from "react-icons/fa";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

// Helper component for styled check icons
const StyledCheckIcon = () => (
  <div className="bg-black w-5 h-5 rounded-full flex items-center justify-center mr-2 flex-shrink-0 transition-transform duration-300 ease-in-out hover:scale-110">
    <FaCheck className="text-yellow text-xs" />
  </div>
);

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const formattedServiceName = serviceId ? serviceId.charAt(0).toUpperCase() + serviceId.slice(1) : "";

  // Mock data for service providers
  const providers = [
    {
      id: 1,
      name: "John Smith",
      service: formattedServiceName,
      rating: 4.9,
      reviews: 124,
      price: "$50-80/hr",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "New York, NY",
      description: "Professional with over 10 years of experience. Specializing in residential and commercial services.",
      availability: "Available today"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      service: formattedServiceName,
      rating: 4.8,
      reviews: 98,
      price: "$45-75/hr",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      location: "New York, NY",
      description: "Licensed and insured professional with attention to detail and quality workmanship.",
      availability: "Available tomorrow"
    },
    {
      id: 3,
      name: "Michael Brown",
      service: formattedServiceName,
      rating: 4.7,
      reviews: 87,
      price: "$55-90/hr",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      location: "New York, NY",
      description: "Experienced professional offering reliable and efficient services at competitive rates.",
      availability: "Available in 2 days"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-darkgray text-white py-12">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              {formattedServiceName} Services
            </h1>
            <p className="text-xl mb-4">
              Find trusted {formattedServiceName.toLowerCase()} professionals in your area
            </p>
            <div className="flex items-center">
              <Link to="/services" className="text-yellow hover:underline">
                All Services
              </Link>
              <span className="mx-2">›</span>
              <span>{formattedServiceName}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">About {formattedServiceName} Services</h2>
            <p className="mb-4">
              Our {formattedServiceName.toLowerCase()} professionals provide high-quality services for all your home maintenance needs. 
              Whether you need repairs, installations, or regular maintenance, our vetted experts are ready to help.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">What's included:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <StyledCheckIcon /> {/* Updated Icon */}
                    <span>Professional assessment</span>
                  </li>
                  <li className="flex items-center">
                    <StyledCheckIcon /> {/* Updated Icon */}
                    <span>Quality workmanship</span>
                  </li>
                  <li className="flex items-center">
                    <StyledCheckIcon /> {/* Updated Icon */}
                    <span>Licensed and insured professionals</span>
                  </li>
                  <li className="flex items-center">
                    <StyledCheckIcon /> {/* Updated Icon */}
                    <span>Satisfaction guarantee</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">Why choose us:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <StyledCheckIcon /> {/* Updated Icon */}
                    <span>Vetted professionals</span>
                  </li>
                  <li className="flex items-center">
                    <StyledCheckIcon /> {/* Updated Icon */}
                    <span>Transparent pricing</span>
                  </li>
                  <li className="flex items-center">
                    <StyledCheckIcon /> {/* Updated Icon */}
                    <span>Flexible scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <StyledCheckIcon /> {/* Updated Icon */}
                    <span>Customer support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Providers */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8">Top {formattedServiceName} Professionals</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {providers.map((provider) => (
              <div key={provider.id} className="card hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:mr-6 mb-4 md:mb-0 flex-shrink-0">
                      <img 
                        src={provider.image} 
                        alt={provider.name} 
                        className="w-24 h-24 rounded-full object-cover mx-auto md:mx-0"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{provider.name}</h3>
                          <p className="text-gray-600">{provider.service} Professional</p>
                        </div>
                        <div className="mt-2 md:mt-0 text-center md:text-right">
                          <div className="flex items-center justify-center md:justify-end">
                            <FaStar className="text-yellow mr-1" />
                            <span className="font-semibold">{provider.rating}</span>
                            <span className="text-gray-600 ml-1">({provider.reviews} reviews)</span>
                          </div>
                          <p className="font-semibold mt-1">{provider.price}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-gray-700">{provider.description}</p>
                      <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center">
                        <div className="flex items-center mb-2 md:mb-0">
                          <FaMapMarkerAlt className="text-gray-500 mr-1" />
                          <span className="text-gray-600">{provider.location}</span>
                        </div>
                        <div className="flex items-center">
                          <FaCalendarAlt className="text-gray-500 mr-1" />
                          <span className="text-gray-600">{provider.availability}</span>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <Link 
                          to={`/providers/${provider.id}`} 
                          className="btn btn-outline text-center"
                        >
                          View Profile
                        </Link>
                        <Link 
                          to={`/booking/${provider.id}`} 
                          className="btn btn-primary text-center"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="btn btn-outline">
              Load More Professionals
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">How do I choose the right {formattedServiceName.toLowerCase()} professional?</h3>
                <p className="text-gray-700">
                  We recommend reviewing each professional's ratings, reviews, and experience. You can also contact them directly to discuss your specific needs before booking.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">What are the typical rates for {formattedServiceName.toLowerCase()} services?</h3>
                <p className="text-gray-700">
                  Rates vary depending on the complexity of the job and the professional's experience. Most professionals charge between $45-90 per hour, with some offering flat rates for specific services.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Are the professionals licensed and insured?</h3>
                <p className="text-gray-700">
                  Yes, all professionals on our platform are vetted, licensed, and insured. You can view their credentials on their profile pages.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">What if I'm not satisfied with the service?</h3>
                <p className="text-gray-700">
                  We offer a satisfaction guarantee. If you're not completely satisfied with the service, please contact our customer support team within 48 hours, and we'll work to resolve the issue.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
