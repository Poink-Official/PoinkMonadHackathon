import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DynamicEmbed() {
  const router = useRouter();
  const { url } = router.query;
  const [timestamp] = useState(() => Date.now());
  
  // Ensure we have a valid URL for the metadata
  const currentPageUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${router.asPath}`
    : '';

  // Decode the URL if it's encoded
  const decodedUrl = url ? decodeURIComponent(url) : '';

  // If no URL is provided, show an error message
  if (!url && typeof window !== 'undefined') {
    return (
      <div className="min-h-screen w-full p-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">Error</h1>
          <p>Please provide a URL parameter</p>
          <p className="text-sm text-gray-500">Example: /embed?url=https://example.com</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Embedded Content</title>

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content="Embedded Content" />
        <meta name="twitter:description" content="Interactive embedded content" />
        <meta name="twitter:player" content={`${currentPageUrl}&_=${timestamp}`} />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta name="twitter:image" content="https://pbs.twimg.com/profile_images/1846897640677822470/8g6-quYE_400x400.jpg" />

        <script src="https://cdn.tailwindcss.com" />
      </head>

      <div className="min-h-screen w-full p-2 sm:p-4">
        <div className="w-full h-[calc(100vh-16px)] sm:h-screen rounded-lg overflow-hidden shadow-lg border border-gray-200">
          {decodedUrl && (
            <iframe
              src={decodedUrl}
              className="w-full h-full"
              title="Embedded Content"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              loading="lazy"
            />
          )}
        </div>
      </div>

      <style jsx global>{`
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        @layer base {
          :root {
            --background: 0 0% 100%;
            --foreground: 222.2 84% 4.9%;
          }
          .dark {
            --background: 222.2 84% 4.9%;
            --foreground: 210 40% 98%;
          }
        }

        @layer base {
          * {
            @apply border-border;
          }
          body {
            @apply bg-background text-foreground;
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
    </>
  );
} 