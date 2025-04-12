import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { 
  SearchIcon, 
  UserIcon, 
  BanIcon,
  EyeIcon,
  MailIcon,
  PhoneIcon
} from '@heroicons/react/outline';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'blocked';
  joinedDate: string;
  bookingsCount: number;
  lastBookingDate: string | null;
  avatarUrl?: string;
}

// Mock API functions - Replace with real API calls
const fetchUsers = async (): Promise<User[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: 'c1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(555) 123-4567',
      status: 'active',
      joinedDate: '2022-02-15',
      bookingsCount: 8,
      lastBookingDate: '2023-05-10'
    },
    {
      id: 'c2',
      name: 'Jane Wilson',
      email: 'jane.wilson@example.com',
      phone: '(555) 234-5678',
      status: 'active',
      joinedDate: '2022-03-22',
      bookingsCount: 5,
      lastBookingDate: '2023-05-12'
    },
    {
      id: 'c3',
      name: 'Emily Brown',
      email: 'emily.brown@example.com',
      phone: '(555) 345-6789',
      status: 'active',
      joinedDate: '2022-01-10',
      bookingsCount: 12,
      lastBookingDate: '2023-05-13'
    },
    {
      id: 'c4',
      name: 'Michael Taylor',
      email: 'michael.taylor@example.com',
      phone: '(555) 456-7890',
      status: 'inactive',
      joinedDate: '2022-04-05',
      bookingsCount: 2,
      lastBookingDate: '2023-04-18'
    },
    {
      id: 'c5',
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      phone: '(555) 567-8901',
      status: 'blocked',
      joinedDate: '2022-05-30',
      bookingsCount: 1,
      lastBookingDate: '2023-03-25'
    },
    {
      id: 'c6',
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      phone: '(555) 678-9012',
      status: 'active',
      joinedDate: '2022-02-28',
      bookingsCount: 7,
      lastBookingDate: '2023-05-05'
    },
    {
      id: 'c7',
      name: 'Robert Martin',
      email: 'robert.martin@example.com',
      phone: '(555) 789-0123',
      status: 'active',
      joinedDate: '2022-03-15',
      bookingsCount: 4,
      lastBookingDate: '2023-04-20'
    },
    {
      id: 'c8',
      name: 'Jessica Clark',
      email: 'jessica.clark@example.com',
      phone: '(555) 890-1234',
      status: 'active',
      joinedDate: '2022-04-10',
      bookingsCount: 6,
      lastBookingDate: '2023-05-08'
    }
  ];
};

const updateUserStatus = async (id: string, status: User['status']): Promise<boolean> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, this would be an API call to update the user status
  console.log(`Updating user ${id} status to ${status}`);
  
  return true;
};

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
        setFilteredUsers(usersData);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  useEffect(() => {
    // Filter users based on search term and status filter
    const filtered = users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesStatus = statusFilter ? user.status === statusFilter : true;
      
      return matchesSearch && matchesStatus;
    });
    
    setFilteredUsers(filtered);
  }, [users, searchTerm, statusFilter]);
  
  const handleUpdateStatus = async (userId: string, status: User['status']) => {
    try {
      const success = await updateUserStatus(userId, status);
      
      if (success) {
        // Update the user in state
        const updatedUsers = users.map(user =>
          user.id === userId ? { ...user, status } : user
        );
        
        setUsers(updatedUsers);
        
        if (selectedUser && selectedUser.id === userId) {
          setSelectedUser({ ...selectedUser, status });
        }
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };
  
  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsViewingDetails(true);
  };
  
  const handleCloseDetails = () => {
    setIsViewingDetails(false);
    setSelectedUser(null);
  };
  
  const statusVariant = {
    active: 'success',
    inactive: 'warning',
    blocked: 'danger',
  } as const;
  
  if (isLoading) {
    return (
      <Layout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="flex justify-between mb-6">
            <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-10 w-1/4 bg-gray-200 rounded"></div>
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>
        <p className="mt-1 text-sm text-gray-600">
          View and manage customer accounts
        </p>
      </div>
      
      {isViewingDetails && selectedUser ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              User Details
            </h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCloseDetails}
            >
              Back to Users
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  {selectedUser.avatarUrl ? (
                    <img
                      className="h-24 w-24 rounded-full"
                      src={selectedUser.avatarUrl}
                      alt={selectedUser.name}
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl">
                      {selectedUser.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {selectedUser.name}
                      </h3>
                      <div className="mt-1 flex items-center">
                        <Badge
                          variant={statusVariant[selectedUser.status]}
                          rounded
                        >
                          {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                        </Badge>
                        <span className="ml-4 text-sm text-gray-500">
                          Member since {new Date(selectedUser.joinedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0">
                      <div className="flex space-x-2">
                        {selectedUser.status !== 'blocked' && (
                          <Button
                            variant="danger"
                            size="sm"
                            leftIcon={<BanIcon className="w-4 h-4" />}
                            onClick={() => handleUpdateStatus(selectedUser.id, 'blocked')}
                          >
                            Block User
                          </Button>
                        )}
                        
                        {selectedUser.status === 'blocked' && (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleUpdateStatus(selectedUser.id, 'active')}
                          >
                            Unblock User
                          </Button>
                        )}
                        
                        {selectedUser.status === 'inactive' && (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleUpdateStatus(selectedUser.id, 'active')}
                          >
                            Activate User
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <MailIcon className="w-5 h-5 text-gray-400 mr-2" />
                          <a href={`mailto:${selectedUser.email}`} className="text-gray-900 hover:text-indigo-600">
                            {selectedUser.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <PhoneIcon className="w-5 h-5 text-gray-400 mr-2" />
                          <a href={`tel:${selectedUser.phone}`} className="text-gray-900 hover:text-indigo-600">
                            {selectedUser.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Booking Information</h4>
                      <div className="mt-2 space-y-2">
                        <p className="text-gray-900">
                          Total Bookings: <span className="font-medium">{selectedUser.bookingsCount}</span>
                        </p>
                        {selectedUser.lastBookingDate && (
                          <p className="text-gray-900">
                            Last Booking: <span className="font-medium">{new Date(selectedUser.lastBookingDate).toLocaleDateString()}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Card title="Booking History">
            <div className="text-center py-12 text-gray-500">
              Booking history details would be displayed here.
            </div>
          </Card>
          
          <Card title="Payment History">
            <div className="text-center py-12 text-gray-500">
              Payment history details would be displayed here.
            </div>
          </Card>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            {/* Search */}
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Status Filter */}
            <div>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          </div>
          
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bookings
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                        No users found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {user.avatarUrl ? (
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={user.avatarUrl}
                                  alt={user.name}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                  {user.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {user.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.email}</div>
                          <div className="text-sm text-gray-500">{user.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge 
                            variant={statusVariant[user.status]} 
                            rounded 
                            size="sm"
                          >
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.joinedDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.bookingsCount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              leftIcon={<EyeIcon className="w-4 h-4" />}
                              onClick={() => handleViewUser(user)}
                            >
                              View
                            </Button>
                            
                            {user.status !== 'blocked' && (
                              <Button
                                variant="danger"
                                size="sm"
                                leftIcon={<BanIcon className="w-4 h-4" />}
                                onClick={() => handleUpdateStatus(user.id, 'blocked')}
                              >
                                Block
                              </Button>
                            )}
                            
                            {user.status === 'blocked' && (
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleUpdateStatus(user.id, 'active')}
                              >
                                Unblock
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </Layout>
  );
};

export default UsersPage;