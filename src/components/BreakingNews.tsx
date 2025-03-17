import React from 'react';
import { usePost } from '../context/PostContext';

const BreakingNews: React.FC = () => {
  const { posts } = usePost();
  
  // Get breaking news posts
  const breakingNews = posts.filter(post => post.breaking);
  
  // If no breaking news, don't show the component
  if (breakingNews.length === 0) {
    return null;
  }
  
  // Create a string of breaking news titles
  const breakingNewsText = breakingNews
    .map(post => post.title)
    .join(' | ');

  return (
    <div className="bg-red-600 text-white py-2 px-4 rounded-md mb-6">
      <div className="container mx-auto flex items-center overflow-hidden">
        <span className="font-bold mr-4 whitespace-nowrap">BREAKING NEWS:</span>
        <div className="overflow-hidden relative w-full">
          <div className="animate-marquee whitespace-nowrap">
            {breakingNewsText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;