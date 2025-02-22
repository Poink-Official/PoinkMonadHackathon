import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const chains = {
  monad: {
    name: 'Monad',
    icon: '/monad.png',
    apps: [
      { 
        name: 'Break Monad', 
        icon: '/monad.png', 
        baseUrl: 'https://www.breakmonad.com/',
        description: 'Click to send transactions. Mint an NFT representative of you trying to break devnet.'
      },
      { 
        name: 'PurgeNad', 
        icon: '/purgenad.png', 
        baseUrl: 'https://purgednads.vercel.app/',
        description: 'Interactive game with NFT mint'
      },
      { 
        name: 'NadRunner', 
        icon: '/nadrunner.png', 
        baseUrl: 'https://nadrunner.vercel.app/',
        description: 'Endless runner game'
      },
      { 
        name: 'GMonad', 
        icon: '/monad.png', 
        baseUrl: 'https://gmonad.club/',
        description: 'Clicker game'
      },
      { 
        name: 'Bean Exchange', 
        icon: '/beanexchange.jpg', 
        baseUrl: 'https://swap.bean.exchange/',
        description: 'Gamified on-chain Spot & Perpetual DEX'
      },
      { 
        name: 'Pancake', 
        icon: '/pancake.png', 
        baseUrl: 'https://pancakeswap.finance/?chain=monadTestnet',
        description: 'DEX on Monad'
      },
      { 
        name: 'Encifher', 
        icon: '/encifher.jpg', 
        baseUrl: 'https://monad.encifher.io/',
        description: 'Encrypting soon.'
      },
      { 
        name: 'Nad.fun', 
        icon: '/nadfun.webp', 
        baseUrl: 'https://testnet.nad.fun',
        description: 'Social Memecoin Playground.'
      },
      { 
        name: 'Nostra', 
        icon: '/nostra.webp', 
        baseUrl: 'https://monad.nostra.finance/lend-borrow',
        description: 'Lend, borrow, swap & bridge crypto.'
      },
      { 
        name: 'Monorail', 
        icon: '/monorail.png', 
        baseUrl: 'https://testnet-preview.monorail.xyz/',
        description: 'Trade anything across Monad'
      },
      { 
        name: 'Crystal', 
        icon: '/crystal.png', 
        baseUrl: 'https://app.crystal.exchange/',
        description: 'The worlds first on-chain CEX.'
      },
      { 
        name: 'Get Listed', 
        icon: '/more.png', 
        baseUrl: 'https://tally.so/r/w49zqo',
        description: 'List your app on Poink'
      }
    ]
  },
  ethereum: {
    name: 'Ethereum',
    icon: '/eth.png',
    apps: [
      { 
        name: 'Uniswap', 
        icon: '/uni.png', 
        baseUrl: 'https://app.uniswap.org/#/swap',
        description: 'Decentralized trading protocol',
        params: {
          type: 'query',
          inputParam: 'inputCurrency',
          outputParam: 'outputCurrency',
          defaultInput: 'ETH'
        }
      },
      { 
        name: 'CoW Swap', 
        icon: '/cow.png', 
        baseUrl: 'https://swap.cow.fi',
        description: 'MEV-protected DEX aggregator',
        params: {
          type: 'path',
          format: '/#/1/swap/ETH/{output}'
        }
      }
    ]
  }
};

export async function getServerSideProps({ query, res, params }) {
  const timestamp = Date.now();
  
  // Set cache control headers
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1, stale-while-revalidate=2'
  );

  // Get chain from URL or query
  const chainFromUrl = query.chain || null;
  const validChains = ['monad', 'ethereum', 'solana'];
  const initialChain = validChains.includes(chainFromUrl) ? chainFromUrl : null;

  return {
    props: {
      timestamp,
      initialChain,
    }
  };
}

