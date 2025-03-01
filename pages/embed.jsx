import Head from 'next/head';
import Image from 'next/image';

export default function DynamicEmbed({ url }) {
  const timestamp = Date.now();
  
  return (
    <div className="player-container">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Embedded Content</title>

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content="Embedded Content" />
        <meta name="twitter:description" content="Interactive embedded content" />
        <meta 
          name="twitter:player" 
          content={`https://poink-main.vercel.app/embed?url=${encodeURIComponent(url)}&t=${timestamp}`}
        />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta name="twitter:image" content="https://pbs.twimg.com/profile_images/1846897640677822470/8g6-quYE_400x400.jpg" />

        <script src="https://cdn.tailwindcss.com" />
      </Head>

      <div className="min-h-screen w-full p-2 sm:p-4">
        <div className="relative w-full h-[calc(100vh-16px)] sm:h-screen rounded-lg overflow-hidden shadow-lg border border-gray-200">
          <iframe
            src={url}
            className="w-full h-full"
            title="Embedded Content"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            loading="lazy"
          />
          <div className="absolute top-4 right-4 z-50 opacity-80 hover:opacity-100 transition-opacity">
            <Image
              src="/logodark.png"
              alt="Poink"
              width={40}
              height={40}
              className="rounded-full shadow-lg"
            />
          </div>
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
    </div>
  );
}

export async function getServerSideProps({ query }) {
  // If no URL is provided, redirect to an error page or home
  if (!query.url) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // Decode the URL if it's encoded
  const url = decodeURIComponent(query.url);
  
  return {
    props: {
      url,
    }
  };
} 