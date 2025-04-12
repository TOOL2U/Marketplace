import React from 'react';
import { CodeIcon, ServerIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Layout from '../../components/layout/Layout';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const Developers: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Developers Portal</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card title="API Documentation">
            <div className="flex items-center mb-4">
              <DocumentTextIcon className="w-12 h-12 text-indigo-600 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">API Docs</h3>
                <p className="text-gray-600">Explore our comprehensive API documentation</p>
              </div>
            </div>
            <Button 
              variant="primary" 
              fullWidth
              onClick={() => window.open('/api/docs', '_blank')}
            >
              View API Docs
            </Button>
          </Card>
          
          <Card title="Backend Services">
            <div className="flex items-center mb-4">
              <ServerIcon className="w-12 h-12 text-green-600 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Server Status</h3>
                <p className="text-gray-600">Check backend service health</p>
              </div>
            </div>
            <Button 
              variant="success" 
              fullWidth
              onClick={() => window.open('/api/health', '_blank')}
            >
              Check Health
            </Button>
          </Card>
          
          <Card title="Admin Dashboard">
            <div className="flex items-center mb-4">
              <CodeIcon className="w-12 h-12 text-purple-600 mr-4" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Backoffice</h3>
                <p className="text-gray-600">Access the administrative dashboard</p>
              </div>
            </div>
            <Button 
              variant="primary" 
              fullWidth
              onClick={() => window.location.href = '/admin'}
            >
              Go to Backoffice
            </Button>
          </Card>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="/api/swagger" 
              target="_blank" 
              className="border rounded-lg p-4 hover:bg-gray-50 transition flex items-center"
            >
              <CodeIcon className="w-6 h-6 mr-3 text-indigo-600" />
              <span>Swagger UI</span>
            </a>
            <a 
              href="/api/graphql" 
              target="_blank" 
              className="border rounded-lg p-4 hover:bg-gray-50 transition flex items-center"
            >
              <ServerIcon className="w-6 h-6 mr-3 text-green-600" />
              <span>GraphQL Playground</span>
            </a>
            <a 
              href="/developer/guides" 
              target="_blank" 
              className="border rounded-lg p-4 hover:bg-gray-50 transition flex items-center"
            >
              <DocumentTextIcon className="w-6 h-6 mr-3 text-purple-600" />
              <span>Developer Guides</span>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Developers;