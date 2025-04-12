import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import RevenueOverview from '../components/sales/RevenueOverview';
import CategoryBreakdown from '../components/sales/CategoryBreakdown';
import ExportTools from '../components/sales/ExportTools';
import Card from '../components/ui/Card';
import {
  TableIcon,
  UserIcon,
  LocationMarkerIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/outline';

// Mock API functions - Replace with real API calls
const fetchSalesData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  return {
    totalRevenue: 45750.25,
    totalBookings: 587,
    averageBookingValue: 77.94,
    conversionRate: 68.5,
    
    dailyData: [
      { name: 'May 1', revenue: 1250.50, bookings: 18 },
      { name: 'May 2', revenue: 980.75, bookings: 12 },
      { name: 'May 3', revenue: 1575.25, bookings: 20 },
      { name: 'May 4', revenue: 1350.00, bookings: 17 },
      { name: 'May 5', revenue: 925.50, bookings: 14 },
      { name: 'May 6', revenue: 1720.25, bookings: 22 },
      { name: 'May 7', revenue: 1890.75, bookings: 25 },
    ],
    
    weeklyData: [
      { name: 'Week 1', revenue: 8750.50, bookings: 112 },
      { name: 'Week 2', revenue: 9250.75, bookings: 119 },
      { name: 'Week 3', revenue: 8500.25, bookings: 105 },
      { name: 'Week 4', revenue: 10500.00, bookings: 132 },
      { name: 'Week 5', revenue: 8750.75, bookings: 119 },
    ],
    
    monthlyData: [
      { name: 'Jan', revenue: 32500.50, bookings: 421 },
      { name: 'Feb', revenue: 28750.75, bookings: 375 },
      { name: 'Mar', revenue: 35200.25, bookings: 452 },
      { name: 'Apr', revenue: 38500.00, bookings: 492 },
      { name: 'May', revenue: 45750.25, bookings: 587 },
    ],
    
    categoryData: [
      { name: 'Plumbing', value: 15250.50, percentage: 33, color: '#4F46E5' },
      { name: 'Electrical', value: 12750.25, percentage: 28, color: '#10B981' },
      { name: 'Gardening', value: 8235.75, percentage: 18, color: '#F59E0B' },
      { name: 'Carpentry', value: 5490.00, percentage: 12, color: '#EF4444' },
      { name: 'Handyman', value: 4023.75, percentage: 9, color: '#8B5CF6' },
    ],
    
    providerData: [
      { name: 'Mike Smith', value: 9150.25, percentage: 20, color: '#4F46E5' },
      { name: 'Robert Johnson', value: 7320.50, percentage: 16, color: '#10B981' },
      { name: 'Sarah Davis', value: 6862.75, percentage: 15, color: '#F59E0B' },
      { name: 'David Williams', value: 5947.50, percentage: 13, color: '#EF4444' },
      { name: 'Emily Davis', value: 5032.50, percentage: 11, color: '#8B5CF6' },
      { name: 'Others', value: 11436.75, percentage: 25, color: '#6B7280' },
    ],
    
    regionData: [
      { name: 'New York', value: 11437.56, percentage: 25, color: '#4F46E5' },
      { name: 'Los Angeles', value: 9150.05, percentage: 20, color: '#10B981' },
      { name: 'Chicago', value: 6862.54, percentage: 15, color: '#F59E0B' },
      { name: 'Houston', value: 5490.03, percentage: 12, color: '#EF4444' },
      { name: 'Phoenix', value: 4575.03, percentage: 10, color: '#8B5CF6' },
      { name: 'Others', value: 8235.04, percentage: 18, color: '#6B7280' },
    ],
    
    topBookings: [
      { id: '12345', customer: 'John Doe', service: 'Plumbing', amount: 350.00 },
      { id: '12346', customer: 'Jane Wilson', service: 'Electrical', amount: 275.50 },
      { id: '12347', customer: 'Emily Brown', service: 'Carpentry', amount: 450.25 },
      { id: '12348', customer: 'Michael Taylor', service: 'Gardening', amount: 225.00 },
      { id: '12349', customer: 'Alex Johnson', service: 'Plumbing', amount: 320.75 },
    ],
  };
};

const exportData = async (type: string, dateRange: { start: string; end: string }) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  console.log(`Exporting ${type} for date range: ${dateRange.start} to ${dateRange.end}`);
  
  // In a real app, this would trigger a download of the exported file
  return true;
};

const SalesPage: React.FC = () => {
  const [salesData, setSalesData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchSalesData();
        setSalesData(data);
      } catch (error) {
        console.error('Error loading sales data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const handleExport = async (type: string, dateRange: { start: string; end: string }) => {
    setIsExporting(true);
    try {
      await exportData(type, dateRange);
      alert(`${type.split('_')[0].charAt(0).toUpperCase() + type.split('_')[0].slice(1)} data exported successfully!`);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };
  
  if (isLoading || !salesData) {
    return (
      <Layout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="h-80 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2 h-60 bg-gray-200 rounded"></div>
            <div className="h-60 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Sales & Analytics</h1>
        <p className="mt-1 text-sm text-gray-600">
          Track revenue, bookings and analyze performance metrics
        </p>
      </div>
      
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <CurrencyDollarIcon className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-lg font-semibold text-gray-900">${salesData.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <TableIcon className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Bookings</p>
              <p className="text-lg font-semibold text-gray-900">{salesData.totalBookings}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <UserIcon className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg. Booking Value</p>
              <p className="text-lg font-semibold text-gray-900">${salesData.averageBookingValue.toFixed(2)}</p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <LocationMarkerIcon className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
              <p className="text-lg font-semibold text-gray-900">{salesData.conversionRate}%</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Revenue Overview Chart */}
      <div className="mb-8">
        <RevenueOverview
          dailyData={salesData.dailyData}
          weeklyData={salesData.weeklyData}
          monthlyData={salesData.monthlyData}
          totalRevenue={salesData.totalRevenue}
          totalBookings={salesData.totalBookings}
          averageBookingValue={salesData.averageBookingValue}
        />
      </div>
      
      {/* Category and Provider Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CategoryBreakdown
          data={salesData.categoryData}
          title="Revenue by Service Category"
        />
        
        <CategoryBreakdown
          data={salesData.providerData}
          title="Revenue by Provider"
        />
      </div>
      
      {/* Location Breakdown and Export Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <CategoryBreakdown
            data={salesData.regionData}
            title="Revenue by Location"
          />
        </div>
        
        <div>
          <ExportTools
            onExport={handleExport}
            isLoading={isExporting}
          />
        </div>
      </div>
      
      {/* Top Bookings */}
      <div className="mb-8">
        <Card title="Top Bookings by Value">
          <div className="overflow-x-auto">
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
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesData.topBookings.map((booking: any) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{booking.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                      ${booking.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default SalesPage;