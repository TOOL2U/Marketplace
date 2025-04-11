import { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

interface SearchBarProps {
  onSearch?: (service: string, location: string) => void;
  className?: string;
}

export default function SearchBar({ onSearch, className = "" }: SearchBarProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(service, location);
    } else {
      // Default behavior if no onSearch prop is provided
      console.log("Searching for:", service, "in", location);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`bg-darkgray rounded-lg shadow-lg flex flex-col md:flex-row gap-4 p-2 ${className}`}
    >
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
      
      {/* Search Button */}
      <button 
        type="submit"
        className="bg-yellow text-black font-medium px-6 py-3 rounded-md hover:bg-opacity-90 transition whitespace-nowrap"
      >
        Find Services
      </button>
    </form>
  );
}
