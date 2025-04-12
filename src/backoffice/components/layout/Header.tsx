import React, { useState } from 'react';
import { BellIcon, MenuIcon, SearchIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  
  const notifications = [
    { id: 1, message: "New provider registration", time: "5 min ago" },
    { id: 2, message: "Booking #12345 was completed", time: "1 hour ago" },
    { id: 3, message: "New support request", time: "2 hours ago" },
  ];

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      {/* Left section with menu toggle and search */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-1 mr-4 text-gray-600 rounded-md hover:bg-gray-100 lg:hidden"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex items-center w-96 px-3 py-2 bg-gray-100 rounded-md">
          <SearchIcon className="w-5 h-5 mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-transparent focus:outline-none"
          />
        </div>
      </div>
      
      {/* Right section with notifications and user menu */}
      <div className="flex items-center">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-gray-600 rounded-full hover:bg-gray-100"
          >
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 w-80 mt-2 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="p-3 border-b border-gray-200">
                <h3 className="font-medium text-gray-800">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 border-b border-gray-200 hover:bg-gray-50">
                    <p className="text-sm text-gray-800">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 text-center">
                <button className="text-sm text-indigo-600 hover:text-indigo-800">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* User menu */}
        <div className="ml-4">
          <div className="flex items-center">
            <div className="w-8 h-8 overflow-hidden bg-gray-300 rounded-full mr-2">
              {/* Avatar would go here */}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;