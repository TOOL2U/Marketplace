import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import {
  CalendarIcon,
  DocumentDownloadIcon,
  DocumentTextIcon,
  TableIcon,
  ChartBarIcon,
} from '@heroicons/react/outline';

interface ExportToolsProps {
  onExport: (type: string, dateRange: { start: string; end: string }) => void;
  isLoading?: boolean;
}

const ExportTools: React.FC<ExportToolsProps> = ({
  onExport,
  isLoading = false,
}) => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [exportType, setExportType] = useState<'csv' | 'pdf'>('csv');
  const [exportData, setExportData] = useState<'bookings' | 'revenue' | 'providers'>('bookings');
  
  const handleExport = () => {
    if (!dateRange.start || !dateRange.end) {
      alert('Please select a date range');
      return;
    }
    
    onExport(`${exportData}_${exportType}`, dateRange);
  };
  
  return (
    <Card title="Export Data">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
                placeholder="Start date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
                placeholder="End date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                id="csv-format"
                type="radio"
                name="export-format"
                value="csv"
                checked={exportType === 'csv'}
                onChange={() => setExportType('csv')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label htmlFor="csv-format" className="ml-2 block text-sm text-gray-700">
                CSV
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="pdf-format"
                type="radio"
                name="export-format"
                value="pdf"
                checked={exportType === 'pdf'}
                onChange={() => setExportType('pdf')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label htmlFor="pdf-format" className="ml-2 block text-sm text-gray-700">
                PDF
              </label>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Data to Export</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div 
              className={`border rounded-lg p-4 cursor-pointer text-center ${
                exportData === 'bookings' 
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setExportData('bookings')}
            >
              <TableIcon className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Bookings</span>
            </div>
            <div 
              className={`border rounded-lg p-4 cursor-pointer text-center ${
                exportData === 'revenue' 
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setExportData('revenue')}
            >
              <ChartBarIcon className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Revenue</span>
            </div>
            <div 
              className={`border rounded-lg p-4 cursor-pointer text-center ${
                exportData === 'providers' 
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setExportData('providers')}
            >
              <DocumentTextIcon className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Providers</span>
            </div>
          </div>
        </div>
        
        <Button
          variant="primary"
          leftIcon={<DocumentDownloadIcon className="w-5 h-5" />}
          onClick={handleExport}
          isLoading={isLoading}
          fullWidth
        >
          Export {exportData.charAt(0).toUpperCase() + exportData.slice(1)} as {exportType.toUpperCase()}
        </Button>
      </div>
    </Card>
  );
};

export default ExportTools;