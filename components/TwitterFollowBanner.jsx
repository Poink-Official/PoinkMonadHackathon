import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { event } from '@/lib/analytics';

export default function TwitterFollowBanner() {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const bannerDismissed = localStorage.getItem('twitterBannerDismissed');
    if (bannerDismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('twitterBannerDismissed', 'true');
    
    event({
      action: 'dismiss_twitter_banner',
      category: 'UI Interaction',
      label: 'Banner'
    });
  };
  
  const handleFollowClick = () => {
    event({
      action: 'click_twitter_follow',
      category: 'Social Media',
      label: 'Twitter Follow'
    });
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full bg-[#1A1B25] text-white py-2 px-4 flex items-center relative"
    >
      <div className="flex flex-row items-center gap-3 w-full">
        <span className="bg-[#5B58FB] text-white px-3 py-1 rounded-full text-sm font-medium flex-shrink-0">
          News
        </span>
        <p className="text-white text-sm flex-grow pr-2">
          Poink NFT will be Live this week! Follow Poink on X to stay updated! 🎁
        </p>
        <div className="flex-shrink-0">
          <Link 
            href="https://twitter.com/poinkofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#3B99FF] hover:bg-[#3B99FF]/90 px-4 py-1.5 rounded-full text-white text-sm font-medium transition-colors duration-200"
            onClick={handleFollowClick}
          >
            Follow us
          </Link>
        </div>
        <button 
          onClick={handleDismiss}
          className="text-white/70 hover:text-white p-1 ml-2 flex-shrink-0"
          aria-label="Close notification"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}