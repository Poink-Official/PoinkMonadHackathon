import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import EthGlobal from './index';
import Head from 'next/head';

export default function ChainPage({ chain, timestamp }) {
  const router = useRouter();

  // Add this to handle direct navigation
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{`${chain.charAt(0).toUpperCase() + chain.slice(1)} Apps - ETHGlobal`}</title>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content={`${chain.charAt(0).toUpperCase() + chain.slice(1)} Apps - ETHGlobal`} />
        <meta name="twitter:description" content={`Discover ${chain.charAt(0).toUpperCase() + chain.slice(1)} Web3 Apps`} />
        <meta 
          name="twitter:player" 
          content={`https://app.poink.xyz/ethglobal/${chain}?t=${timestamp}`}
        />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta 
          name="twitter:image" 
          content="https://avatars.githubusercontent.com/u/194240984?s=200&v=4"
        />
      </Head>

      {/* Chain logo/home button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        <Link href="/ethglobal">
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
          >
            <Image
              src={chain === 'arbitrum' ? '/arb.png' : 
                   chain === 'base' ? '/base.png' : '/flow.png'}
              alt={chain}
              fill
              className="object-cover relative z-10"
            />
          </motion.div>
        </Link>
      </motion.div>

      <EthGlobal initialChain={chain} timestamp={timestamp} />
    </div>
  );
}

export async function getServerSideProps({ params, res }) {
  const validChains = ['arbitrum', 'base', 'flow'];
  const { chain } = params;

  if (!validChains.includes(chain)) {
    return { redirect: { destination: '/ethglobal', permanent: false } };
  }

  res.setHeader('Cache-Control', 'public, s-maxage=1, stale-while-revalidate=2');

  return {
    props: {
      chain,
      timestamp: Date.now()
    }
  };
} 