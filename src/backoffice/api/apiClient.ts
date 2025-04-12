/**
 * API Client for interacting with the backend
 * This utility provides methods for making authenticated API requests
 */

// Base URL for API requests - would typically come from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

// HTTP request methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * Makes an authenticated API request
 * 
 * @param endpoint - API endpoint path (without base URL)
 * @param method - HTTP method
 * @param data - Request payload for POST/PUT/PATCH requests
 * @returns Promise with response data
 */
export async function apiRequest<T = any>(
  endpoint: string,
  method: HttpMethod = 'GET',
  data?: any
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('admin_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };
  
  if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
    config.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(url, config);
    
    // Handle unauthorized responses (e.g., expired token)
    if (response.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/admin/login';
      throw new Error('Unauthorized access. Please log in again.');
    }
    
    if (!response.ok) {
      // Attempt to parse error message from response
      let errorMessage = 'An error occurred during the API request';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If error response isn't JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }
      
      throw new Error(errorMessage);
    }
    
    // For 204 No Content responses
    if (response.status === 204) {
      return {} as T;
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * Utility methods for common HTTP verbs
 */
export const api = {
  get: <T = any>(endpoint: string) => apiRequest<T>(endpoint, 'GET'),
  post: <T = any>(endpoint: string, data: any) => apiRequest<T>(endpoint, 'POST', data),
  put: <T = any>(endpoint: string, data: any) => apiRequest<T>(endpoint, 'PUT', data),
  patch: <T = any>(endpoint: string, data: any) => apiRequest<T>(endpoint, 'PATCH', data),
  delete: <T = any>(endpoint: string) => apiRequest<T>(endpoint, 'DELETE'),
};