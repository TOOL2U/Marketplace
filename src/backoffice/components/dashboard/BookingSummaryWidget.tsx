import React from 'react';
import Card from '../ui/Card';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid';

interface BookingSummaryProps {
  title: string;
  value: number;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  iconColor: string;
}

const BookingSummaryWidget: React.FC<BookingSummaryProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  iconColor,
}) => {
  const isPositiveChange = change >= 0;
  
  return (
    <Card className="h-full">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${iconColor}`}>
          {icon}
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            <div className={`ml-2 flex items-baseline text-sm ${
              isPositiveChange ? 'text-green-600' : 'text-red-600'
            }`}>
              {isPositiveChange ? (
                <ArrowUpIcon className="w-3 h-3 mr-1 flex-shrink-0 self-center" />
              ) : (
                <ArrowDownIcon className="w-3 h-3 mr-1 flex-shrink-0 self-center" />
              )}
              <span className="font-medium">{Math.abs(change)}%</span>
              <span className="ml-1 text-gray-500">{changeLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BookingSummaryWidget;