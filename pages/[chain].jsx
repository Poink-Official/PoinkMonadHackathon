import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import AppStore from './index';
import Head from 'next/head';

export default function ChainPage({ chain, timestamp }) {
  const router = useRouter();

  return (
    <div className="relative">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{`${chain.charAt(0).toUpperCase() + chain.slice(1)} Apps - Poink`}</title>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content={`${chain.charAt(0).toUpperCase() + chain.slice(1)} Apps - Poink`} />
        <meta name="twitter:description" content={`Discover ${chain.charAt(0).toUpperCase() + chain.slice(1)} Web3 Apps`} />
        <meta 
          name="twitter:player" 
          content={`https://poink-main.vercel.app/${chain}?t=${timestamp}`}
        />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta 
          name="twitter:image" 
          content="https://avatars.githubusercontent.com/u/194240984?s=200&v=4"
        />
      </Head>

      {/* Chain logo/home button - moved to bottom center */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        <Link href="/">
          <motion.div
            className="relative w-14 h-14 rounded-full overflow-hidden 
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
            drag
            dragConstraints={{
              top: -50,
              left: -50,
              right: 50,
              bottom: 50,
            }}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
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
              src={chain === 'monad' ? '/monad.png' : 
                   chain === 'ethereum' ? '/eth.png' : '/sol.png'}
              alt={chain}
              fill
              className="object-cover relative z-10"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
              animate={{
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        </Link>
      </motion.div>

      <AppStore initialChain={chain} timestamp={timestamp} />

      <motion.button
        onClick={() => router.push('/')}
        className="text-white/80 hover:text-white flex items-center gap-2 absolute top-4 left-4"
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {/* <span>Back</span> */}
      </motion.button>
    </div>
  );
}

export async function getServerSideProps({ params, res }) {
  const validChains = ['monad', 'ethereum', 'solana'];
  const { chain } = params;

  if (!validChains.includes(chain)) {
    return { redirect: { destination: '/', permanent: false } };
  }

  res.setHeader('Cache-Control', 'public, s-maxage=1, stale-while-revalidate=2');

  return {
    props: {
      chain,
      timestamp: Date.now()
    }
  };
} 