import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { 
  UserAddIcon, 
  KeyIcon, 
  PlusIcon,
  TrashIcon,
  PencilIcon,
  SaveIcon,
  GlobeIcon,
  BellIcon,
  CurrencyDollarIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'support';
  active: boolean;
  lastLogin: string;
}

interface PlatformSettings {
  currencySymbol: string;
  timeZone: string;
  dateFormat: string;
  bookingLeadTime: number;
  cancellationPeriod: number;
  platformFee: number;
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
}

// Mock API functions - Replace with real API calls
const fetchAdminUsers = async (): Promise<AdminUser[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      active: true,
      lastLogin: '2023-05-15T10:30:00'
    },
    {
      id: '2',
      name: 'Manager User',
      email: 'manager@example.com',
      role: 'manager',
      active: true,
      lastLogin: '2023-05-14T14:45:00'
    },
    {
      id: '3',
      name: 'Support User',
      email: 'support@example.com',
      role: 'support',
      active: true,
      lastLogin: '2023-05-13T09:20:00'
    }
  ];
};

const fetchPlatformSettings = async (): Promise<PlatformSettings> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    currencySymbol: '$',
    timeZone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    bookingLeadTime: 24, // hours
    cancellationPeriod: 12, // hours
    platformFee: 10, // percentage
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: false
  };
};

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'admins' | 'general'>('admins');
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [settings, setSettings] = useState<PlatformSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form state for new admin user
  const [showNewAdminForm, setShowNewAdminForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'support' as AdminUser['role'],
    password: '',
    confirmPassword: '',
  });
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [usersData, settingsData] = await Promise.all([
          fetchAdminUsers(),
          fetchPlatformSettings()
        ]);
        
        setAdminUsers(usersData);
        setSettings(settingsData);
      } catch (error) {
        console.error('Error loading settings data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const handleAddAdminUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    if (newAdmin.password !== newAdmin.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    // In a real app, call API to create new admin user
    console.log('Creating new admin user:', newAdmin);
    
    // Reset form
    setNewAdmin({
      name: '',
      email: '',
      role: 'support',
      password: '',
      confirmPassword: '',
    });
    setShowNewAdminForm(false);
  };
  
  const handleSaveSettings = async () => {
    if (!settings) return;
    
    setIsSaving(true);
    try {
      // In a real app, call API to save settings
      console.log('Saving settings:', settings);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const roleColors = {
    admin: 'primary',
    manager: 'info',
    support: 'secondary',
  } as const;
  
  if (isLoading) {
    return (
      <Layout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage platform settings and admin accounts
        </p>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'admins'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('admins')}
            >
              Admin Users
            </button>
          </li>
          <li className="mr-2">
            <button
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'general'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('general')}
            >
              General Settings
            </button>
          </li>
        </ul>
      </div>
      
      {/* Admin Users Tab */}
      {activeTab === 'admins' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button
              variant="primary"
              leftIcon={<UserAddIcon className="w-5 h-5" />}
              onClick={() => setShowNewAdminForm(true)}
            >
              Add Admin User
            </Button>
          </div>
          
          {showNewAdminForm && (
            <Card title="Add New Admin User">
              <form onSubmit={handleAddAdminUser} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={newAdmin.name}
                      onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={newAdmin.email}
                      onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="role"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={newAdmin.role}
                      onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value as AdminUser['role'] })}
                      required
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="support">Support</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={newAdmin.password}
                      onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                      required
                      minLength={8}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={newAdmin.confirmPassword}
                      onChange={(e) => setNewAdmin({ ...newAdmin, confirmPassword: e.target.value })}
                      required
                      minLength={8}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowNewAdminForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    leftIcon={<PlusIcon className="w-5 h-5" />}
                  >
                    Add User
                  </Button>
                </div>
              </form>
            </Card>
          )}
          
          <Card title="Admin Users">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {adminUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant={roleColors[user.role] || 'secondary'} 
                          size="sm"
                        >
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          variant={user.active ? 'success' : 'danger'} 
                          size="sm"
                          rounded
                        >
                          {user.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.lastLogin).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<PencilIcon className="w-4 h-4" />}
                            onClick={() => console.log('Edit user:', user.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<KeyIcon className="w-4 h-4" />}
                            onClick={() => console.log('Reset password for user:', user.id)}
                          >
                            Reset Password
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
      
      {/* General Settings Tab */}
      {activeTab === 'general' && settings && (
        <div className="space-y-6">
          <Card title="Platform Settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Currency Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                  <CurrencyDollarIcon className="w-5 h-5 mr-2 text-indigo-600" />
                  Currency Settings
                </h3>
                
                <div>
                  <label htmlFor="currencySymbol" className="block text-sm font-medium text-gray-700">
                    Currency Symbol
                  </label>
                  <input
                    type="text"
                    id="currencySymbol"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={settings.currencySymbol}
                    onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
                  />
                </div>
                
                <div>
                  <label htmlFor="platformFee" className="block text-sm font-medium text-gray-700">
                    Platform Fee (%)
                  </label>
                  <input
                    type="number"
                    id="platformFee"
                    min="0"
                    max="100"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={settings.platformFee}
                    onChange={(e) => setSettings({ ...settings, platformFee: parseFloat(e.target.value) })}
                  />
                </div>
              </div>
              
              {/* Date & Time Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                  <GlobeIcon className="w-5 h-5 mr-2 text-indigo-600" />
                  Date & Time Settings
                </h3>
                
                <div>
                  <label htmlFor="timeZone" className="block text-sm font-medium text-gray-700">
                    Default Time Zone
                  </label>
                  <select
                    id="timeZone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={settings.timeZone}
                    onChange={(e) => setSettings({ ...settings, timeZone: e.target.value })}
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Pacific/Honolulu">Hawaii Time (HT)</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700">
                    Date Format
                  </label>
                  <select
                    id="dateFormat"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={settings.dateFormat}
                    onChange={(e) => setSettings({ ...settings, dateFormat: e.target.value })}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
              
              {/* Booking Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                  <CogIcon className="w-5 h-5 mr-2 text-indigo-600" />
                  Booking Settings
                </h3>
                
                <div>
                  <label htmlFor="bookingLeadTime" className="block text-sm font-medium text-gray-700">
                    Minimum Booking Lead Time (hours)
                  </label>
                  <input
                    type="number"
                    id="bookingLeadTime"
                    min="0"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={settings.bookingLeadTime}
                    onChange={(e) => setSettings({ ...settings, bookingLeadTime: parseInt(e.target.value, 10) })}
                  />
                </div>
                
                <div>
                  <label htmlFor="cancellationPeriod" className="block text-sm font-medium text-gray-700">
                    Cancellation Period (hours)
                  </label>
                  <input
                    type="number"
                    id="cancellationPeriod"
                    min="0"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={settings.cancellationPeriod}
                    onChange={(e) => setSettings({ ...settings, cancellationPeriod: parseInt(e.target.value, 10) })}
                  />
                </div>
              </div>
              
              {/* Notification Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 flex items-center">
                  <BellIcon className="w-5 h-5 mr-2 text-indigo-600" />
                  Notification Settings
                </h3>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="emailNotifications"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={settings.emailNotifications}
                      onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                    />
                    <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                      Enable Email Notifications
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="smsNotifications"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={settings.smsNotifications}
                      onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                    />
                    <label htmlFor="smsNotifications" className="ml-2 block text-sm text-gray-700">
                      Enable SMS Notifications
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="pushNotifications"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={settings.pushNotifications}
                      onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                    />
                    <label htmlFor="pushNotifications" className="ml-2 block text-sm text-gray-700">
                      Enable Push Notifications
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-8">
              <Button
                type="button"
                variant="primary"
                leftIcon={<SaveIcon className="w-5 h-5" />}
                onClick={handleSaveSettings}
                isLoading={isSaving}
              >
                Save Settings
              </Button>
            </div>
          </Card>
        </div>
      )}
    </Layout>
  );
};

export default SettingsPage;