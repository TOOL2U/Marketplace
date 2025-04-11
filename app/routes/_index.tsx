import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { FaTools, FaPlug, FaTree, FaHammer, FaWrench } from "react-icons/fa";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import SearchBar from "~/components/SearchBar";
import ServiceCard from "~/components/ServiceCard";
import TestimonialCard from "~/components/TestimonialCard";

export const meta: MetaFunction = () => {
  return [
    { title: "FixIt - Home Maintenance Services" },
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-darkgray text-white py-16">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Home maintenance made <span className="text-yellow">simple</span>
            </h1>
            <p className="text-xl mb-8">
              Find trusted professionals for all your home maintenance needs in one place.
            </p>
            <SearchBar />
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
            <div className="text-center">
              <div className="bg-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-black text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Search</h3>
              <p className="text-gray-600">Find the service you need from our wide range of home maintenance options</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-black text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Book</h3>
              <p className="text-gray-600">Select a professional based on reviews, pricing, and availability</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-black text-2xl font-bold">3</span>
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
