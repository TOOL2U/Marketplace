import { Link } from "@remix-run/react";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-black">Fix<span className="text-yellow">It</span></span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-darkgray"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-darkgray hover:text-black font-medium">
              Home
            </Link>
            <Link to="/services" className="text-darkgray hover:text-black font-medium">
              Services
            </Link>
            <Link to="/providers" className="text-darkgray hover:text-black font-medium">
              Providers
            </Link>
            <Link to="/about" className="text-darkgray hover:text-black font-medium">
              About
            </Link>
          </nav>

          {/* Auth buttons - desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-darkgray hover:text-black font-medium">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-darkgray hover:text-black font-medium" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/services" className="text-darkgray hover:text-black font-medium" onClick={toggleMenu}>
                Services
              </Link>
              <Link to="/providers" className="text-darkgray hover:text-black font-medium" onClick={toggleMenu}>
                Providers
              </Link>
              <Link to="/about" className="text-darkgray hover:text-black font-medium" onClick={toggleMenu}>
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
                <Link to="/login" className="text-darkgray hover:text-black font-medium" onClick={toggleMenu}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary w-full text-center" onClick={toggleMenu}>
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
