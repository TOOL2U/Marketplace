// FILE: app/routes/bookings.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { getBookings, Booking as StoredBooking } from "~/utils/bookingsstore";
import { FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp, FaEye, FaEdit, FaTrash, FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

// Mock data type for bookings
interface Booking {
  id: string;
  date: string;
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  service: {
    id: string;
    name: string;
    category: string;
  };
  provider: {
    id: string;
    name: string;
  };
  price: number;
}

// Loader function to fetch bookings data
export async function loader() {
  // In a real implementation, you would fetch from your database
  // This is mock data for demonstration
  const bookings: Booking[] = [
    {
      id: "BK-1001",
      date: "2025-04-18T10:30:00Z",
      status: "CONFIRMED",
      user: {
        id: "U-123",
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "555-123-4567"
      },
      address: "123 Main St, New York, NY 10001",
      location: {
        lat: 40.7128,
        lng: -74.0060
      },
      service: {
        id: "S-001",
        name: "Plumbing Repair",
        category: "Plumbing"
      },
      provider: {
        id: "P-001",
        name: "Mike's Plumbing"
      },
      price: 150.00
    },
    {
      id: "BK-1002",
      date: "2025-04-20T14:00:00Z",
      status: "PENDING",
      user: {
        id: "U-124",
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        phone: "555-987-6543"
      },
      address: "456 Park Ave, New York, NY 10022",
      location: {
        lat: 40.7631,
        lng: -73.9712
      },
      service: {
        id: "S-002",
        name: "Electrical Wiring",
        category: "Electrical"
      },
      provider: {
        id: "P-002",
        name: "Electric Solutions"
      },
      price: 200.00
    },
    {
      id: "BK-1003",
      date: "2025-04-16T09:00:00Z",
      status: "COMPLETED",
      user: {
        id: "U-125",
        name: "Michael Brown",
        email: "mbrown@example.com",
        phone: "555-555-5555"
      },
      address: "789 Broadway, New York, NY 10003",
      location: {
        lat: 40.7264,
        lng: -73.9878
      },
      service: {
        id: "S-003",
        name: "Furniture Assembly",
        category: "Handyman"
      },
      provider: {
        id: "P-003",
        name: "Handy Helpers"
      },
      price: 85.00
    },
    {
      id: "BK-1004",
      date: "2025-04-22T11:15:00Z",
      status: "CONFIRMED",
      user: {
        id: "U-126",
        name: "Emily Davis",
        email: "emily.d@example.com",
        phone: "555-222-3333"
      },
      address: "101 5th Ave, New York, NY 10003",
      location: {
        lat: 40.7359,
        lng: -73.9911
      },
      service: {
        id: "S-004",
        name: "House Cleaning",
        category: "Cleaning"
      },
      provider: {
        id: "P-004",
        name: "Clean Sweep"
      },
      price: 120.00
    },
    {
      id: "BK-1005",
      date: "2025-04-19T16:30:00Z",
      status: "CANCELLED",
      user: {
        id: "U-127",
        name: "David Wilson",
        email: "dwilson@example.com",
        phone: "555-444-7777"
      },
      address: "222 W 23rd St, New York, NY 10011",
      location: {
        lat: 40.7448,
        lng: -73.9967
      },
      service: {
        id: "S-005",
        name: "Lawn Mowing",
        category: "Gardening"
      },
      provider: {
        id: "P-005",
        name: "Green Thumb Gardens"
      },
      price: 75.00
    }
  ];

  return json({ bookings });
}

export default function BookingsPage() {
  const { bookings: initialBookings } = useLoaderData<typeof loader>();
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<"date" | "price">("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = useState(true);

  // Load bookings from localStorage if needed
  useEffect(() => {
    // If you want to merge localStorage bookings with server data,
    // you could do something like this:
    const storedBookings = getBookings();
    // Convert stored bookings to the format expected by your UI
    const formattedStoredBookings = storedBookings.map(booking => ({
      id: booking.id,
      date: booking.date,
      status: booking.status.toUpperCase() as "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED",
      user: {
        id: "U-" + Math.random().toString(36).substr(2, 5),
        name: "Customer", 
        email: "customer@example.com",
        phone: "555-000-0000"
      },
      address: booking.address,
      location: { lat: 0, lng: 0 },
      service: {
        id: "S-" + Math.random().toString(36).substr(2, 5),
        name: booking.service,
        category: "General"
      },
      provider: {
        id: booking.providerId,
        name: booking.providerName
      },
      price: 100 // Default price since it's not in the stored booking
    }));
    
    // Merge bookings from server and localStorage
    setBookings([...initialBookings, ...formattedStoredBookings]);
    setIsLoading(false);
  }, [initialBookings]);

  // Filter and sort bookings
  const filteredBookings = bookings.filter(booking => {
    // Apply search filter
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchLower) ||
      booking.user.name.toLowerCase().includes(searchLower) ||
      booking.service.name.toLowerCase().includes(searchLower) ||
      booking.address.toLowerCase().includes(searchLower);
    
    // Apply status filter
    const matchesStatus = statusFilter ? booking.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort filtered bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortField === "date") {
      return sortDirection === "asc" 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return sortDirection === "asc" 
        ? a.price - b.price
        : b.price - a.price;
    }
  });
  
  // Toggle sort direction
  const toggleSort = (field: "date" | "price") => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Get status badge color
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow text-black";
      case "CONFIRMED":
        return "bg-blue-500 text-white";
      case "COMPLETED":
        return "bg-green-500 text-white";
      case "CANCELLED":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Format date string
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="container-custom py-24 flex-grow">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Bookings Management</h1>
          <div className="flex space-x-2">
            <button className="btn bg-yellow text-black hover:bg-yellow/90 px-4 py-2 rounded font-medium transition-colors duration-200">
              Export Data
            </button>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="card p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search bookings by ID, customer, service, or address..."
                className="pl-10 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex items-center space-x-1">
                <FaFilter className="text-gray-500" />
                <span className="text-sm font-medium">Status:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setStatusFilter(null)}
                  className={`px-3 py-1 text-sm rounded-full ${
                    statusFilter === null 
                      ? "bg-yellow text-black" 
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStatusFilter("PENDING")}
                  className={`px-3 py-1 text-sm rounded-full ${
                    statusFilter === "PENDING" 
                      ? "bg-yellow text-black" 
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setStatusFilter("CONFIRMED")}
                  className={`px-3 py-1 text-sm rounded-full ${
                    statusFilter === "CONFIRMED" 
                      ? "bg-yellow text-black" 
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Confirmed
                </button>
                <button
                  onClick={() => setStatusFilter("COMPLETED")}
                  className={`px-3 py-1 text-sm rounded-full ${
                    statusFilter === "COMPLETED" 
                      ? "bg-yellow text-black" 
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setStatusFilter("CANCELLED")}
                  className={`px-3 py-1 text-sm rounded-full ${
                    statusFilter === "CANCELLED" 
                      ? "bg-yellow text-black" 
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Cancelled
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bookings Table */}
        <div className="card p-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => toggleSort("date")}
                  >
                    <span>Appointment</span>
                    {sortField === "date" ? (
                      sortDirection === "asc" ? (
                        <FaSortAmountUp className="text-yellow" />
                      ) : (
                        <FaSortAmountDown className="text-yellow" />
                      )
                    ) : (
                      <FaSortAmountDown className="text-gray-400" />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => toggleSort("price")}
                  >
                    <span>Price</span>
                    {sortField === "price" ? (
                      sortDirection === "asc" ? (
                        <FaSortAmountUp className="text-yellow" />
                      ) : (
                        <FaSortAmountDown className="text-yellow" />
                      )
                    ) : (
                      <FaSortAmountDown className="text-gray-400" />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div className="font-medium text-gray-900">{booking.user.name}</div>
                      <div className="text-xs">{booking.user.email}</div>
                      <div className="text-xs">{booking.user.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div className="font-medium text-gray-900">{booking.service.name}</div>
                      <div className="text-xs">{booking.service.category}</div>
                      <div className="text-xs text-gray-500">Provider: {booking.provider.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <div className="font-medium text-gray-900">
                        {new Date(booking.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                      <div className="text-xs">
                        {new Date(booking.date).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      <div className="text-xs mt-1 truncate max-w-xs" title={booking.address}>
                        {booking.address}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${booking.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900" title="View Details">
                        <FaEye />
                      </button>
                      <button className="text-yellow hover:text-yellow-dark" title="Edit Booking">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Cancel Booking">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {/* No results message */}
              {sortedBookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No bookings found matching your search criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{sortedBookings.length}</span> of{" "}
            <span className="font-medium">{bookings.length}</span> bookings
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-yellow text-black hover:bg-yellow/90 font-medium">
              1
            </button>
            <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">
              2
            </button>
            <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">
              3
            </button>
            <button className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">
              Next
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}