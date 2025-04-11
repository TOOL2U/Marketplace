import { Link } from "@remix-run/react";
import { FaTools, FaPlug, FaTree, FaHammer, FaWrench, FaPaintRoller, FaBroom, FaSnowflake, FaShieldAlt, FaHome } from "react-icons/fa";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import SearchBar from "~/components/SearchBar";

export default function ServicesIndex() {
  const services = [
    { id: 1, title: "Plumbing", icon: <FaPlug className="text-3xl" />, description: "Fix leaks, installations, and repairs" },
    { id: 2, title: "Electrical", icon: <FaTools className="text-3xl" />, description: "Wiring, fixtures, and electrical repairs" },
    { id: 3, title: "Carpentry", icon: <FaHammer className="text-3xl" />, description: "Furniture repair and custom woodwork" },
    { id: 4, title: "Gardening", icon: <FaTree className="text-3xl" />, description: "Lawn care, planting, and maintenance" },
    { id: 5, title: "Handyman", icon: <FaWrench className="text-3xl" />, description: "General repairs and maintenance" },
    { id: 6, title: "Painting", icon: <FaPaintRoller className="text-3xl" />, description: "Interior and exterior painting" },
    { id: 7, title: "Cleaning", icon: <FaBroom className="text-3xl" />, description: "Deep cleaning and regular maintenance" },
    { id: 8, title: "HVAC", icon: <FaSnowflake className="text-3xl" />, description: "Heating, ventilation, and air conditioning" },
    { id: 9, title: "Security", icon: <FaShieldAlt className="text-3xl" />, description: "Home security system installation" },
    { id: 10, title: "Roofing", icon: <FaHome className="text-3xl" />, description: "Roof repairs and installations" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black to-darkgray text-white py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              Find the Perfect Service for Your Home
            </h1>
            <p className="text-xl mb-8">
              Browse our wide range of home maintenance services
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">All Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link key={service.id} to={`/services/${service.title.toLowerCase()}`} className="block">
                <div className="card hover:shadow-lg transition-shadow h-full">
                  <div className="p-6 flex flex-col items-center text-center">
                    <div className="bg-yellow p-4 rounded-full mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Can't find what you need?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us and we'll help you find the right professional for your specific needs.
          </p>
          <Link to="/contact" className="btn btn-primary">
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
