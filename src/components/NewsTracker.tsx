import React from 'react';
import { usePost } from '../context/PostContext';
import { Link } from 'react-router-dom';
import { Clock, TrendingUp, Eye } from 'lucide-react';

const NewsTracker: React.FC = () => {
  const { posts } = usePost();
  
  // Get most viewed posts in the last 24 hours
  const trendingPosts = [...posts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <TrendingUp className="mr-2 text-red-600" size={24} />
          News Tracker
        </h2>
      </div>
      
      <div className="space-y-4">
        {trendingPosts.map((post) => (
          <div key={post.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
            <Link 
              to={`/post/${post.id}`}
              className="group"
            >
              <div className="flex items-start space-x-4">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-20 h-20 object-cover rounded-md group-hover:opacity-90 transition"
                />
                <div className="flex-1">
                  <h3 className="text-gray-800 font-medium line-clamp-2 group-hover:text-red-600 transition">
                    {post.title}
                  </h3>
                  <div className="flex items-center mt-2 text-sm text-gray-500 space-x-4">
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {post.publishedDate}
                    </span>
                    <span className="flex items-center">
                      <Eye size={14} className="mr-1" />
                      {post.views} views
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-medium text-gray-800 mb-2">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Stories</p>
              <p className="text-xl font-bold text-gray-800">{posts.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-xl font-bold text-gray-800">
                {posts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsTracker;