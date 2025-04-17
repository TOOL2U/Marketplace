import { Link } from "@remix-run/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl block text-transparent bg-gradient-to-r from-white to-yellow bg-clip-text drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] py-2 filter blur-[0.2px] font-rational-display font-light">-SIA HOME-</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Connecting homeowners with trusted maintenance professionals since 2023.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/plumbing" className="text-gray-400 hover:text-yellow">Plumbing</Link></li>
              <li><Link to="/services/electrical" className="text-gray-400 hover:text-yellow">Electrical</Link></li>
              <li><Link to="/services/carpentry" className="text-gray-400 hover:text-yellow">Carpentry</Link></li>
              <li><Link to="/services/gardening" className="text-gray-400 hover:text-yellow">Gardening</Link></li>
              <li><Link to="/services/handyman" className="text-gray-400 hover:text-yellow">Handyman</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-yellow">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-yellow">Careers</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-yellow">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-yellow">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-yellow">Help Center</Link></li>
              <li><Link to="/safety" className="text-gray-400 hover:text-yellow">Safety</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-yellow">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-yellow">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FixIt. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
