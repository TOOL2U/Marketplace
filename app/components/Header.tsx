// FILE: app/components/Header.tsx
import { Link } from "@remix-run/react";
import { useState } from "react";
import { FaBars, FaTimes, FaCode } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-black text-yellow shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-yellow">MAN2U</span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-yellow"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={50} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-yellow hover:brightness-110 hover:scale-105 transition-transform duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="text-yellow hover:brightness-110 hover:scale-105 transition-transform duration-200 font-medium"
            >
              Services
            </Link>
            <Link 
              to="/providers" 
              className="text-yellow hover:brightness-110 hover:scale-105 transition-transform duration-200 font-medium"
            >
              Providers
            </Link>
            <Link 
              to="/about" 
              className="text-yellow hover:brightness-110 hover:scale-105 transition-transform duration-200 font-medium"
            >
              About
            </Link>
            <Link 
              to="/developers" 
              className="text-yellow hover:brightness-110 hover:scale-105 transition-transform duration-200 font-medium flex items-center"
            >
              <FaCode className="mr-1" /> Developers
            </Link>
            
            <Link 
              to="/bookings" 
              className="text-yellow hover:brightness-110 hover:scale-105 transition-transform duration-200 font-medium"
            >
              My Bookings
            </Link>
          </nav>

          {/* Auth buttons - desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-yellow hover:brightness-110 hover:scale-105 transition-transform duration-200 font-medium"
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className="btn bg-yellow text-black hover:bg-yellow/90 px-4 py-2 rounded font-medium transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-black"> {/* Ensure mobile menu also has black background */}
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-yellow hover:brightness-110 font-medium block px-2 py-1" 
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="text-yellow hover:brightness-110 font-medium block px-2 py-1" 
                onClick={toggleMenu}
              >
                Services
              </Link>
              <Link 
                to="/providers" 
                className="text-yellow hover:brightness-110 font-medium block px-2 py-1" 
                onClick={toggleMenu}
              >
                Providers
              </Link>
              <Link 
                to="/about" 
                className="text-yellow hover:brightness-110 font-medium block px-2 py-1" 
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link 
                to="/developers" 
                className="text-yellow hover:brightness-110 font-medium block px-2 py-1 flex items-center" 
                onClick={toggleMenu}
              >
                <FaCode className="mr-1" /> Developers
              </Link>
              <Link 
                to="/bookings" 
                className="text-yellow hover:brightness-110 font-medium block px-2 py-1" 
                onClick={toggleMenu}
              >
                My Bookings
              </Link>
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-700"> {/* Adjusted border color */}
                <Link 
                  to="/login" 
                  className="text-yellow hover:brightness-110 font-medium block px-2 py-1" 
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="btn bg-yellow text-black hover:bg-yellow/90 w-full text-center mt-2 py-2 rounded font-medium transition-colors duration-200" 
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}