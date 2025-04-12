import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  UsersIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  UserGroupIcon, 
  CogIcon,
  LogoutIcon,
  CodeIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active }) => {
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-3 mb-1 transition-colors rounded-lg
        ${active 
          ? 'bg-indigo-100 text-indigo-700' 
          : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
      <div className="w-6 h-6 mr-3">{icon}</div>
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const { logout, user } = useAuth();
  
  const navItems = [
    { to: '/admin', icon: <HomeIcon />, label: 'Dashboard' },
    { to: '/admin/providers', icon: <UsersIcon />, label: 'Providers' },
    { to: '/admin/bookings', icon: <CalendarIcon />, label: 'Bookings' },
    { to: '/admin/sales', icon: <ChartBarIcon />, label: 'Sales & Analytics' },
    { to: '/admin/users', icon: <UserGroupIcon />, label: 'Users' },
    { to: '/admin/settings', icon: <CogIcon />, label: 'Settings' },
    { to: '/admin/developers', icon: <CodeIcon />, label: 'Developers' },
  ];

  return (
    <div className="flex flex-col w-64 h-screen bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-indigo-600">MAN2U Admin</h1>
      </div>
      
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Main
          </p>
          <nav>
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={pathname === item.to || pathname.startsWith(`${item.to}/`)}
              />
            ))}
          </nav>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 mr-3 overflow-hidden rounded-full bg-gray-200">
            {/* Avatar would go here */}
          </div>
          <div>
            <p className="font-medium text-gray-800">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
        >
          <LogoutIcon className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;