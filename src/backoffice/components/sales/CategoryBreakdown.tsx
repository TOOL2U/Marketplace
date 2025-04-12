import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import Card from '../ui/Card';

interface CategoryData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

interface CategoryBreakdownProps {
  data: CategoryData[];
  title?: string;
  isLoading?: boolean;
}

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316'];

const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  data,
  title = 'Category Breakdown',
  isLoading = false,
}) => {
  const formatCurrency = (value: number) => (
    `$${value.toFixed(2)}`
  );
  
  if (isLoading) {
    return (
      <Card title={title}>
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card title={title}>
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value as number)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-4">
        {data.map((category) => (
          <div key={category.name} className="flex items-center">
            <div className="w-full">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {category.name}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {formatCurrency(category.value)} ({category.percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full" 
                  style={{ 
                    width: `${category.percentage}%`,
                    backgroundColor: category.color || COLORS[data.indexOf(category) % COLORS.length] 
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CategoryBreakdown;