import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import Card from '../../components/ui/Card';
import BookingSummaryWidget from '../../components/dashboard/BookingSummaryWidget';
import RecentBookingsTable from '../../components/dashboard/RecentBookingsTable';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import { 
  ChartBarIcon, 
  CalendarIcon, 
  CurrencyDollarIcon, 
  CheckCircleIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

// Example data - In a real app, this would come from an API
const getBookingData = () => {
  return {
    totalBookings: 124,
    totalBookingsChange: 12.5,
    confirmedBookings: 98,
    confirmedBookingsChange: 8.2,
    completedBookings: 87,
    completedBookingsChange: 5.7,
    totalSales: 9875.50,
    totalSalesChange: 14.3,
    totalProviders: 42,
    totalProvidersChange: 3.2,
    recentBookings: [
      {
        id: '1234',
        serviceType: 'Plumbing',
        customerName: 'John Doe',
        providerName: 'Mike Smith',
        status: 'completed',
        dateTime: '2023-05-15 14:30',
        price: 125.00
      },
      {
        id: '1235',
        serviceType: 'Electrical',
        customerName: 'Jane Wilson',
        providerName: 'Robert Johnson',
        status: 'confirmed',
        dateTime: '2023-05-16 10:00',
        price: 89.50
      },
      {
        id: '1236',
        serviceType: 'Carpentry',
        customerName: 'Emily Brown',
        providerName: 'David Williams',
        status: 'pending',
        dateTime: '2023-05-17 09:15',
        price: 210.75
      },
      {
        id: '1237',
        serviceType: 'Gardening',
        customerName: 'Michael Taylor',
        providerName: 'Sarah Davis',
        status: 'cancelled',
        dateTime: '2023-05-15 16:45',
        price: 75.00
      },
      {
        id: '1238',
        serviceType: 'Plumbing',
        customerName: 'Alex Johnson',
        providerName: 'Mike Smith',
        status: 'confirmed',
        dateTime: '2023-05-18 13:00',
        price: 145.25
      }
    ],
    performanceData: [
      { name: 'Week 1', bookings: 28, revenue: 2450 },
      { name: 'Week 2', bookings: 32, revenue: 2780 },
      { name: 'Week 3', bookings: 36, revenue: 3120 },
      { name: 'Week 4', bookings: 40, revenue: 3450 },
      { name: 'Week 5', bookings: 42, revenue: 3620 },
      { name: 'Week 6', bookings: 48, revenue: 4150 },
      { name: 'Week 7', bookings: 52, revenue: 4500 },
      { name: 'Week 8', bookings: 55, revenue: 4750 },
    ],
    topCategories: [
      { name: 'Plumbing', count: 47, percentage: 38 },
      { name: 'Electrical', count: 35, percentage: 28 },
      { name: 'Gardening', count: 22, percentage: 18 },
      { name: 'Carpentry', count: 15, percentage: 12 },
      { name: 'Handyman', count: 5, percentage: 4 },
    ]
  };
};

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        const data = getBookingData();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (isLoading || !dashboardData) {
    return (
      <Layout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 h-96 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">Dashboard</h1>
      
      {/* Summary widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <BookingSummaryWidget
          title="Total Bookings"
          value={dashboardData.totalBookings}
          change={dashboardData.totalBookingsChange}
          changeLabel="vs last week"
          icon={<CalendarIcon className="w-6 h-6 text-white" />}
          iconColor="bg-blue-500"
        />
        <BookingSummaryWidget
          title="Confirmed Bookings"
          value={dashboardData.confirmedBookings}
          change={dashboardData.confirmedBookingsChange}
          changeLabel="vs last week"
          icon={<CheckCircleIcon className="w-6 h-6 text-white" />}
          iconColor="bg-green-500"
        />
        <BookingSummaryWidget
          title="Completed Bookings"
          value={dashboardData.completedBookings}
          change={dashboardData.completedBookingsChange}
          changeLabel="vs last week"
          icon={<CheckCircleIcon className="w-6 h-6 text-white" />}
          iconColor="bg-purple-500"
        />
        <BookingSummaryWidget
          title="Total Sales"
          value={`$${dashboardData.totalSales.toFixed(2)}`}
          change={dashboardData.totalSalesChange}
          changeLabel="vs last week"
          icon={<CurrencyDollarIcon className="w-6 h-6 text-white" />}
          iconColor="bg-yellow-500"
        />
        <BookingSummaryWidget
          title="Active Providers"
          value={dashboardData.totalProviders}
          change={dashboardData.totalProvidersChange}
          changeLabel="vs last month"
          icon={<UsersIcon className="w-6 h-6 text-white" />}
          iconColor="bg-red-500"
        />
      </div>
      
      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <PerformanceChart data={dashboardData.performanceData} />
        </div>
        <div>
          <Card title="Top Service Categories">
            <div className="space-y-4">
              {dashboardData.topCategories.map((category: any) => (
                <div key={category.name} className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {category.name}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {category.count} bookings
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      
      {/* Recent bookings table */}
      <RecentBookingsTable bookings={dashboardData.recentBookings} />
    </Layout>
  );
};

export default Dashboard;