import type { MetaFunction } from "@remix-run/node";
import { Link, useNavigate } from "@remix-run/react";
import { FaTools, FaPlug, FaTree, FaHammer, FaWrench, FaCheck, FaArrowRight, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import ServiceCard from "~/components/ServiceCard";
import TestimonialCard from "~/components/TestimonialCard";
// SearchBar is no longer directly used in the hero section, but might be used elsewhere
// import SearchBar from "~/components/SearchBar";
import { useEffect, useRef, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "MAN2U - Home Maintenance Services" },
    { name: "description", content: "Find trusted professionals for your home maintenance needs" },
  ];
};

export default function Index() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation effect on page load
  useEffect(() => {
    // Small delay to ensure animation is noticeable
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Removed moon animation states and effects

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
  const [service, setService] = useState(""); // Default to empty or first service
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

    if (service) {
      // Navigate to the selected service page
      navigate(`/services/${service.toLowerCase()}`);
    } else {
      // If no service is selected, navigate to the general services page
      navigate('/services');
    }
  };

  // Handle find services button click
  const handleFindServicesClick = () => {
    if (service) {
      // Navigate to the selected service page
      navigate(`/services/${service.toLowerCase()}`);
    } else {
      // If no service is selected, navigate to the general services page
      navigate('/services');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section - Modern Style with Background Image and Centered Content */}
      <section
        className="text-white min-h-screen bg-black overflow-hidden relative bg-cover bg-center bg-no-repeat z-0 flex items-center justify-center"
        style={{ backgroundImage: 'url("https://i.imgur.com/1YidZv1.png")' }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 z-0"></div>

        {/* Removed starfield effect */}

        {/* Removed moon element */}

        {/* Removed enhanced light rays */}

        {/* Removed ambient light effect */}

        {/* Content Container - Centered */}
        <div className="container-custom relative z-10 mx-auto py-12 flex justify-center items-center h-full">
          <div className="max-w-5xl my-auto">
            <h1 className={`text-7xl md:text-8xl lg:text-9xl font-rational-display font-extrabold mb-5 text-center leading-tight tracking-tighter transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="block text-transparent bg-gradient-to-r from-white to-yellow bg-clip-text drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] filter blur-[0.2px]">Essential services.</span>
              <span className="block text-transparent bg-gradient-to-r from-white to-yellow bg-clip-text drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] py-2 filter blur-[0.2px]">Effortless booking.</span>
            </h1>
            <p className={`text-lg mb-10 text-white text-center font-rational-display font-light transition-all duration-1000 delay-200 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              At the core of our mission, we are dedicatedly committed to
              supporting homeowners. With unwavering passion, we
              pave the way for your comfort and peace of mind.
            </p>



            {/* Search Box with Location */}
            <form onSubmit={handleSearch} className={`flex flex-col gap-5 transition-all duration-1000 delay-400 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Service Search Dropdown */}
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <FaSearch className="text-white" />
                  </div>
                  <select
                    className="w-full pl-10 px-4 py-3 rounded-md text-white bg-black border border-yellow focus:outline-none focus:border-yellow font-rational-display font-light"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                  >
                    <option value="" disabled className="font-rational-display font-light">Select a service</option>
                    {popularServices.map((s) => (
                      <option key={s.id} value={s.title} className="font-rational-display font-light">
                        {s.title}
                      </option>
                    ))}
                  </select>
                   {/* Custom dropdown arrow */}
                   <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none font-rational-display font-light ">
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 20 20 ">
                      <path d="M5.516 7.548c.436-.446 1.043-.481 1.576 0L10 10.405l2.908-2.857c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615l-3.712 3.648c-.27.268-.63.402-.99.402s-.72-.134-.99-.402L5.516 9.163c-.409-.418-.436-1.17 0-1.615z"/>
                    </svg>
                  </div>
                </div>

                {/* Location Input */}
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaMapMarkerAlt className="text-white" />
                  </div>
                  <input
                    type="text"
                    placeholder="Your location"
                    className="w-full pl-10 px-4 py-3 rounded-md text-white bg-black border border-yellow focus:outline-none focus:border-yellow font-rational-display font-light placeholder:text-white placeholder:font-rational-display placeholder:font-light"
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

              {/* Search Button - Modified to work with or without form submission */}
              <button
                type="button"
                onClick={handleFindServicesClick}
                className={`btn btn-primary px-6 py-3 whitespace-nowrap px-4 py-2 rounded-xl bg-yellow text-black shadow-[0_0_15px_rgba(255,255,0,0.6)] animate-pulse transition-all duration-1000 delay-600 ease-out ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}
              >
                Find Services
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16 bg-black text-white"
      style={{ backgroundImage: 'url("https://i.imgur.com/1YidZv1.png")' }}
      >
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">Popular Services</h2>
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
            <Link to="/services" className="btn btn-primary px-6 py-3 whitespace-nowrap px-4 py-2 rounded-xl bg-yellow text-black shadow-[0_0_15px_rgba(255,255,0,0.6)] animate-pulse hover:bg-yellow-400 transition-all duration-300">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-black text-white"
      style={{ backgroundImage: 'url("https://i.imgur.com/1YidZv1.png")' }}
      >
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center text-white font-rational-display font-light">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="btn btn-primary px-6 py-3 whitespace-nowrap px-4 py-2 rounded-xl bg-black text-yellow shadow-[0_0_15px_rgba(255,255,0,0.6)] animate-pulse hover:bg-yellow-400 transition-all duration-300 font-rational-display font-light">
                <span className="text-yellow text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Search</h3>
              <p className="text-gray-300 font-rational-display font-light">Find the service you need from our wide range of home maintenance options</p>
            </div>
            <div className="text-center group">
              <div className="btn btn-primary px-6 py-3 whitespace-nowrap px-4 py-2 rounded-xl bg-black text-yellow shadow-[0_0_15px_rgba(255,255,0,0.6)] animate-pulse hover:bg-yellow-400 transition-all duration-300 font-rational-display font-light">
                <span className="text-yellow text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Book</h3>
              <p className="text-gray- font-rational-display font-light">Select a professional based on reviews, pricing, and availability</p>
            </div>
            <div className="text-center group">
              <div className="btn btn-primary px-6 py-3 whitespace-nowrap px-4 py-2 rounded-xl bg-black text-yellow shadow-[0_0_15px_rgba(255,255,0,0.6)] animate-pulse hover:bg-yellow-400 transition-all duration-300 font-rational-display font-light">
                <span className="text-yellow text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Relax</h3>
              <p className="text-gray-300 font-rational-display font-light">Your professional will arrive at the scheduled time to complete the job</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-black">
        <div className="container-custom"
        style={{ backgroundImage: 'url("https://i.imgur.com/1YidZv1.png")' }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center text-white font-rational-display font-light ">What Our Customers Say</h2>
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
          <p className="text-xl mb-8 max-w-2xl mx-auto font-rational-display font-light">
            Join thousands of satisfied customers who have found reliable home maintenance professionals through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services" className="btn btn-primary btn btn-primary px-6 py-3 whitespace-nowrap px-4 py-2 rounded-xl bg-yellow text-black shadow-[0_0_15px_rgba(255,255,0,0.6)] animate-pulse hover:bg-yellow-400 transition-all duration-300">
              Find a Service
            </Link>
            <Link to="/signup" className="btn btn-outline border-white rounded-xl text-white hover:bg-white hover:text-black">
              Become a Provider
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}