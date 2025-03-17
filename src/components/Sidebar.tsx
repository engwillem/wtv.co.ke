import React from 'react';
import { X, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const categories = [
    { name: 'Home', subcategories: [] },
    { 
      name: 'Kenya', 
      subcategories: ['Politics', 'Economy', 'Health', 'Education'] 
    },
    { 
      name: 'World', 
      subcategories: ['Africa', 'Europe', 'Americas', 'Asia', 'Middle East'] 
    },
    { 
      name: 'Politics', 
      subcategories: ['National', 'County', 'Parliament', 'Elections'] 
    },
    { 
      name: 'Business', 
      subcategories: ['Markets', 'Companies', 'Economy', 'Personal Finance'] 
    },
    { 
      name: 'Technology', 
      subcategories: ['Innovation', 'Startups', 'Mobile', 'Internet'] 
    },
    { 
      name: 'Sports', 
      subcategories: ['Football', 'Athletics', 'Rugby', 'Cricket', 'Basketball'] 
    },
    { 
      name: 'Entertainment', 
      subcategories: ['Celebrity', 'Music', 'Film', 'Arts', 'Lifestyle'] 
    },
    { name: 'Opinion', subcategories: [] },
  ];

  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      
      <div className="absolute top-0 left-0 w-80 h-full bg-white overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <a href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">WTV</span>
            <span className="text-2xl font-bold text-gray-800">.CO.KE</span>
          </a>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <ul className="space-y-1">
            {categories.map((category, index) => (
              <li key={index}>
                <div className="flex items-center justify-between py-2 px-3 hover:bg-gray-100 rounded-md">
                  <a href="#" className="text-gray-800 font-medium">{category.name}</a>
                  {category.subcategories.length > 0 && (
                    <ChevronRight size={18} className="text-gray-500" />
                  )}
                </div>
                {category.subcategories.length > 0 && (
                  <ul className="ml-6 mt-1 space-y-1">
                    {category.subcategories.map((sub, subIndex) => (
                      <li key={subIndex}>
                        <a 
                          href="#" 
                          className="block py-1 px-3 text-gray-600 hover:bg-gray-100 rounded-md"
                        >
                          {sub}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 border-t">
          <div className="flex space-x-4 mb-4">
            <a href="#" className="flex-1 bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700">
              Sign In
            </a>
            <a href="#" className="flex-1 bg-gray-200 text-gray-800 text-center py-2 rounded-md hover:bg-gray-300">
              Subscribe
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;