import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useSocialMedia } from '../context/SocialMediaContext';

const Footer: React.FC = () => {
  const { socialMedia } = useSocialMedia();

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <a href="/" className="flex items-center mb-4">
              <img src="/logo.png" alt="WTV.CO.KE" className="h-10 mr-2 bg-white rounded p-1" />
            </a>
            <p className="text-gray-400 mb-4">
              Your trusted source for breaking news, in-depth analysis, and the latest updates from Kenya and around the world.
            </p>
            <div className="flex space-x-4">
              <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href={socialMedia.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Kenya</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">World</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Politics</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Business</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Technology</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Sports</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Entertainment</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Advertise</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-gray-400 mr-2 mt-1" />
                <span className="text-gray-400">123 Kenyatta Avenue, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-gray-400 mr-2" />
                <span className="text-gray-400">+254 798 051 159</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-gray-400 mr-2" />
                <span className="text-gray-400">info@wtv.co.ke</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Subscribe to Newsletter</h4>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 bg-gray-700 text-white rounded-l-md focus:outline-none flex-grow"
                />
                <button 
                  type="submit" 
                  className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} WTV.CO.KE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;