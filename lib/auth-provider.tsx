"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios'; 
import DashboardLoading from '@/app/dashboard/loading';

// Define the shape of the user object and the context
interface User {
  id: string;
  name: string | null;
  email: string;
  role: 'USER' | 'ADMIN';
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// This is the provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = async () => {
    try {
        // The proxy route for logout will handle clearing cookies from the backend
        await axios.post('/api/auth/logout');
    } catch (error) {
        console.error("Logout failed", error);
    } finally {
        setUser(null);
        router.push('/login');
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Use standard axios to call the Next.js API Proxy Route
        // This ensures the browser automatically sends the HttpOnly cookie.
        const response = await axios.get('/api/auth/profile');

        if (response.status !== 200) {
          throw new Error('Not authenticated');
        }


        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (isLoading) {
    return <DashboardLoading />;
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook to easily use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
