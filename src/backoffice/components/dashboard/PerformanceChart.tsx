import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import Card from '../ui/Card';

interface ChartData {
  name: string;
  bookings: number;
  revenue: number;
}

interface PerformanceChartProps {
  data: ChartData[];
  isLoading?: boolean;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ 
  data, 
  isLoading = false 
}) => {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  
  const formatCurrency = (value: number) => (
    `$${value.toFixed(2)}`
  );
  
  if (isLoading) {
    return (
      <Card title="Performance Overview">
        <div className="animate-pulse">
          <div className="flex justify-end mb-4">
            <div className="h-8 w-64 bg-gray-200 rounded"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card title="Performance Overview">
      <div className="flex justify-end mb-4">
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
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" tickFormatter={formatCurrency} />
            <Tooltip 
              formatter={(value, name) => {
                if (name === 'revenue') {
                  return [formatCurrency(value as number), 'Revenue'];
                }
                return [value, 'Bookings'];
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="bookings"
              yAxisId="left"
              stackId="1"
              stroke="#4F46E5"
              fill="#818CF8"
              activeDot={{ r: 8 }}
              name="Bookings"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              yAxisId="right"
              stackId="2"
              stroke="#059669"
              fill="#34D399"
              name="Revenue"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PerformanceChart;