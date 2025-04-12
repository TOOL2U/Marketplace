import React, { useState } from 'react';
import { authApi } from '../../backoffice/api/auth';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authApi.register(name, email, password);
      if (response.success) {
        setMessage('Registration successful! You can now log in.');
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      setMessage('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="p-6 bg-white rounded shadow-md w-96">
        <h1 className="mb-4 text-2xl font-bold text-center">Sign Up</h1>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;