import { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

export default function SearchBar() {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would redirect to search results
    console.log("Searching for:", service, "in", location);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row"
    >
      <div className="flex items-center flex-1 border-b md:border-b-0 md:border-r border-gray-200 p-2">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="What service do you need?"
          className="w-full outline-none"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center flex-1 p-2">
        <FaMapMarkerAlt className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Your location"
          className="w-full outline-none"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <button 
        type="submit"
        className="bg-yellow text-black font-medium px-6 py-2 rounded-md hover:bg-opacity-90 transition mt-2 md:mt-0 md:ml-2"
      >
        Search
      </button>
    </form>
  );
}
