import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types
interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor';
  createdBy?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  createUser: (userData: Omit<User, 'id'>) => Promise<User>;
  getUsers: () => User[];
  deleteUser: (id: string) => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin user
const adminUser: User = {
  id: '1',
  username: 'Felix Omondi',
  email: 'ofelix175@gmail.com',
  role: 'admin'
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([adminUser]);

  // Check for saved user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('wtvUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const savedUsers = localStorage.getItem('wtvUsers');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      localStorage.setItem('wtvUsers', JSON.stringify(users));
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Check for admin credentials
    if (email === 'ofelix175@gmail.com' && password === '33826714@Fo') {
      setUser(adminUser);
      localStorage.setItem('wtvUser', JSON.stringify(adminUser));
      return true;
    }
    
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('wtvUser');
  };

  // Create user function
  const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
    if (!user || user.role !== 'admin') {
      throw new Error('Only admins can create users');
    }
    
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdBy: user.id
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('wtvUsers', JSON.stringify(updatedUsers));
    
    return newUser;
  };

  // Get users function
  const getUsers = (): User[] => {
    return users.filter(u => u.id !== user?.id);
  };

  // Delete user function
  const deleteUser = (id: string) => {
    if (!user || user.role !== 'admin') {
      throw new Error('Only admins can delete users');
    }
    
    const updatedUsers = users.filter(u => u.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('wtvUsers', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      createUser,
      getUsers,
      deleteUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};