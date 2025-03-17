import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePost } from '../context/PostContext';

const FeaturedNews: React.FC = () => {
  const { posts } = usePost();
  
  // Get featured posts
  const featuredPosts = posts.filter(post => post.featured).slice(0, 3);
  
  // If no featured posts, use the most recent posts
  const displayPosts = featuredPosts.length > 0 
    ? featuredPosts 
    : [...posts].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()).slice(0, 3);
  
  // Main featured post is the first one
  const mainPost = displayPosts[0];
  
  // Secondary posts are the rest
  const secondaryPosts = displayPosts.slice(1, 3);

  if (!mainPost) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600">No featured posts available. Create some in the admin section!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Main Featured Article */}
      <div className="md:col-span-2 lg:col-span-2 relative rounded-lg overflow-hidden group">
        <img 
          src={mainPost.image} 
          alt={mainPost.title} 
          className="w-full h-96 object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-sm">FEATURED</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">{mainPost.title}</h2>
          <p className="text-gray-200 mt-2 line-clamp-2">{mainPost.excerpt}</p>
          <div className="flex items-center mt-4">
            <div>
              <p className="text-white font-medium">{mainPost.author.name}</p>
              <p className="text-gray-300 text-sm">{mainPost.publishedDate} • {Math.ceil(mainPost.content.length / 1000)} min read</p>
            </div>
          </div>
          <Link to={`/post/${mainPost.id}`} className="inline-block mt-4 text-white bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition duration-200">
            Read Full Story
          </Link>
        </div>
      </div>
      
      {/* Secondary Featured Articles */}
      <div className="space-y-6">
        {secondaryPosts.length > 0 ? (
          secondaryPosts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-48 object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="p-4">
                <span className="bg-blue-600 text-white px-2 py-1 text-xs font-semibold rounded-sm">{post.category}</span>
                <h3 className="text-lg font-bold mt-2 text-gray-800">{post.title}</h3>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">{post.excerpt}</p>
                <Link to={`/post/${post.id}`} className="flex items-center text-blue-600 font-medium mt-3 text-sm">
                  Read More <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600">Add more posts to see them here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedNews;