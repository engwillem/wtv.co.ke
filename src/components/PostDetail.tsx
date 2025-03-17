import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, Calendar, User } from 'lucide-react';
import { usePost } from '../context/PostContext';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import Sidebar from './Sidebar';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPost, incrementViews } = usePost();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  const post = getPost(id || '');
  
  useEffect(() => {
    if (id) {
      incrementViews(id);
    }
  }, [id]);
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h2>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      
      <div className="flex flex-col min-h-screen">
        <Header toggleSidebar={toggleSidebar} />
        <Navbar />
        
        <main className="flex-grow container mx-auto px-4 py-6">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-red-600 hover:text-red-700">
              <ArrowLeft size={16} className="mr-1" />
              Back to Home
            </Link>
          </div>
          
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-96 object-cover"
            />
            
            <div className="p-6">
              <div className="mb-4">
                <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-sm">
                  {post.category}
                </span>
                {post.featured && (
                  <span className="bg-blue-600 text-white px-2 py-1 text-xs font-semibold rounded-sm ml-2">
                    FEATURED
                  </span>
                )}
                {post.breaking && (
                  <span className="bg-yellow-600 text-white px-2 py-1 text-xs font-semibold rounded-sm ml-2">
                    BREAKING
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
              
              <div className="flex items-center text-gray-600 mb-6">
                <div className="flex items-center mr-6">
                  <User size={16} className="mr-1" />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center mr-6">
                  <Calendar size={16} className="mr-1" />
                  <span>{post.publishedDate}</span>
                </div>
                <div className="flex items-center">
                  <Eye size={16} className="mr-1" />
                  <span>{post.views} views</span>
                </div>
              </div>
              
              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </article>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default PostDetail;