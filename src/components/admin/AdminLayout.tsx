import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlusCircle, Users, FileText, LayoutDashboard, LogOut, Share2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md fixed h-full">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="WTV.CO.KE" className="h-8 mr-2" />
          </Link>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm text-gray-500">Logged in as</p>
            <p className="font-medium text-gray-800">{user?.username}</p>
            <p className="text-xs text-gray-500">{user?.role}</p>
          </div>
          
          <nav className="space-y-1">
            <Link to="/admin" className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
              <LayoutDashboard size={18} className="mr-2" />
              Dashboard
            </Link>
            <Link to="/admin/create-post" className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
              <PlusCircle size={18} className="mr-2" />
              Create Post
            </Link>
            {user?.role === 'admin' && (
              <>
                <Link to="/admin/manage-users" className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                  <Users size={18} className="mr-2" />
                  Manage Users
                </Link>
                <Link to="/admin/social-media" className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md">
                  <Share2 size={18} className="mr-2" />
                  Social Media
                </Link>
              </>
            )}
          </nav>
        </div>
        
        <div className="absolute bottom-0 w-full p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center px-3 py-2 text-gray-800 hover:bg-gray-100 rounded-md w-full"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="ml-64 flex-1 p-8">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;