import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="mr-4 lg:hidden text-gray-700 hover:text-red-600"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="WTV.CO.KE" 
                className="h-10 mr-2"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            <button className="text-gray-700 hover:text-red-600">
              <Bell size={20} />
            </button>
            
            {user ? (
              <Link to="/admin" className="flex items-center space-x-2 border-l pl-4">
                <User size={20} className="text-gray-700" />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
            ) : (
              <Link to="/admin/login" className="flex items-center space-x-2 border-l pl-4">
                <User size={20} className="text-gray-700" />
                <span className="text-sm font-medium">Sign In</span>
              </Link>
            )}
          </div>
          
          <div className="flex md:hidden">
            <button className="text-gray-700 hover:text-red-600 mr-4">
              <Search size={20} />
            </button>
            {user ? (
              <Link to="/admin" className="text-gray-700 hover:text-red-600">
                <User size={20} />
              </Link>
            ) : (
              <Link to="/admin/login" className="text-gray-700 hover:text-red-600">
                <User size={20} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;