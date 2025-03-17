import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const categories = [
    { name: 'Home', hasDropdown: false, path: '/' },
    { name: 'Kenya', hasDropdown: true, path: '#' },
    { name: 'World', hasDropdown: true, path: '#' },
    { name: 'Politics', hasDropdown: true, path: '#' },
    { name: 'Business', hasDropdown: true, path: '#' },
    { name: 'Technology', hasDropdown: true, path: '#' },
    { name: 'Sports', hasDropdown: true, path: '#' },
    { name: 'Entertainment', hasDropdown: true, path: '#' },
    { name: 'Opinion', hasDropdown: false, path: '#' },
  ];

  return (
    <nav className="bg-red-600 text-white sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4">
        <div className="hidden lg:flex items-center justify-between">
          <ul className="flex space-x-1">
            {categories.map((category, index) => (
              <li key={index} className="relative group">
                <Link 
                  to={category.path}
                  className="flex items-center px-3 py-4 hover:bg-red-700 transition duration-200"
                >
                  {category.name}
                  {category.hasDropdown && (
                    <ChevronDown size={16} className="ml-1" />
                  )}
                </Link>
                {category.hasDropdown && (
                  <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-b-md invisible group-hover:visible transition duration-200 opacity-0 group-hover:opacity-100">
                    <ul className="py-2 text-gray-800">
                      <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Subcategory 1</a></li>
                      <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Subcategory 2</a></li>
                      <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Subcategory 3</a></li>
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center">
            <a href="#" className="px-3 py-4 hover:bg-red-700 transition duration-200 text-sm font-medium">
              SUBSCRIBE
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;