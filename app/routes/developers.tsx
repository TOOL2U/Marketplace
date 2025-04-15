// FILE: app/routes/developers.tsx
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { useState } from "react";
import { FaCode, FaBookmark, FaTasks, FaBug, FaUsers, FaDatabase, FaCalendarAlt } from "react-icons/fa";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export async function loader() {
  // In a real implementation, you might fetch data from your backend
  return json({
    apiEndpoints: [
      { name: "Services", url: "/api/services", method: "GET" },
      { name: "Providers", url: "/api/providers", method: "GET" },
      { name: "Bookings", url: "/api/bookings", method: "POST" },
      { name: "User Profile", url: "/api/user/:id", method: "GET" },
    ],
    environments: ["Development", "Staging", "Production"]
  });
}

export default function DevelopersPage() {
  const { apiEndpoints, environments } = useLoaderData<typeof loader>();
  const [selectedEnv, setSelectedEnv] = useState("Development");
  const [testResults, setTestResults] = useState<string | null>(null);
  
  // Mock function to simulate running tests
  const runTest = (testType: string) => {
    setTestResults(`Running ${testType} tests in ${selectedEnv} environment...`);
    // In a real implementation, you would call actual test endpoints
    setTimeout(() => {
      setTestResults(`✅ ${testType} tests completed successfully in ${selectedEnv} environment!`);
    }, 1500);
  };

  const simulateBooking = () => {
    setTestResults("Simulating booking process...");
    // Mock booking process
    setTimeout(() => {
      setTestResults("✅ Booking simulation completed! Check console for details.");
      console.log("Booking simulation details:", {
        service: "Plumbing",
        provider: "John Doe",
        date: new Date().toISOString(),
        status: "PENDING"
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <div className="container-custom py-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Developer Tools</h1>
          <Link 
            to="/bookings"
            className="flex items-center bg-yellow text-black px-5 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors"
          >
            <FaCalendarAlt className="mr-2" /> View Bookings Management
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Environment Selector */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaDatabase className="mr-2 text-yellow" />
              Environment
            </h2>
            <div className="flex flex-col space-y-2">
              {environments.map(env => (
                <button
                  key={env}
                  onClick={() => setSelectedEnv(env)}
                  className={`py-2 px-4 rounded-md transition ${
                    selectedEnv === env 
                      ? "bg-yellow text-black" 
                      : "bg-darkgray text-white hover:bg-gray-700"
                  }`}
                >
                  {env}
                </button>
              ))}
            </div>
          </div>
          
          {/* Test Runner */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaBug className="mr-2 text-yellow" />
              Test Runner
            </h2>
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => runTest("API")} 
                className="bg-darkgray text-white hover:bg-gray-700 py-2 px-4 rounded-md transition"
              >
                Run API Tests
              </button>
              <button 
                onClick={() => runTest("UI")} 
                className="bg-darkgray text-white hover:bg-gray-700 py-2 px-4 rounded-md transition"
              >
                Run UI Tests
              </button>
              <button 
                onClick={() => runTest("Integration")} 
                className="bg-darkgray text-white hover:bg-gray-700 py-2 px-4 rounded-md transition"
              >
                Run Integration Tests
              </button>
            </div>
          </div>
          
          {/* Booking Simulator */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaBookmark className="mr-2 text-yellow" />
              Booking Simulator
            </h2>
            <button 
              onClick={simulateBooking} 
              className="bg-yellow text-black hover:bg-opacity-90 py-2 px-4 rounded-md transition w-full"
            >
              Simulate Booking Process
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Creates a test booking and logs the process to console
            </p>
          </div>
        </div>
        
        {/* Test Results */}
        {testResults && (
          <div className="card p-6 mb-12">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaTasks className="mr-2 text-yellow" />
              Test Results
            </h2>
            <div className="bg-darkgray text-white p-4 rounded-md">
              <code>{testResults}</code>
            </div>
          </div>
        )}
        
        {/* API Documentation */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaCode className="mr-2 text-yellow" />
            API Endpoints
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Endpoint</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">URL</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Method</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {apiEndpoints.map((endpoint, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 text-sm">{endpoint.name}</td>
                    <td className="px-4 py-3 text-sm font-mono">{endpoint.url}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-block px-2 py-1 rounded-md text-xs ${
                        endpoint.method === 'GET' 
                          ? 'bg-green-100 text-green-800' 
                          : endpoint.method === 'POST'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <button 
                        className="text-yellow hover:text-yellow-500 underline"
                        onClick={() => {
                          setTestResults(`Testing ${endpoint.method} ${endpoint.url}...`);
                          setTimeout(() => {
                            setTestResults(`✅ Endpoint ${endpoint.method} ${endpoint.url} is working correctly!`);
                          }, 1000);
                        }}
                      >
                        Test
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Simulation */}
        <div className="card p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaUsers className="mr-2 text-yellow" />
            User Simulation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <button 
                className="bg-darkgray text-white hover:bg-gray-700 py-2 px-4 rounded-md transition w-full"
                onClick={() => setTestResults("Simulating provider user session...")}
              >
                Simulate Provider User
              </button>
            </div>
            <div>
              <button 
                className="bg-darkgray text-white hover:bg-gray-700 py-2 px-4 rounded-md transition w-full"
                onClick={() => setTestResults("Simulating customer user session...")}
              >
                Simulate Customer User
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}