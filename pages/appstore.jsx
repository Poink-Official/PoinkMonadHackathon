import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const chains = {
  ethereum: {
    name: 'Ethereum',
    icon: '/eth.png',
    apps: [
      { name: 'Uniswap', icon: '/uni.png', url: 'https://app.uniswap.org/' },
      { name: 'CoW Swap', icon: '/cow.png', url: 'https://swap.cow.fi/' }
    ]
  },
  solana: {
    name: 'Solana',
    icon: '/sol.png',
    apps: [
      { name: 'Jupiter', icon: '/jup.png', url: 'https://jup.ag/swap' },
      { name: 'Raydium', icon: '/ray.png', url: 'https://raydium.io/swap/' }
    ]
  }
};

const MotionImage = motion(Image);

export default function AppStore() {
  const [selectedChain, setSelectedChain] = useState(null);
  const timestamp = Date.now();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-black min-h-screen">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Poink App Store</title>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content="Poink App Store" />
        <meta name="twitter:description" content="Discover Web3 Apps" />
        <meta name="twitter:player" content={`https://poink-main.vercel.app/appstore?t=${timestamp}`} />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta name="twitter:image" content="https://pbs.twimg.com/profile_images/1846897640677822470/8g6-quYE_400x400.jpg" />
      </Head>

      <div className="container mx-auto px-4 py-6 max-w-md">
        <AnimatePresence mode="wait">
          {!selectedChain ? (
            // Chain Selection Screen
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Logo */}
              <motion.div 
                className="w-16 h-16 mx-auto"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/logodark.png"
                  alt="Poink"
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </motion.div>

              {/* Chain Grid */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(chains).map(([id, chain]) => (
                  <motion.button
                    key={id}
                    variants={itemVariants}
                    onClick={() => setSelectedChain(id)}
                    className="group flex flex-col items-center p-4 rounded-2xl
                             bg-white/5 hover:bg-white/10 transition-all duration-300"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div 
                      className="relative w-16 h-16 mb-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={chain.icon}
                        alt={chain.name}
                        fill
                        className="rounded-2xl object-cover"
                      />
                    </motion.div>
                    <span className="text-white font-medium">{chain.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            // Apps Screen
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Back Button */}
              <motion.button
                onClick={() => setSelectedChain(null)}
                className="text-white/80 hover:text-white flex items-center gap-2"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back</span>
              </motion.button>

              {/* Apps Grid */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-3 gap-4"
              >
                {chains[selectedChain].apps.map((app, index) => (
                  <motion.a
                    key={app.name}
                    variants={itemVariants}
                    href={`/embed?url=${encodeURIComponent(app.url)}`}
                    className="group flex flex-col items-center"
                  >
                    <motion.div 
                      className="relative w-16 h-16 mb-2"
                      whileHover={{ 
                        y: -5,
                        scale: 1.1,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Image
                        src={app.icon}
                        alt={app.name}
                        fill
                        className="rounded-2xl object-cover shadow-lg
                                 group-hover:shadow-white/20 transition-all duration-300"
                      />
                    </motion.div>
                    <span className="text-white/80 text-sm text-center group-hover:text-white">
                      {app.name}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          background: black;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </div>
  );
} 