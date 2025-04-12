import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Card from '../ui/Card';

interface RevenueData {
  name: string;
  revenue: number;
  bookings: number;
}

interface RevenueOverviewProps {
  dailyData: RevenueData[];
  weeklyData: RevenueData[];
  monthlyData: RevenueData[];
  totalRevenue: number;
  totalBookings: number;
  averageBookingValue: number;
  isLoading?: boolean;
}

const RevenueOverview: React.FC<RevenueOverviewProps> = ({
  dailyData,
  weeklyData,
  monthlyData,
  totalRevenue,
  totalBookings,
  averageBookingValue,
  isLoading = false,
}) => {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  
  const formatCurrency = (value: number) => (
    `$${value.toFixed(2)}`
  );
  
  // Get data based on selected time range
  const chartData = {
    daily: dailyData,
    weekly: weeklyData,
    monthly: monthlyData,
  }[timeRange];

  if (isLoading) {
    return (
      <Card title="Revenue Overview">
        <div className="animate-pulse">
          <div className="flex justify-between mb-6">
            <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-10 w-1/4 bg-gray-200 rounded"></div>
          </div>
          <div className="h-80 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Revenue Overview">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-medium text-gray-800">
            Total Revenue: <span className="text-indigo-600">{formatCurrency(totalRevenue)}</span>
          </h3>
        </div>
        
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              timeRange === 'daily'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-200`}
            onClick={() => setTimeRange('daily')}
          >
            Daily
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'weekly'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border-t border-b border-gray-200`}
            onClick={() => setTimeRange('weekly')}
          >
            Weekly
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              timeRange === 'monthly'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-200`}
            onClick={() => setTimeRange('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>
      
      <div className="h-80 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#4F46E5" />
            <YAxis yAxisId="right" orientation="right" stroke="#10B981" tickFormatter={formatCurrency} />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'revenue') {
                  return [formatCurrency(value as number), 'Revenue'];
                }
                return [value, 'Bookings'];
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="bookings" name="Bookings" fill="#818CF8" />
            <Bar yAxisId="right" dataKey="revenue" name="Revenue" fill="#34D399" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 rounded-lg p-4">
          <p className="text-sm font-medium text-indigo-800 mb-1">Total Revenue</p>
          <p className="text-2xl font-bold text-indigo-900">{formatCurrency(totalRevenue)}</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm font-medium text-green-800 mb-1">Total Bookings</p>
          <p className="text-2xl font-bold text-green-900">{totalBookings}</p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-800 mb-1">Average Booking Value</p>
          <p className="text-2xl font-bold text-blue-900">{formatCurrency(averageBookingValue)}</p>
        </div>
      </div>
    </Card>
  );
};

export default RevenueOverview;