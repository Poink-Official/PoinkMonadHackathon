import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const chains = {
  monad: {
    name: 'Monad',
    icon: '/monad.png',
    apps: [
      { 
        name: 'NadFun', 
        icon: '/nadfunlogo.svg', 
        baseUrl: 'https://devnet.nad.fun/',
        description: 'pumpfun on monad'
      },
      { 
        name: 'Break Monad', 
        icon: '/monad.png', 
        baseUrl: 'https://devnet.nad.fun/',
        description: 'Click to send transactions. Mint an NFT representative of you trying to break devnet.'
      },
      { 
        name: 'PurgeNad', 
        icon: '/purgenad.png', 
        baseUrl: 'https://purgednads.vercel.app/',
        description: 'interactive game with NFT mint'
      },
      { 
        name: 'NadRunner', 
        icon: '/monad.png', 
        baseUrl: 'https://nadrunner.vercel.app/',
        description: 'Endless runner game'
      },
      { 
        name: 'YapMonad', 
        icon: '/monad.png', 
        baseUrl: 'https://yapmonad.xyz/',
        description: 'yapping game with a twist'
      },
      { 
        name: 'GMonad', 
        icon: '/monad.png', 
        baseUrl: 'https://gmonad.club/',
        description: 'clicker game'
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
  },
  solana: {
    name: 'Solana',
    icon: '/sol.png',
    apps: [
      { 
        name: 'Jupiter', 
        icon: '/jup.png', 
        baseUrl: 'https://jup.ag/swap',
        description: 'Best swap aggregator on Solana',
        params: {
          type: 'path',
          format: '/SOL-{output}',
          defaultInput: 'SOL'
        }
      },
      { 
        name: 'Raydium', 
        icon: '/ray.png', 
        baseUrl: 'https://raydium.io/swap',
        description: 'AMM and liquidity provider',
        params: {
          type: 'query',
          inputParam: 'inputMint',
          outputParam: 'outputMint',
          defaultInput: 'sol'
        }
      }
    ]
  }
};

export async function getServerSideProps({ query }) {
  const timestamp = Date.now();
  
  return {
    props: {
      timestamp,
      initialChain: query.chain || null,
      // Pass any query params that might be needed for deep linking
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

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig);

  const handleMouseMove = (e) => {
    const halfWidth = e.currentTarget.offsetWidth / 2;
    x.set(e.nativeEvent.offsetX - halfWidth);
  };

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

  const getAppUrl = (app) => {
    return appUrls[app.name] || app.baseUrl;
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
        <meta name="twitter:image" content="/logodark.png" />
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
                {chains[selectedChain].apps.map((app, idx) => {
                  return (
                    <div
                      key={app.name}
                      className="relative group"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <Link
                        href={`/embed?url=${encodeURIComponent(getAppUrl(app))}&back=${encodeURIComponent(`/appstore?t=${timestamp}`)}`}
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
                          onMouseMove={handleMouseMove}
                        >
                          <Image
                            src={app.icon}
                            alt={app.name}
                            fill
                            className="rounded-2xl object-cover shadow-lg
                                     group-hover:shadow-white/20 transition-all duration-300"
                          />
                        </motion.div>
                        <span className="text-white/80 text-xs text-center group-hover:text-white">
                          {app.name}
                        </span>
                      </Link>

                      <AnimatePresence mode="popLayout">
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
                            style={{
                              translateX: translateX,
                              rotate: rotate,
                              whiteSpace: "nowrap",
                            }}
                            className="absolute top-full left-[40%] -translate-x-1/2 flex text-xs flex-col 
                                     items-center justify-center rounded-xl bg-black/30 backdrop-blur-md 
                                     z-50 shadow-2xl border border-white/5 p-3 min-w-[180px] mt-2
                                     before:absolute before:inset-0 before:rounded-xl 
                                     before:bg-gradient-to-b before:from-white/5 before:to-transparent before:opacity-50"
                          >
                            <div className="relative z-30 space-y-2 w-full">
                              <div className="text-center space-y-1">
                                <div className="font-medium text-white/90">
                                  {app.name}
                                </div>
                                <div className="text-white/50 text-[10px]">
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
                                        
                                        const embedUrl = `https://poink-main.vercel.app/embed?url=${encodeURIComponent(finalUrl)}&back=${encodeURIComponent(`/appstore?t=${timestamp}`)}`;
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