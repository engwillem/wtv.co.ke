import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Users, FileText, BarChart2, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePost } from '../../context/PostContext';
import AdminLayout from './AdminLayout';

const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { posts } = usePost();
  
  // Calculate total views
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  
  // Get recent posts (last 5)
  const recentPosts = [...posts].sort((a, b) => 
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  ).slice(0, 5);
  
  // Get popular posts (top 5 by views)
  const popularPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.username}!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Posts</p>
              <h3 className="text-3xl font-bold text-gray-800">{posts.length}</h3>
            </div>
            <FileText size={40} className="text-red-600 opacity-80" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Views</p>
              <h3 className="text-3xl font-bold text-gray-800">{totalViews.toLocaleString()}</h3>
            </div>
            <BarChart2 size={40} className="text-red-600 opacity-80" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Featured Posts</p>
              <h3 className="text-3xl font-bold text-gray-800">
                {posts.filter(post => post.featured).length}
              </h3>
            </div>
            <FileText size={40} className="text-red-600 opacity-80" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Recent Posts</h3>
            <Link to="/admin/create-post" className="text-red-600 hover:text-red-700 text-sm font-medium">
              Create New
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentPosts.map(post => (
              <div key={post.id} className="border-b pb-3 last:border-0">
                <h4 className="font-medium text-gray-800">{post.title}</h4>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-500">{post.publishedDate}</p>
                  <p className="text-sm text-gray-500">{post.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Popular Posts</h3>
            <Link to="/admin/manage-users" className="text-red-600 hover:text-red-700 text-sm font-medium">
              Manage Users
            </Link>
          </div>
          
          <div className="space-y-4">
            {popularPosts.map(post => (
              <div key={post.id} className="border-b pb-3 last:border-0">
                <h4 className="font-medium text-gray-800">{post.title}</h4>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-500">{post.category}</p>
                  <p className="text-sm font-medium text-red-600">{post.views.toLocaleString()} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;