export default function AppStore({ timestamp, initialChain }) {
  const [selectedChain, setSelectedChain] = useState(initialChain);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [generatedPoink, setGeneratedPoink] = useState(null);
  const [appUrls, setAppUrls] = useState({});
  const [contractAddresses, setContractAddresses] = useState({});
  const [copiedStates, setCopiedStates] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);

  const handleMouseMove = (e) => {
    if (isMobile) return; // Disable on mobile
    const halfWidth = e.currentTarget.offsetWidth / 2;
    x.set(e.nativeEvent.offsetX - halfWidth);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const getAppUrl = (app) => {
    return appUrls[app.name] || app.baseUrl;
  };

  const router = useRouter();

  return (
    <div className="bg-black min-h-screen">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{selectedChain 
          ? `${selectedChain.charAt(0).toUpperCase() + selectedChain.slice(1)} Apps - Poink` 
          : 'Poink App Store'}</title>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content={selectedChain 
          ? `${selectedChain.charAt(0).toUpperCase() + selectedChain.slice(1)} Apps - Poink`
          : 'Poink App Store'} />
        <meta name="twitter:description" content={selectedChain 
          ? `Discover ${selectedChain.charAt(0).toUpperCase() + selectedChain.slice(1)} Web3 Apps`
          : 'Discover Web3 Apps'} />
        <meta 
          name="twitter:player" 
          content={`https://app.poink.xyz${selectedChain ? `/${selectedChain}` : ''}?t=${timestamp}`}
        />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta 
          name="twitter:image" 
          content="https://avatars.githubusercontent.com/u/194240984?s=200&v=4"
        />
      </Head>

      <div className="container mx-auto px-3 sm:px-4 py-6 max-w-md sm:max-w-lg md:max-w-2xl">
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
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto"
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
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              </motion.div>

              {/* Title */}
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                    Poink App Store
                  </span>
                </h1>
                <p className="text-gray-400 text-sm sm:text-base">
                  Discover Web3 applications across multiple blockchains
                </p>
              </div>

              {/* Chain Grid */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(chains).map(([id, chain]) => (
                  <motion.button
                    key={id}
                    variants={itemVariants}
                    onClick={() => {
                      router.push(`/${id}`);
                    }}
                    className="group flex flex-col items-center p-4 rounded-2xl
                             bg-white/5 hover:bg-white/10 transition-all duration-300
                             border border-white/10 hover:border-white/20
                             relative overflow-hidden"
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Add gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                      animate={{ scale: [0.95, 1.05], opacity: [0, 0.1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    <motion.div 
                      className="relative w-16 h-16 mb-3"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={chain.icon}
                        alt={chain.name}
                        fill
                        sizes="(max-width: 640px) 64px, 80px"
                        className="rounded-2xl object-cover shadow-lg"
                      />
                    </motion.div>
                    <span className="text-white font-medium relative z-10">{chain.name}</span>
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
              {/* Back Button - only show when not in chain page */}
              {!initialChain && (
                <motion.button
                  onClick={() => router.push('/')}
                  className="text-white/80 hover:text-white flex items-center gap-2"
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Back</span>
                </motion.button>
              )}

              {/* Chain header */}
              {/* {selectedChain && (
                <div className="flex flex-col items-center mb-4">
                  <div className="relative w-16 h-16 mb-2">
                    <Image
                      src={chains[selectedChain].icon}
                      alt={chains[selectedChain].name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white">
                    {chains[selectedChain].name} App Hub
                  </h1>
                </div>
              )} */}

              {/* Apps Grid - Responsive layout */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 p-4 sm:p-6 bg-[#1A1B1E] rounded-2xl border border-gray-800"
              >
                {chains[selectedChain].apps.map((app, idx) => {
                  return (
                    <div
                      key={app.name}
                      className="relative group"
                      onMouseEnter={() => !isMobile && setHoveredIndex(idx)}
                      onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                      onTouchStart={() => isMobile && setHoveredIndex(hoveredIndex === idx ? null : idx)}
                    >
                      <Link
                        href={`/embed?url=${encodeURIComponent(getAppUrl(app))}&chain=${selectedChain}&t=${timestamp}`}
                        className="group flex flex-col items-center"
                      >
                        <motion.div 
                          className="relative w-14 h-14 sm:w-16 sm:h-16 mb-2 rounded-2xl overflow-hidden bg-[#25262B] border border-gray-800/50 shadow-lg transition-all duration-300 group-hover:border-gray-700"
                          whileHover={{ 
                            y: -5,
                            scale: 1.1,
                            transition: { type: "spring", stiffness: 300 }
                          }}
                          whileTap={{ scale: 0.9 }}
                          onMouseMove={handleMouseMove}
                          variants={itemVariants}
                        >
                          <Image
                            src={app.icon}
                            alt={app.name}
                            fill
                            sizes="(max-width: 640px) 56px, 64px"
                            className="rounded-2xl object-cover relative z-10"
                          />
                        </motion.div>
                        <span className="text-gray-300 text-xs text-center group-hover:text-white font-medium tracking-tight truncate max-w-full px-1">
                          {app.name}
                        </span>
                      </Link>

                      <AnimatePresence>
                        {hoveredIndex === idx && (
                          <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.6 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              scale: 1,
                              transition: {
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                                duration: 0.3
                              },
                            }}
                            exit={{ 
                              opacity: 0, 
                              y: -20, 
                              scale: 0.6,
                              transition: {
                                duration: 0.2,
                                ease: "easeOut"
                              }
                            }}
                            style={isMobile ? {} : {
                              translateX: translateX,
                              rotate: rotate,
                            }}
                            className={`absolute ${isMobile ? 'top-full left-1/2 -translate-x-1/2' : 'top-full left-[40%] -translate-x-1/2'} flex text-xs flex-col 
                                     items-center justify-center rounded-xl bg-black/40 backdrop-blur-md 
                                     z-50 shadow-2xl border border-white/10 p-3 min-w-[180px] max-w-[200px] mt-2
                                     before:absolute before:inset-0 before:rounded-xl 
                                     before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-50`}
                          >
                            {/* Add subtle pulse animation to the tooltip */}
                            <motion.div
                              className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/5 to-sky-500/5"
                              animate={{
                                scale: [1, 1.02, 1],
                                opacity: [0.5, 0.8, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                            
                            <div className="relative z-30 space-y-2 w-full">
                              <div className="text-center space-y-1">
                                <div className="font-medium text-white/90">
                                  {app.name}
                                </div>
                                <div className="text-white/50 text-[10px] break-words">
                                  {app.description}
                                </div>
                              </div>

                              {app.params && (
                                <div className="space-y-2">
                                  <input
                                    type="text"
                                    placeholder="Token Contract Address (0x...)"
                                    value={contractAddresses[app.name] || ''}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-2.5 py-1 text-[10px] text-white/90 focus:outline-none focus:border-white/20 placeholder:text-white/30"
                                    onChange={(e) => {
                                      const ca = e.target.value;
                                      
                                      setContractAddresses(prev => ({
                                        ...prev,
                                        [app.name]: ca
                                      }));

                                      let finalUrl;
                                      
                                      if (app.params.type === 'query') {
                                        finalUrl = `${app.baseUrl}?${app.params.inputParam}=${app.params.defaultInput}&${app.params.outputParam}=${ca}`;
                                      } else if (app.params.type === 'path') {
                                        if (app.name === 'Jupiter') {
                                          finalUrl = app.baseUrl + app.params.format.replace('{output}', ca);
                                        } else {
                                          finalUrl = app.baseUrl + app.params.format.replace('{output}', ca);
                                        }
                                      }

                                      if (finalUrl) {
                                        setAppUrls(prev => ({
                                          ...prev,
                                          [app.name]: finalUrl
                                        }));
                                        
                                        const embedUrl = `https://app.poink.xyz/embed?url=${encodeURIComponent(finalUrl)}&chain=${selectedChain}&t=${timestamp}`;
                                        setGeneratedPoink(embedUrl);
                                      }
                                    }}
                                  />
                                  
                                  <div className="relative group">
                                    <motion.button
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      className="w-full bg-gradient-to-r from-emerald-500/20 to-sky-500/20 hover:from-emerald-500/30 hover:to-sky-500/30 border border-white/10 rounded-lg py-1 px-3 text-[11px] text-white/90 font-medium transition-all shadow-lg shadow-black/20"
                                      onClick={async () => {
                                        if (generatedPoink) {
                                          try {
                                            await navigator.clipboard.writeText(generatedPoink);
                                            // Set copied state for this specific app
                                            setCopiedStates(prev => ({ ...prev, [app.name]: true }));
                                            // Reset after 2 seconds
                                            setTimeout(() => {
                                              setCopiedStates(prev => ({ ...prev, [app.name]: false }));
                                            }, 2000);
                                          } catch (err) {
                                            // Fallback for iframe context
                                            const textarea = document.createElement('textarea');
                                            textarea.value = generatedPoink;
                                            textarea.style.position = 'fixed';
                                            document.body.appendChild(textarea);
                                            textarea.focus();
                                            textarea.select();
                                            try {
                                              document.execCommand('copy');
                                              textarea.remove();
                                              // Set copied state for this specific app
                                              setCopiedStates(prev => ({ ...prev, [app.name]: true }));
                                              // Reset after 2 seconds
                                              setTimeout(() => {
                                                setCopiedStates(prev => ({ ...prev, [app.name]: false }));
                                              }, 2000);
                                            } catch (err) {
                                              console.error('Failed to copy:', err);
                                            }
                                          }
                                        }
                                      }}
                                    >
                                      {!generatedPoink ? 'Poink' : copiedStates[app.name] ? 'Copied!' : 'Copy'}
                                    </motion.button>
                                    
                                    {generatedPoink && (
                                      <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute -right-1 -top-1 w-2 h-2 rounded-full 
                                                 bg-gradient-to-r from-emerald-500 to-sky-500"
                                      />
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Home button for chain pages */}
      {/* {initialChain && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <Link href="/">
            <motion.div
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden 
                       border-2 border-white/10 hover:border-white/20 
                       transition-all duration-300 shadow-lg backdrop-blur-sm
                       bg-black/20"
              whileHover={{ 
                scale: 1.2,
                rotate: [0, -10, 10, -10, 0],
                transition: {
                  rotate: {
                    duration: 0.5,
                    ease: "easeInOut"
                  }
                }
              }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-sky-500/20"
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, rgba(16, 185, 129, 0.2) 0%, rgba(14, 165, 233, 0.2) 100%)",
                    "radial-gradient(circle at 100% 100%, rgba(16, 185, 129, 0.2) 0%, rgba(14, 165, 233, 0.2) 100%)"
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <Image
                src="/logodark.png"
                alt="Poink"
                fill
                sizes="(max-width: 640px) 48px, 56px"
                className="object-cover relative z-10"
              />
            </motion.div>
          </Link>
        </motion.div>
      )} */}

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