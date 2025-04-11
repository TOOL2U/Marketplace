import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { FaTools, FaPlug, FaTree, FaHammer, FaWrench, FaCheck, FaArrowRight, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import ServiceCard from "~/components/ServiceCard";
import TestimonialCard from "~/components/TestimonialCard";
import SearchBar from "~/components/SearchBar";
import { useEffect, useRef, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "MAN2U - Home Maintenance Services" },
    { name: "description", content: "Find trusted professionals for your home maintenance needs" },
  ];
};

export default function Index() {
  const popularServices = [
    { id: 1, title: "Plumbing", icon: <FaPlug className="text-3xl" />, description: "Fix leaks, installations, and repairs" },
    { id: 2, title: "Electrical", icon: <FaTools className="text-3xl" />, description: "Wiring, fixtures, and electrical repairs" },
    { id: 3, title: "Carpentry", icon: <FaHammer className="text-3xl" />, description: "Furniture repair and custom woodwork" },
    { id: 4, title: "Gardening", icon: <FaTree className="text-3xl" />, description: "Lawn care, planting, and maintenance" },
    { id: 5, title: "Handyman", icon: <FaWrench className="text-3xl" />, description: "General repairs and maintenance" },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      service: "Plumbing",
      rating: 5,
      comment: "The plumber arrived on time and fixed my leaking sink quickly. Very professional service!",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Michael Brown",
      service: "Electrical",
      rating: 5,
      comment: "Excellent service! The electrician was knowledgeable and fixed our wiring issues in no time.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Emily Davis",
      service: "Gardening",
      rating: 4,
      comment: "Very satisfied with the gardening service. My lawn looks amazing now!",
      image: "https://randomuser.me/api/portraits/women/67.jpg"
    }
  ];

  // State for search and location
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  // Function to get user's location
  const getUserLocation = () => {
    setIsLocating(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would convert coordinates to address using a geocoding service
          // For now, we'll just display the coordinates
          setLocation(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocation("Location unavailable");
          setIsLocating(false);
        }
      );
    } else {
      setLocation("Geolocation not supported");
      setIsLocating(false);
    }
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would redirect to search results
    console.log("Searching for:", service, "in", location);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section - Modern Style with Background Image */}
      <section
        className="text-white py-16 md:py-24 lg:py-32 overflow-hidden relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://i.imgur.com/QfpfwtY.png')" }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 z-0"></div>


        {/* Content Container */}
        <div className="container-custom relative z-10"> {/* Ensure content is above overlay */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="pr-0 lg:pr-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-yellow">Essential services for your home</span> 
              </h1>
              <p className="text-lg mb-8 text-gray-200"> {/* Adjusted text color for better contrast */}
                At the core of our mission, we are dedicatedly committed to
                supporting homeowners. With unwavering passion, we
                pave the way for your comfort and peace of mind.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center">
                  <FaCheck className="text-yellow mr-2" />
                  <span>Free quotation</span>
                </div>
                <div className="flex items-center">
                  <FaCheck className="text-yellow mr-2" />
                  <span>Fast responses</span>
                </div>
              </div>

              {/* Search Box with Location */}
              <form onSubmit={handleSearch} className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Service Search Input */}
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="What service do you need?"
                      className="w-full pl-10 px-4 py-3 rounded-md bg-darkgray border border-gray-700 text-white focus:outline-none focus:border-yellow"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      required
                    />
                  </div>
                  
                  {/* Location Input */}
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaMapMarkerAlt className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Your location"
                      className="w-full pl-10 px-4 py-3 rounded-md bg-darkgray border border-gray-700 text-white focus:outline-none focus:border-yellow"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={getUserLocation}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-yellow hover:text-yellow-bright"
                      disabled={isLocating}
                    >
                      {isLocating ? "Locating..." : "Find me"}
                    </button>
                  </div>
                </div>
                
                {/* Search Button */}
                <button 
                  type="submit" 
                  className="btn btn-primary px-6 py-3 whitespace-nowrap"
                >
                  Find Services
                </button>
              </form>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative h-[1200px] mt-12 lg:mt-0">
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">Popular Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {popularServices.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                icon={service.icon}
                description={service.description}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110">
                <span className="text-yellow text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Search</h3>
              <p className="text-gray-600">Find the service you need from our wide range of home maintenance options</p>
            </div>
            <div className="text-center group">
              <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110">
                <span className="text-yellow text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Book</h3>
              <p className="text-gray-600">Select a professional based on reviews, pricing, and availability</p>
            </div>
            <div className="text-center group">
              <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110">
                <span className="text-yellow text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Relax</h3>
              <p className="text-gray-600">Your professional will arrive at the scheduled time to complete the job</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                service={testimonial.service}
                rating={testimonial.rating}
                comment={testimonial.comment}
                image={testimonial.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found reliable home maintenance professionals through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="btn btn-primary">
              Find a Service
            </Link>
            <Link to="/signup" className="btn btn-outline border-white text-white hover:bg-white hover:text-black">
              Become a Provider
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
