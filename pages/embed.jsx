import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DynamicEmbed({ url, back, timestamp }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDropped, setIsDropped] = useState(false);
  const logoRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!logoRef.current || isDropped) return;

      const logo = logoRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculate distance between mouse and logo
      const distance = Math.sqrt(
        Math.pow(mouseX - (logo.x + logo.width/2), 2) +
        Math.pow(mouseY - (logo.y + logo.height/2), 2)
      );

      // If mouse is within 100px of logo
      if (distance < 100) {
        // If mouse is very close, trigger drop animation
        if (distance < 50) {
          setIsDropped(true);
          setTimeout(() => setIsDropped(false), 1000);
          return;
        }

        // Calculate new position to move away from mouse
        const angle = Math.atan2(
          mouseY - (logo.y + logo.height/2),
          mouseX - (logo.x + logo.width/2)
        );

        const newX = Math.max(0, Math.min(window.innerWidth - logo.width,
          logo.x + Math.cos(angle + Math.PI) * 5
        ));
        const newY = Math.max(0, Math.min(100,
          logo.y + Math.sin(angle + Math.PI) * 5
        ));

        setPosition({ x: newX, y: newY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDropped]);

  return (
    <div className="player-container">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Poink</title>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content="Poink" />
        <meta name="twitter:description" content="Discover Web3 Apps" />
        <meta name="twitter:player" content={`https://app.poink.xyz/embed?url=${encodeURIComponent(url)}&t=${timestamp}`} />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta 
          name="twitter:image" 
          content="https://avatars.githubusercontent.com/u/194240984?s=200&v=4"
        />
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
          
          {/* Back Button */}
          {back && (
            <Link href={back}>
              <motion.div
                className="absolute bottom-4 left-4 z-50 bg-black/50 backdrop-blur-sm 
                          rounded-full p-2 cursor-pointer hover:bg-black/70"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.div>
            </Link>
          )}

          {/* Floating Logo */}
          <div 
            ref={logoRef}
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              transition: 'transform 0.3s ease-out',
            }}
            className={`absolute top-4 right-4 z-50 ${
              isDropped ? 'animate-drop' : ''
            } opacity-80 hover:opacity-100`}
          >
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

        @keyframes dropAndBounce {
          0% { transform: translateY(0); }
          70% { transform: translateY(calc(100vh - 80px)); }
          85% { transform: translateY(calc(100vh - 120px)); }
          100% { transform: translateY(calc(100vh - 80px)); }
        }

        .animate-drop {
          animation: dropAndBounce 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

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

export async function getServerSideProps({ query, res }) {
  if (!query.url) {
    return { redirect: { destination: '/', permanent: false } };
  }

  res.setHeader('Cache-Control', 'public, s-maxage=1, stale-while-revalidate=2');

  const url = decodeURIComponent(query.url);
  const chain = query.chain || null;
  
  // Handle ethglobal chains differently
  const ethGlobalChains = ['arbitrum', 'base', 'flow'];
  const back = chain 
    ? ethGlobalChains.includes(chain)
      ? `/ethglobal/${chain}?t=${Date.now()}`
      : `/${chain}?t=${Date.now()}`
    : `/?t=${Date.now()}`;
  
  return {
    props: { url, back, timestamp: Date.now() }
  };
} 