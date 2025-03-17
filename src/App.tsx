import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Menu, Search, Bell, User, ChevronDown, ArrowRight, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import BreakingNews from './components/BreakingNews';
import FeaturedNews from './components/FeaturedNews';
import LatestNews from './components/LatestNews';
import CategorySection from './components/CategorySection';
import NewsTracker from './components/NewsTracker';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import CreatePost from './components/admin/CreatePost';
import ManageUsers from './components/admin/ManageUsers';
import SocialMediaSettings from './components/admin/SocialMediaSettings';
import PostDetail from './components/PostDetail';
import { AuthProvider } from './context/AuthContext';
import { PostProvider } from './context/PostContext';
import { SocialMediaProvider } from './context/SocialMediaContext';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AuthProvider>
      <PostProvider>
        <SocialMediaProvider>
          <Router>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/create-post" element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              } />
              <Route path="/admin/manage-users" element={
                <ProtectedRoute>
                  <ManageUsers />
                </ProtectedRoute>
              } />
              <Route path="/admin/social-media" element={
                <ProtectedRoute>
                  <SocialMediaSettings />
                </ProtectedRoute>
              } />
              
              {/* Public Routes */}
              <Route path="/" element={
                <MainLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
              } />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </SocialMediaProvider>
      </PostProvider>
    </AuthProvider>
  );
}

const MainLayout = ({ sidebarOpen, toggleSidebar }: { sidebarOpen: boolean, toggleSidebar: () => void }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <BreakingNews />
          <FeaturedNews />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            <div className="lg:col-span-2">
              <LatestNews />
              <CategorySection 
                title="Politics" 
                category="politics" 
              />
              <CategorySection 
                title="Business" 
                category="business" 
              />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <NewsTracker />
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Subscribe to Newsletter</h3>
                  <p className="text-gray-600 mb-4">Get the latest news delivered to your inbox</p>
                  <form className="space-y-4">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      type="submit" 
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Most Popular</h3>
                  <ul className="space-y-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <li key={item} className="border-b pb-3 last:border-0">
                        <a href="#" className="text-gray-800 hover:text-red-600 font-medium">
                          Kenya's Economy Shows Signs of Recovery Amid Global Challenges
                        </a>
                        <p className="text-sm text-gray-500 mt-1">2 hours ago</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Follow Us</h3>
                  <div className="flex space-x-4 mt-4">
                    <a href="#" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                      <Facebook size={20} />
                    </a>
                    <a href="#" className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500">
                      <Twitter size={20} />
                    </a>
                    <a href="#" className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700">
                      <Youtube size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;