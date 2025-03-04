import "@/styles/globals.css"; 
import { useRouter } from 'next/router'; 
import { useEffect } from 'react'; 
import { pageview } from '@/lib/analytics'; 
import { GoogleAnalytics } from '@next/third-parties/google'; 
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import { Analytics } from '@vercel/analytics/react';
import TwitterFollowBanner from '../components/TwitterFollowBanner';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    // Debug log to verify initialization
    console.log('Analytics initialized with ID:', GA_MEASUREMENT_ID);
    
    // Track initial page load
    if (typeof window !== 'undefined') {
      console.log('Initial page view tracked:', window.location.pathname + window.location.search);
      pageview(window.location.pathname + window.location.search);
    }
    
    // Track page views when the route changes
    const handleRouteChange = (url) => {
      console.log('Page view tracked on route change:', url);
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  
  // Debug log for window.gtag availability
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        console.log('gtag available:', typeof window.gtag === 'function');
        
        // Test event
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'debug_init', {
            'event_category': 'debugging',
            'event_label': 'App Initialization'
          });
          console.log('Test event sent to GA');
        }
      }, 2000); // Check after 2 seconds to allow for script loading
    }
  }, []);
  
  return (
    <>
          <TwitterFollowBanner />
      <Component {...pageProps} />
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      <Analytics />
    </>
  );
}