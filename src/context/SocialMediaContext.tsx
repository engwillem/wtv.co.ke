import React, { createContext, useContext, useState, useEffect } from 'react';

interface SocialMedia {
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  linkedIn: string;
}

interface SocialMediaContextType {
  socialMedia: SocialMedia;
  updateSocialMedia: (updates: Partial<SocialMedia>) => void;
}

const defaultSocialMedia: SocialMedia = {
  facebook: 'https://facebook.com/wtv.co.ke',
  twitter: 'https://twitter.com/wtv_ke',
  instagram: 'https://instagram.com/wtv.co.ke',
  youtube: 'https://youtube.com/wtvkenya',
  linkedIn: 'https://linkedin.com/company/wtv-kenya'
};

const SocialMediaContext = createContext<SocialMediaContextType | undefined>(undefined);

export const SocialMediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socialMedia, setSocialMedia] = useState<SocialMedia>(defaultSocialMedia);

  useEffect(() => {
    const saved = localStorage.getItem('wtvSocialMedia');
    if (saved) {
      setSocialMedia(JSON.parse(saved));
    }
  }, []);

  const updateSocialMedia = (updates: Partial<SocialMedia>) => {
    const updated = { ...socialMedia, ...updates };
    setSocialMedia(updated);
    localStorage.setItem('wtvSocialMedia', JSON.stringify(updated));
  };

  return (
    <SocialMediaContext.Provider value={{ socialMedia, updateSocialMedia }}>
      {children}
    </SocialMediaContext.Provider>
  );
};

export const useSocialMedia = () => {
  const context = useContext(SocialMediaContext);
  if (context === undefined) {
    throw new Error('useSocialMedia must be used within a SocialMediaProvider');
  }
  return context;
};