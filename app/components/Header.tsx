// FILE: app/components/Header.tsx
import { Link, useLocation } from "@remix-run/react";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaCode, FaTools } from "react-icons/fa";
import "../styles/navigation.css"; // Import the CSS file for animations

// Define a CSS variable for navbar height
const navbarHeightStyle = {
  "--navbar-height": "4rem"
} as React.CSSProperties;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState("/");
  const [isSticky, setIsSticky] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Update active route when location changes
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);

  // Animation effect on page load
  useEffect(() => {
    // Small delay to ensure animation is noticeable
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Add scroll event listener to track when to make header sticky
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Make the header sticky after scrolling down 100px
      setIsSticky(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initialize on mount
    handleScroll();
    
    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return activeRoute === path;
    }
    return activeRoute.startsWith(path);
  };

  return (
    <header className={`app-header ${isSticky ? 'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out' : ''} ${isLoaded ? 'animate-loaded' : 'animate-loading'}`}>
      <div className={`container-nav ${isSticky ? 'fixed top-0 py-2' : 'py-4'} transition-all duration-100`}>
        <div className={`relative flex h-[var(--navbar-height)] w-full items-center justify-between rounded-lg border border-transparent px-2 py-1.5 transition-[box-shadow_background-color_border-color] duration-300 motion-reduce:transition-none lg:grid lg:grid-cols-[1fr_auto_1fr] lg:rounded-2xl lg:py-[0.4375rem] lg:pr-[0.4375rem] bg-black ${isSticky ? 'bg-opacity-95 shadow-lg' : 'bg-opacity-90 shadow-[0px_5px_18px_rgba(204,_204,_204,_0.2)]'} dark:border-brand-neutrals-900 dark:bg-black dark:bg-opacity-90 dark:shadow-[0px_5px_18px_rgba(204,_204,_204,_0.1)]`} style={navbarHeightStyle}>
          {/* Logo Section - Left */}
          <Link to="/" aria-label="Homepage" className={`relative flex w-fit items-center gap-0.5 overflow-hidden lg:px-3 transition-all duration-700 delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="pointer-events-none relative -ml-0.5 size-6 mix-blend-multiply dark:mix-blend-lighten lg:-ml-1 lg:mr-px lg:size-8">
            </div>
            <span className="text-2xl block text-transparent bg-gradient-to-r from-white to-yellow bg-clip-text drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] py-2 filter blur-[0.2px] font-rational-display font-light">- SIA HOME -</span>
          </Link>
          
          {/* Navigation Links - Center */}
          <ul className="col-start-2 gap-5 px-2 font-mono font-semibold uppercase -tracking-2 text-brand-neutrals-700 dark:text-brand-neutrals-200 xl:gap-11 hidden lg:flex">
            {['/', '/services', '/providers', '/about', '/developers', '/bookings'].map((path, index) => (
              <li key={path} className={`transition-all duration-700 delay-[${200 + (index * 100)}ms] ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <Link 
                  to={path === '/' ? path : path.toLowerCase()} 
                  className={`relative transition-colors duration-300 text-white hover:text-opacity-50 font-rational-display font-light motion-reduce:transition-none
                    ${isActive(path) ? 'active' : ''}
                    ${path === '/developers' ? 'flex items-center' : ''}
                    group`}
                  >
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                  
                  {path === '/developers' && <FaCode className="mr-1" />}
                  {path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.slice(2)}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Auth Buttons - Right */}
          <div className="col-start-3 hidden w-full justify-end gap-2 lg:flex">
            <Link 
              to="/login" 
              className={`relative inline-flex items-center justify-center font-rational-display font-light rounded-lg text-yellow hover:opacity-50 transition-all duration-700 whitespace-nowrap px-4 py-2 text-sm font-medium uppercase tracking-4 delay-[700ms] ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              Login
            </Link>
            
            <Link 
              to="/signup" 
              className={`relative inline-flex items-center justify-center font-rational-display font-light rounded-lg text-yellow hover:opacity-50 transition-all duration-700 whitespace-nowrap px-4 py-2 text-sm font-medium uppercase tracking-4 delay-[800ms] ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            >
              <span className="relative z-10 flex">
                Sign Up
              </span>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className={`contents lg:hidden transition-all duration-700 delay-100 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <button 
              className="relative size-6" 
              aria-expanded={isMenuOpen} 
              aria-controls="mobile-menu" 
              aria-label="Menu"
              onClick={toggleMenu}
            >
              {isMenuOpen ? 
                <FaTimes size={24} className="text-yellow" /> : 
                <FaBars size={24} className="text-yellow" />
              }
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div id="mobile-menu" className="lg:hidden mt-2 rounded-lg border-brand-neutrals-100 bg-black p-4 text-brand-light-black dark:border dark:border-brand-neutrals-800 dark:bg-brand-medium-black dark:text-brand-light-grey-wash">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-yellow hover:brightness-110 block px-2 py-1 font-rational-display font-light" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/services" className="text-yellow hover:brightness-110 block px-2 py-1 font-rational-display font-light" onClick={toggleMenu}>
                Services
              </Link>
              <Link to="/providers" className="text-yellow hover:brightness-110 block px-2 py-1 font-rational-display font-light" onClick={toggleMenu}>
                Providers
              </Link>
              <Link to="/about" className="text-yellow hover:brightness-110 block px-2 py-1 font-rational-display font-light" onClick={toggleMenu}>
                About
              </Link>
              <Link to="/developers" className="text-yellow hover:brightness-110 block px-2 py-1 flex items-center font-rational-display font-light" onClick={toggleMenu}>
                <FaCode className="mr-1" /> Developers
              </Link>
              <Link to="/bookings" className="text-yellow hover:brightness-110 block px-2 py-1 font-rational-display font-light" onClick={toggleMenu}>
                My Bookings
              </Link>
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-700">
                <Link to="/login" className="text-yellow hover:brightness-110 block px-2 py-1 font-rational-display font-light" onClick={toggleMenu}>
                  Login
                </Link>
                <Link to="/signup" className="btn bg-yellow text-black hover:bg-yellow/90 w-full text-center mt-2 py-2 rounded transition-all duration-200 font-rational-display font-semibold" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
      {/* Add a spacer when the header is sticky to prevent content jump */}
      {isSticky && <div style={{ height: 'var(--navbar-height)' }} className="w-full"></div>}
    </header>
  );
}
