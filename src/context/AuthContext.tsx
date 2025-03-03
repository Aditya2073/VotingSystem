
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Define types
type User = {
  id: string;
  name: string;
  email: string;
  voterId: string;
  isAdmin: boolean;
  hasVoted: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, voterId: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

// Mock database for development
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    voterId: 'ADMIN123',
    password: 'password123',
    isAdmin: true,
    hasVoted: false
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    voterId: 'VOTER123',
    password: 'password123',
    isAdmin: false,
    hasVoted: false
  }
];

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check for saved session on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error('Authentication error:', err);
        setError('Failed to restore session');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Find user in mock DB
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser || foundUser.password !== password) {
        throw new Error('Invalid credentials');
      }
      
      // Remove password before setting to state/storage
      const { password: _, ...safeUser } = foundUser;
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(safeUser));
      
      // Update state
      setUser(safeUser);
      toast.success('Login successful!');
      
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to login');
      toast.error(err.message || 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, voterId: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists
      if (mockUsers.some(u => u.email === email)) {
        throw new Error('Email already in use');
      }
      
      if (mockUsers.some(u => u.voterId === voterId)) {
        throw new Error('Voter ID already registered');
      }
      
      // Create new user
      const newUser = {
        id: (mockUsers.length + 1).toString(),
        name,
        email,
        voterId,
        password,
        isAdmin: false,
        hasVoted: false
      };
      
      // Add to mock DB (in a real app this would be an API call)
      mockUsers.push(newUser);
      
      // Remove password before setting to state/storage
      const { password: _, ...safeUser } = newUser;
      
      // Update state
      setUser(safeUser);
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(safeUser));
      
      toast.success('Registration successful!');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register');
      toast.error(err.message || 'Failed to register');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.info('Logged out successfully');
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
