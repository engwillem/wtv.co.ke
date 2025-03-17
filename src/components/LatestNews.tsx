import React from 'react';
import { Link } from 'react-router-dom';
import { usePost } from '../context/PostContext';
import { format } from 'date-fns';

const LatestNews: React.FC = () => {
  const { posts } = usePost();
  
  // Get the latest posts (up to 4)
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 4);

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Latest News</h2>
        <Link to="/" className="text-blue-600 hover:underline text-sm font-medium">View All</Link>
      </div>
      
      {latestPosts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">No posts available. Create some in the admin section!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="p-4 md:w-3/5">
                <span className="bg-gray-200 text-gray-800 px-2 py-1 text-xs font-semibold rounded-sm">{post.category}</span>
                <h3 className="text-lg font-bold mt-2 text-gray-800">{post.title}</h3>
                <p className="text-gray-600 mt-2 text-sm">{post.excerpt}</p>
                <div className="flex items-center mt-4">
                  <div>
                    <p className="text-gray-800 font-medium text-sm">{post.author.name}</p>
                    <p className="text-gray-500 text-xs">{post.publishedDate} • {Math.ceil(post.content.length / 1000)} min read</p>
                  </div>
                </div>
                <Link to={`/post/${post.id}`} className="text-blue-600 hover:underline text-sm font-medium mt-2 inline-block">
                  Read Full Story
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestNews;