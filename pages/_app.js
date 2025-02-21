import "@/styles/globals.css";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { pageview } from '@/lib/analytics';
import { GoogleAnalytics } from '@next/third-parties/google';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Track page views when the route changes
    const handleRouteChange = (url) => {
      pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </>
  );
}