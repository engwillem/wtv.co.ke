import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Image, Save, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePost } from '../../context/PostContext';
import AdminLayout from './AdminLayout';

interface FormData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  featured: boolean;
  breaking: boolean;
}

const CreatePost: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { user } = useAuth();
  const { addPost } = usePost();
  const navigate = useNavigate();
  
  const categories = [
    'Politics',
    'Business',
    'Technology',
    'Sports',
    'Entertainment',
    'Health',
    'Education',
    'Environment',
    'World'
  ];
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    
    try {
      // Create the post
      const newPost = addPost({
        ...data,
        author: {
          id: user?.id || '',
          name: user?.username || 'Anonymous'
        }
      });
      
      setSuccess(`Post "${data.title}" created successfully!`);
      
      // Reset form or redirect
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (err) {
      setError('Failed to create post. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Create New Post</h1>
          <p className="text-gray-600">Create and publish a new article</p>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                {...register('title', { required: 'Title is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter post title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                rows={2}
                {...register('excerpt', { required: 'Excerpt is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Brief summary of the post"
              />
              {errors.excerpt && (
                <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                rows={12}
                {...register('content', { required: 'Content is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Write your post content here..."
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Featured Image URL
              </label>
              <div className="flex">
                <input
                  id="image"
                  type="text"
                  {...register('image', { required: 'Image URL is required' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="https://example.com/image.jpg"
                />
                <button
                  type="button"
                  className="bg-gray-200 px-3 py-2 rounded-r-md border border-gray-300 border-l-0"
                >
                  <Image size={18} />
                </button>
              </div>
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  id="featured"
                  type="checkbox"
                  {...register('featured')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Featured Post
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="breaking"
                  type="checkbox"
                  {...register('breaking')}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="breaking" className="ml-2 block text-sm text-gray-700">
                  Breaking News
                </label>
              </div>
            </div>
            
            <div className="pt-4 border-t mt-6">
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('/admin')}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  <X size={18} className="inline mr-1" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-400"
                >
                  <Save size={18} className="inline mr-1" />
                  {isSubmitting ? 'Publishing...' : 'Publish Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default CreatePost;