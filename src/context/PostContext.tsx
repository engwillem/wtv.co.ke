import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

// Define types
export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  image: string;
  author: {
    id: string;
    name: string;
  };
  publishedDate: string;
  views: number;
  featured?: boolean;
  breaking?: boolean;
}

interface PostContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'publishedDate' | 'views'>) => Post;
  getPost: (id: string) => Post | undefined;
  incrementViews: (id: string) => void;
  deletePost: (id: string) => void;
  updatePost: (id: string, post: Partial<Post>) => Post | undefined;
}

// Create context
const PostContext = createContext<PostContextType | undefined>(undefined);

// Sample posts
const samplePosts: Post[] = [
  {
    id: '1',
    title: "Kenya's Economy Shows Strong Growth in First Quarter of 2025",
    content: "<p>Kenya's economy has shown remarkable resilience and growth in the first quarter of 2025, according to the latest economic indicators released by the Treasury. The growth rate of 6.8% has exceeded expectations, making it one of the strongest performing economies in East Africa.</p><p>Experts attribute this unexpected economic surge to increased foreign investments, particularly in technology and infrastructure sectors, as well as successful government policies aimed at stimulating local production and exports.</p><p>The Cabinet Secretary for Treasury, in a press briefing held yesterday, highlighted that the manufacturing sector has been a key driver of this growth, with an increase of 8.2% compared to the same period last year. The agricultural sector, despite facing challenges from climate change, has also shown improvement due to better rainfall patterns and adoption of modern farming techniques.</p><p>International financial institutions have responded positively to these developments, with the World Bank revising its annual growth forecast for Kenya from 5.2% to 6.5%. This has led to increased investor confidence, reflected in the strengthening of the Kenyan shilling against major currencies.</p><p>However, economists warn that sustaining this growth will require addressing persistent challenges such as public debt management, corruption, and income inequality. The government has promised to implement further reforms to address these issues and maintain the positive economic trajectory.</p>",
    excerpt: "Experts attribute the unexpected economic surge to increased foreign investments and successful government policies.",
    category: "Business",
    image: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    author: {
      id: '1',
      name: 'John Kamau'
    },
    publishedDate: "2025-05-15",
    views: 1245,
    featured: true
  },
  {
    id: '2',
    title: "New Tech Hub Opens in Nairobi, Creating Thousands of Jobs",
    content: "<p>A state-of-the-art technology hub has opened its doors in Nairobi's Silicon Savannah, promising to create over 5,000 direct jobs and transform Kenya's digital economy landscape. The hub, named 'Savannah Innovation Center', is a $50 million investment by a consortium of local and international tech companies.</p><p>The facility features modern co-working spaces, research laboratories, training centers, and incubation programs for startups. It aims to position Nairobi as Africa's leading technology innovation center and attract global tech companies looking to establish a presence in the continent.</p><p>Speaking at the launch event, the Cabinet Secretary for ICT emphasized the government's commitment to supporting the growth of the technology sector through favorable policies and infrastructure development. 'This hub represents our vision for a digitally empowered Kenya where innovation drives economic growth and creates opportunities for our youth,' he stated.</p><p>Several international tech companies have already signed agreements to establish offices at the hub, with plans to hire local talent for various roles in software development, artificial intelligence, data science, and digital marketing.</p><p>The hub also includes a dedicated training academy that will offer specialized courses in emerging technologies, addressing the skills gap in the local job market. The first cohort of 500 students is expected to begin their training next month, with scholarships available for underprivileged but talented youth.</p>",
    excerpt: "The innovation center is expected to attract international tech companies and boost local startups.",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    author: {
      id: '1',
      name: 'David Mwangi'
    },
    publishedDate: "2025-05-14",
    views: 876
  },
  {
    id: '3',
    title: "Parliament Passes Controversial Tax Bill Amid Protests",
    content: "<p>Kenya's Parliament has passed a controversial tax bill that introduces new levies on essential goods and services, despite widespread protests across major cities. The Finance Bill 2025, which was approved by a narrow margin, aims to increase government revenue to fund ambitious development projects and reduce the budget deficit.</p><p>The bill introduces a 16% value-added tax on bread, cooking oil, and internet services, which were previously exempt or taxed at lower rates. It also increases excise duty on mobile money transfers and bank transactions, a move that critics argue will disproportionately affect low-income earners who rely on these services.</p><p>Opposition leaders have condemned the bill, calling it 'insensitive' to the economic hardships faced by ordinary Kenyans. Civil society organizations have announced plans to challenge the constitutionality of the bill in court, arguing that there was inadequate public participation in its formulation.</p><p>The government has defended the tax measures as necessary for economic stability and funding essential public services. The Treasury Cabinet Secretary stated that the additional revenue would be directed towards healthcare, education, and infrastructure development, which would ultimately benefit all Kenyans.</p><p>Economic analysts have expressed mixed reactions, with some warning that the new taxes could lead to inflation and reduced consumer spending, potentially slowing down economic growth. Others argue that expanding the tax base is essential for reducing the country's dependence on external borrowing.</p>",
    excerpt: "The bill introduces new taxes on essential goods and services, sparking nationwide protests.",
    category: "Politics",
    image: "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    author: {
      id: '1',
      name: 'Sarah Odhiambo'
    },
    publishedDate: "2025-05-15",
    views: 1532,
    breaking: true
  }
];

// Provider component
export const PostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Load posts from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('wtvPosts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(samplePosts);
      localStorage.setItem('wtvPosts', JSON.stringify(samplePosts));
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wtvPosts', JSON.stringify(posts));
  }, [posts]);

  // Add a new post
  const addPost = (postData: Omit<Post, 'id' | 'publishedDate' | 'views'>): Post => {
    const newPost: Post = {
      ...postData,
      id: uuidv4(),
      publishedDate: format(new Date(), 'yyyy-MM-dd'),
      views: 0
    };
    
    setPosts(prevPosts => [newPost, ...prevPosts]);
    return newPost;
  };

  // Get a post by ID
  const getPost = (id: string): Post | undefined => {
    return posts.find(post => post.id === id);
  };

  // Increment post views
  const incrementViews = (id: string): void => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === id ? { ...post, views: post.views + 1 } : post
      )
    );
  };

  // Delete a post
  const deletePost = (id: string): void => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
  };

  // Update a post
  const updatePost = (id: string, postData: Partial<Post>): Post | undefined => {
    let updatedPost: Post | undefined;
    
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === id) {
          updatedPost = { ...post, ...postData };
          return updatedPost;
        }
        return post;
      })
    );
    
    return updatedPost;
  };

  return (
    <PostContext.Provider value={{ 
      posts, 
      addPost, 
      getPost, 
      incrementViews, 
      deletePost, 
      updatePost 
    }}>
      {children}
    </PostContext.Provider>
  );
};

// Custom hook to use the post context
export const usePost = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
};