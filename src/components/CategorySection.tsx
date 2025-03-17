import React from 'react';
import { Link } from 'react-router-dom';
import { usePost } from '../context/PostContext';

interface CategorySectionProps {
  title: string;
  category: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, category }) => {
  const { posts } = usePost();
  
  // Get posts for this category (case insensitive)
  const categoryPosts = posts.filter(
    post => post.category.toLowerCase() === category.toLowerCase()
  ).slice(0, 3);
  
  // If no posts in this category, don't show the section
  if (categoryPosts.length === 0) {
    return null;
  }

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <Link to="/" className="text-blue-600 hover:underline text-sm font-medium">More in {title}</Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{post.publishedDate}</p>
              <p className="text-gray-600 mt-2 text-sm">{post.excerpt}</p>
              <Link to={`/post/${post.id}`} className="text-blue-600 hover:underline text-sm font-medium mt-3 inline-block">
                Read Full Story
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;