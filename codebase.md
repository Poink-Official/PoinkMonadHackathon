# .gitignore

```
node_modules
/out

.env
.env.production
concatenated-output.ts
embedding-cache.json
packages/plugin-buttplug/intiface-engine

.DS_Store

dist/
# Allow models directory but ignore model files
models/*.gguf

cookies.json

db.sqlite
searches/
tweets/
pages/testrandom.jsx
pages/testtime.jsx
pages/scrolltest.jsx
pages/scrolltest2.jsx

pages/testsamedomain.jsx
pages/testsame.jsx

pages/options.jsx

*.gguf
*.onnx
*.wav
*.mp3

logs/

test-report.json
content_cache/
test_data/
tokencache/
tweetcache/
twitter_cookies.json
timeline_cache.json

*.sqlite

characters/

packages/core/src/providers/cache
packages/core/src/providers/cache/*
cache/*
packages/plugin-coinbase/src/plugins/transactions.csv
packages/plugin-coinbase/package-lock.json

tsup.config.bundled_*.mjs
.next
.turbo
.vercel

```

# components/appstore/AppGrid.jsx

```jsx
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function AppGrid({ chain, apps, containerVariants, itemVariants, timestamp }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 gap-4"
    >
      {apps.map((app, idx) => (
        <Link 
          key={app.name}
          href={`/embed?url=${encodeURIComponent(app.url)}&back=${encodeURIComponent(`/appstore?t=${timestamp}`)}`}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            className="relative w-16 h-16 mx-auto"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src={app.icon}
              alt={app.name}
              fill
              className="rounded-2xl object-cover shadow-lg group-hover:scale-105 
                       group-hover:z-30 transition duration-500"
            />
          </motion.div>
          <span className="block text-white/80 text-xs text-center mt-2 group-hover:text-white">
            {app.name}
          </span>

          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col 
                         items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
              >
                <div className="font-bold text-white relative z-30 text-base">
                  {app.name}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      ))}
    </motion.div>
  );
} 
```

# components/appstore/AppTooltip.jsx

```jsx
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AppTooltip({ app }) {
  const [tokenAddress, setTokenAddress] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const generateUrl = () => {
    const finalUrl = app.config.parameterConfig.type === 'query'
      ? `${app.config.baseUrl}?${app.config.parameterConfig.inputParam}=${app.config.parameterConfig.defaultInput}&${app.config.parameterConfig.outputParam}=${tokenAddress}`
      : app.config.parameterConfig.format
          .replace('{chainId}', app.config.parameterConfig.chainId)
          .replace('{input}', app.config.parameterConfig.defaultInput)
          .replace('{output}', tokenAddress);

    setGeneratedLink(`https://poink-main.vercel.app/embed?url=${encodeURIComponent(finalUrl)}`);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 
                   text-white text-xs focus:outline-none focus:border-white/20"
          placeholder="Token Address (0x...)"
        />
        <motion.button
          onClick={generateUrl}
          disabled={!tokenAddress}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/10 
                   hover:bg-white/20 text-white text-xs px-2 py-0.5 rounded-md
                   disabled:opacity-50"
        >
          Poink
        </motion.button>
      </div>

      {generatedLink && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/80 text-xs bg-white/5 rounded-lg p-2"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="truncate flex-1">{generatedLink}</span>
            <motion.button
              onClick={() => navigator.clipboard.writeText(generatedLink)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white/60 hover:text-white"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
} 
```

# components/appstore/ChainGrid.jsx

```jsx
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ChainGrid({ chains, onSelectChain, containerVariants, itemVariants }) {
  return (
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
            onClick={() => onSelectChain(id)}
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
  );
} 
```

# components/DexLinkGenerator.jsx

```jsx
import { useState } from 'react';

export default function DexLinkGenerator({ 
  title, 
  description, 
  baseUrl,
  inputParam = 'inputCurrency',
  outputParam = 'outputCurrency',
  nativeToken,
  isSymbolBased = false,
  isSolana = false,
  additionalParams = '',
  separator,
  isStatic = false,
  routePath
}) {
  const [outputToken, setOutputToken] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const generateLink = () => {
    setIsGenerating(true);
    const timestamp = Date.now();
    
    let dexUrl;
    if (isStatic) {
      dexUrl = `${baseUrl}${routePath || ''}`;
    } else if (isSolana) {
      if (separator) {
        dexUrl = `${baseUrl}/${inputParam}${separator}${outputToken}`;
      } else {
        dexUrl = `${baseUrl}/?${inputParam}=${nativeToken}&${outputParam}=${outputToken}`;
      }
    } else {
      dexUrl = `${baseUrl}?${inputParam}=${nativeToken}&${outputParam}=${outputToken}${additionalParams}`;
    }

    const displayUrl = `https://poinky.vercel.app/dapp/nav1?url=${dexUrl}&t=${timestamp}`;
    const encodedDexUrl = encodeURIComponent(dexUrl);
    const actualUrl = `https://poinky.vercel.app/dapp/nav1?url=${encodedDexUrl}&t=${timestamp}`;
    
    setTimeout(() => {
      setGeneratedLink({
        display: displayUrl,
        actual: actualUrl
      });
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink.actual);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="space-y-4">
        {!isStatic && (
          <>
            <div className="p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-1">Input Token (Fixed)</p>
              <div className="text-white font-mono break-all">
                {nativeToken}
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm text-gray-400">
                {isSymbolBased ? 'Output Token Symbol' : 'Output Token Address'}
              </label>
              <input
                type="text"
                placeholder={isSymbolBased ? "Enter token symbol (e.g., bcre)" : "Enter token address..."}
                value={outputToken}
                onChange={(e) => setOutputToken(e.target.value)}
                className="w-full p-4 bg-gray-800 rounded-lg text-white font-mono
                         border border-gray-700 focus:border-blue-500 focus:outline-none
                         transition-colors"
              />
              {isSymbolBased && (
                <p className="text-xs text-gray-500 mt-1">
                  Enter the token symbol in lowercase (e.g., bcre, usdc)
                </p>
              )}
            </div>
          </>
        )}
        
        <button
          onClick={generateLink}
          disabled={isGenerating || (!isStatic && !outputToken)}
          className="w-full p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all
                   font-medium"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate poink'
          )}
        </button>
        
        {generatedLink && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Your poink:</p>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 
                           rounded-md text-white transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <a 
                  href={generatedLink.actual}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 
                           rounded-md text-white transition-colors"
                >
                  Open Link
                </a>
              </div>
            </div>
            
            <div className="p-3 bg-gray-900 rounded-md">
              <code className="text-green-400 break-all text-sm">
                {generatedLink.display}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

# components/OneinchLinkGenerator.jsx

```jsx
import { useState } from 'react';

export default function OneinchLinkGenerator({ 
  chainId,
  nativeToken,
  title, 
  description 
}) {
  const [outputToken, setOutputToken] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    setIsGenerating(true);
    const timestamp = Date.now();
    
    // Create the 1inch URL with symbols instead of addresses
    const dexUrl = `https://app.1inch.io/#/${chainId}/simple/swap/${chainId}:${nativeToken}/${chainId}:${outputToken.toUpperCase()}`;
    const displayUrl = `https://poinky.vercel.app/dapp/nav1?url=${dexUrl}&t=${timestamp}`;
    const actualUrl = `https://poinky.vercel.app/dapp/nav1?url=${encodeURIComponent(dexUrl)}&t=${timestamp}`;
    
    setTimeout(() => {
      setGeneratedLink({
        display: displayUrl,
        actual: actualUrl
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Input Token (Fixed)</p>
          <div className="text-white font-mono">
            {nativeToken}
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm text-gray-400">Output Token Symbol</label>
          <input
            type="text"
            placeholder="Enter token symbol (e.g., USDC, USDT)"
            value={outputToken}
            onChange={(e) => setOutputToken(e.target.value)}
            className="w-full p-4 bg-gray-800 rounded-lg text-white font-mono
                     border border-gray-700 focus:border-blue-500 focus:outline-none
                     transition-colors uppercase"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the token symbol (e.g., USDC, USDT, DAI)
          </p>
        </div>
        
        <button
          onClick={generateLink}
          disabled={isGenerating || !outputToken}
          className="w-full p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all
                   font-medium"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Blink'
          )}
        </button>
        
        {generatedLink && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Your Blink:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedLink.actual);
                  }}
                  className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 
                           rounded-md text-white transition-colors"
                >
                  Copy Link
                </button>
                <a 
                  href={generatedLink.actual}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 
                           rounded-md text-white transition-colors"
                >
                  Open Link
                </a>
              </div>
            </div>
            
            <div className="p-3 bg-gray-900 rounded-md">
              <code className="text-green-400 break-all text-sm">
                {generatedLink.display}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
```

# components/SwapLinkGenerator.jsx

```jsx
import { useState } from 'react';

export default function SwapLinkGenerator({ 
  chainId,
  nativeToken,
  title, 
  description 
}) {
  const [outputToken, setOutputToken] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    setIsGenerating(true);
    const timestamp = Date.now();
    
    // Native token address for ETH
    const nativeTokenAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
    
    // Create the ParaSwap URL
    const dexUrl = `https://app.paraswap.xyz/#/swap/${nativeTokenAddress}-${outputToken}/1/SELL?version=6.2&network=base`;
    const displayUrl = `https://poinky.vercel.app/dapp/nav1?url=${dexUrl}&t=${timestamp}`;
    const actualUrl = `https://poinky.vercel.app/dapp/nav1?url=${encodeURIComponent(dexUrl)}&t=${timestamp}`;
    
    setTimeout(() => {
      setGeneratedLink({
        display: displayUrl,
        actual: actualUrl
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Input Token (Fixed)</p>
          <div className="text-white font-mono">
            {nativeToken}
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm text-gray-400">Output Token Address</label>
          <input
            type="text"
            placeholder="Enter token address (e.g., 0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b)"
            value={outputToken}
            onChange={(e) => setOutputToken(e.target.value)}
            className="w-full p-4 bg-gray-800 rounded-lg text-white font-mono
                     border border-gray-700 focus:border-blue-500 focus:outline-none
                     transition-colors"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the token contract address you want to swap to
          </p>
        </div>
        
        <button
          onClick={generateLink}
          disabled={isGenerating || !outputToken}
          className="w-full p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all
                   font-medium"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Blink'
          )}
        </button>
        
        {generatedLink && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Your Blink:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedLink.actual);
                  }}
                  className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 
                           rounded-md text-white transition-colors"
                >
                  Copy Link
                </button>
                <a 
                  href={generatedLink.actual}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 
                           rounded-md text-white transition-colors"
                >
                  Open Link
                </a>
              </div>
            </div>
            
            <div className="p-3 bg-gray-900 rounded-md">
              <code className="text-green-400 break-all text-sm">
                {generatedLink.display}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
```

# jsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}

```

# next.config.mjs

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Original chain routes
        {
          source: '/:chain(monad|ethereum|solana)',
          destination: '/[chain]',
        },
        // ETHGlobal chain routes
        {
          source: '/ethglobal/:chain(arbitrum|base|flow)',
          destination: '/ethglobal',
        },
        // Handle params for both
        {
          source: '/:chain(monad|ethereum|solana)/:params*',
          destination: '/[chain]',
        },
        {
          source: '/ethglobal/:chain(arbitrum|base|flow)/:params*',
          destination: '/ethglobal',
        },
      ],
    }
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; frame-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: http:;"
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
```

# package.json

```json
{
  "name": "unfold2024",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "framer-motion": "^11.16.4",
    "next": "15.0.3",
    "react": "18",
    "react-dom": "18"
  },
  "devDependencies": {
    "postcss": "^8",
    "tailwindcss": "^3.4.1"
  }
}

```

# pages/_app.js

```js
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

```

# pages/_document.js

```js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

```

# pages/[chain].jsx

```jsx
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
          content={`https://app.poink.xyz/${chain}?t=${timestamp}`}
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
```

# pages/api/hello.js

```js
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

```

# pages/appstore.jsx

```jsx
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const chains = {
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

export default function AppStore() {
  const [selectedChain, setSelectedChain] = useState(null);
  const timestamp = Date.now();
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
```

# pages/asteroneo/index.jsx

```jsx
import DexLinkGenerator from '../../components/DexLinkGenerator';

export default function AsteroNeoPage() {
  return (
    <div className="min-h-screen bg-black p-8 space-y-8">
      <DexLinkGenerator
        title="AsteroNeo Swap Link Generator"
        description="Generate a link for AsteroNeo Swap."
        baseUrl="https://app.asteroneo.com"
        routePath="/#/swap"
        isStatic={true}
      />

      <DexLinkGenerator
        title="AsteroNeo Bridge Link Generator"
        description="Generate a link for AsteroNeo Bridge."
        baseUrl="https://app.asteroneo.com"
        routePath="/#/bridge"
        isStatic={true}
      />
    </div>
  );
} 
```

# pages/dapp/nav1.jsx

```jsx
import Head from 'next/head';

export default function TestDapp({ url }) {
  return (
    <div className="player-container">
      <Head>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content="Memelinks Registry" />
        <meta name="twitter:description" content="MemeLinks - twitter Meme Links" />
        <meta name="twitter:player" content={url} />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta name="twitter:image" content="/logodark.png" />
        
        <title>DApp Viewer</title>
      </Head>
      
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .player-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #000;
        }

        iframe {
          width: 100%;
          height: 100%;
          border: none;
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>

      <iframe 
        src={url} 
        allowFullScreen 
        allow="web3"
      />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const url = query.url || 'https://app.naviprotocol.io/market';
  
  return {
    props: {
      url,
    }
  };
}
```

# pages/dapp/navi.jsx

```jsx
import Head from 'next/head';

export default function TestDapp() {
  return (
    <div className="player-container">
      <Head>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content="Memelinks Registry" />
        <meta name="twitter:description" content="MemeLinks - twitter Meme Links" />
        <meta name="twitter:player" content="https://www.starknet-monitor.com/" />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta name="twitter:image" content="/logodark.png" />
        
        <title>Starknet Monitor</title>
      </Head>
      
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .player-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #000;
        }

        iframe {
          width: 100%;
          height: 100%;
          border: none;
          position: absolute;
          top: 0;
          left: 0;
        }sti
      `}</style>

      <iframe 
        src="https://www.starknet-monitor.com/" 
        allowFullScreen 
        allow="web3"
      />
    </div>
  );
}
```

# pages/dapp/navtest.jsx

```jsx
import Head from 'next/head';

export default function TestDapp({ url }) {
  const handleScroll = (direction) => {
    const wrapper = document.getElementById('iframe-wrapper');
    if (wrapper) {
      const currentScroll = wrapper.scrollTop;
      const scrollAmount = direction === 'up' ? -200 : 200;
      wrapper.scrollTo({
        top: currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="player-container">
      <Head>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content="Memelinks Registry" />
        <meta name="twitter:description" content="MemeLinks - twitter Meme Links" />
        <meta name="twitter:player" content={url} />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta name="twitter:image" content="/logodark.png" />
        <title>DApp Viewer</title>
      </Head>

      {/* Responsive scroll buttons */}
      <div className="fixed md:right-4 md:top-1/2 md:-translate-y-1/2 right-2 top-2 z-[9999] flex md:flex-col flex-row gap-2">
        {/* <button 
          onClick={() => handleScroll('up')}
          className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/90 backdrop-blur-sm border border-white/10"
        >
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2.5" 
            className="md:w-4 md:h-4"
          >
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button> */}
        <button 
          onClick={() => handleScroll('down')}
          className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/90 backdrop-blur-sm border border-white/10"
        >
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2.5" 
            className="md:w-4 md:h-4"
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
      </div>

      <div 
        id="iframe-wrapper"
        className="w-full h-full overflow-auto"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <iframe 
          src={url} 
          allowFullScreen 
          allow="web3"
          className="w-full min-h-[150vh] border-0"
        />
      </div>

      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .player-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #000;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const url = query.url || 'https://app.naviprotocol.io/market';
  return {
    props: { url }
  };
}
```

# pages/dapp/one.jsx

```jsx
import Head from 'next/head';

export default function TestDapp() {
  return (
    <div className="player-container">
      <Head>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content="Memelinks Registry" />
        <meta name="twitter:description" content="MemeLinks - twitter Meme Links" />
        <meta name="twitter:player" content="https://www.starknet-monitor.com/" />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta name="twitter:image" content="/logodark.png" />
        
        <title>Starknet Monitor</title>
      </Head>
      
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .player-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #000;
        }

        iframe {
          width: 100%;
          height: 100%;
          border: none;
          position: absolute;
          top: 0;
          left: 0;
        }sti
      `}</style>

      <iframe 
        src="https://www.starknet-monitor.com/" 
        allowFullScreen 
        allow="web3"
      />
    </div>
  );
}
```

# pages/dapp/test.jsx

```jsx
import Head from 'next/head';

export default function TestDapp() {
  return (
    <div className="player-container">
      <Head>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content="Memelinks Registry" />
        <meta name="twitter:description" content="MemeLinks - twitter Meme Links" />
        <meta name="twitter:player" content="https://www.starknet-monitor.com/" />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta name="twitter:image" content="/logodark.png" />
        
        <title>Starknet Monitor</title>
      </Head>
      
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .player-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #000;
        }

        iframe {
          width: 100%;
          height: 100%;
          border: none;
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>

      <iframe 
        src="https://www.starknet-monitor.com/" 
        allowFullScreen 
        allow="web3"
      />
    </div>
  );
} 
```

# pages/dapp/test2.jsx

```jsx
import Head from 'next/head';

export default function TestDapp() {
  return (
    <div className="player-container">
      <Head>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content="Memelinks Registry" />
        <meta name="twitter:description" content="MemeLinks - twitter Meme Links" />
        <meta name="twitter:player" content="https://www.starknet-monitor.com/" />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta name="twitter:image" content="/logodark.png" />
        
        <title>Starknet Monitor</title>
      </Head>
      
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .player-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #000;
        }

        iframe {
          width: 100%;
          height: 100%;
          border: none;
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>

      <iframe 
        src="https://www.starknet-monitor.com/" 
        allowFullScreen 
        allow="web3"
      />
    </div>
  );
} 
```

# pages/embed.jsx

```jsx
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
```

# pages/ethglobal/[chain].jsx

```jsx
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
```

# pages/ethglobal/index.jsx

```jsx
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const chains = {
  arbitrum: {
    name: 'Arbitrum',
    icon: '/arb.png',
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
          format: '/#/42161/swap/WETH/{output}'
        }
      }
    ]
  },
  base: {
    name: 'Base',
    icon: '/base.png',
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
          format: '/#/8453/swap/WETH/{output}'
        }
      }
    ]
  },
  flow: {
    name: 'Flow',
    icon: '/flow.png',
    apps: [
      { 
        name: 'Increment', 
        icon: '/increment.png', 
        baseUrl: 'https://app.increment.fi/swap',
        description: 'Flow DEX',
        params: {
          type: 'query',
          inputParam: 'in',
          outputParam: 'out',
          defaultInput: 'A.1654653399040a61.FlowToken',
          format: '?in={input}&out={output}'
        }
      }
    ]
  }
};

export async function getServerSideProps({ query, res }) {
  const timestamp = Date.now();
  
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1, stale-while-revalidate=2'
  );

  const chainFromUrl = query.chain || null;
  const validChains = ['arbitrum', 'base', 'flow'];
  const initialChain = validChains.includes(chainFromUrl) ? chainFromUrl : null;

  return {
    props: {
      timestamp,
      initialChain,
    }
  };
}

export default function EthGlobal({ timestamp, initialChain, forceShowBack }) {
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

  const router = useRouter();

  useEffect(() => {
    if (initialChain && !selectedChain) {
      setSelectedChain(initialChain);
    }
  }, [initialChain, selectedChain]);

  const handleBack = () => {
    setSelectedChain(null);
    router.push('/ethglobal');
  };

  return (
    <div className="bg-black min-h-screen">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{selectedChain 
          ? `${selectedChain.charAt(0).toUpperCase() + selectedChain.slice(1)} Apps - ETHGlobal` 
          : 'ETHGlobal Apps'}</title>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content={selectedChain 
          ? `${selectedChain.charAt(0).toUpperCase() + selectedChain.slice(1)} Apps - ETHGlobal`
          : 'ETHGlobal Apps'} />
        <meta name="twitter:description" content={selectedChain 
          ? `Discover ${selectedChain.charAt(0).toUpperCase() + selectedChain.slice(1)} Web3 Apps`
          : 'Discover Web3 Apps'} />
        <meta 
          name="twitter:player" 
          content={`https://app.poink.xyz/ethglobal${selectedChain ? `/${selectedChain}` : ''}?t=${timestamp}`}
        />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta 
          name="twitter:image" 
          content="https://avatars.githubusercontent.com/u/194240984?s=200&v=4"
        />
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
              {/* Back Button - Updated logic */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  onClick={handleBack}
                  className="text-white/80 hover:text-white flex items-center gap-2 
                           px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 
                           transition-colors duration-200"
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M15 19l-7-7 7-7" 
                    />
                  </svg>
                  <span className="font-medium"></span>
                </motion.button>
              </motion.div>

              {/* Apps Grid */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-3 gap-4"
              >
                {chains[selectedChain].apps.map((app, idx) => (
                  <div
                    key={app.name}
                    className="relative group"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <Link
                      href={`/embed?url=${encodeURIComponent(getAppUrl(app))}&chain=${selectedChain}&t=${timestamp}`}
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
                          }}
                          className="absolute top-full left-[40%] -translate-x-1/2 flex text-xs flex-col 
                                   items-center justify-center rounded-xl bg-black/30 backdrop-blur-md 
                                   z-50 shadow-2xl border border-white/5 p-3 min-w-[180px] max-w-[200px] mt-2
                                   before:absolute before:inset-0 before:rounded-xl 
                                   before:bg-gradient-to-b before:from-white/5 before:to-transparent before:opacity-50"
                        >
                          {/* Tooltip Content */}
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
                                      finalUrl = `${app.baseUrl}${app.params.format || ''}?${app.params.inputParam}=${app.params.defaultInput}&${app.params.outputParam}=${ca}`;
                                    } else if (app.params.type === 'path') {
                                      finalUrl = app.baseUrl + app.params.format.replace('{output}', ca);
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
                                          setCopiedStates(prev => ({ ...prev, [app.name]: true }));
                                          setTimeout(() => {
                                            setCopiedStates(prev => ({ ...prev, [app.name]: false }));
                                          }, 2000);
                                        } catch (err) {
                                          const textarea = document.createElement('textarea');
                                          textarea.value = generatedPoink;
                                          textarea.style.position = 'fixed';
                                          document.body.appendChild(textarea);
                                          textarea.focus();
                                          textarea.select();
                                          try {
                                            document.execCommand('copy');
                                            textarea.remove();
                                            setCopiedStates(prev => ({ ...prev, [app.name]: true }));
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
```

# pages/flow/index.jsx

```jsx
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';

export default function FlowHome() {
  const router = useRouter();

  const features = [
    {
      id: 'increment',
      name: 'Increment Finance',
      description: 'Generate links for Increment Finance swaps',
      gradient: 'from-[#00EF8B] to-[#2BCD72]',
      icon: '💱'
    },
    {
      id: 'flowbridge',
      name: 'Flow Bridge',
      description: 'Bridge assets to and from Flow',
      gradient: 'from-[#16FF99] to-[#00EF8B]',
      icon: '🌉'
    },
    {
      id: 'flow',
      name: 'Flow Ecosystem',
      description: 'Your gateway to Flow DeFi',
      gradient: 'from-[#00EF8B] to-[#2BCD72]',
      icon: '⚡'
    },
    {
        id: 'flowverse',
        name: 'Flowverse NFTs',
        description: 'Create on-chain Flow Ordinal Inscriptions',
        gradient: 'from-[#16FF99] to-[#00EF8B]',
        icon: '🎨'
      },
  
  ];

  return (
    <div className="min-h-screen bg-[#0F1115] bg-gradient-to-b from-[#0F1115] to-[#1A1B1F]">
      <Head>
        <title>Poinky | Your Flow Link Generator</title>
        <meta name="description" content="Your favorite Flow ecosystem link generator. Generate links for Increment Finance swaps and more." />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20 relative">
          <div className="mb-8 flex justify-center">
            <div className="relative h-32 w-32">
              <Image
                src="/logodark.png"
                alt="Poinky Logo"
                layout="fill"
                objectFit="contain"
                className="animate-bounce"
              />
            </div>
          </div>
          
          {/* Static Flow Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative h-20 w-20">
              <Image
                src="/flowlogo.png"
                alt="Flow Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>
          
          <h1 className="text-7xl font-bold mb-6 animate-pulse">
            <span className="bg-gradient-to-r from-[#00EF8B] to-[#2BCD72] bg-clip-text text-transparent">
              Flow Poinks
            </span>
          </h1>
          
          <p className="text-[#00EF8B] text-2xl font-bold mb-4">
            Your Flow Twitter Link Generator
          </p>
          
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            ready to explore the Flow ecosystem? generate your poinks here! ⚡
          </p>

          {/* CTA Button */}
          <button 
            onClick={() => window.open('https://x.com/poinky42', '_blank')}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-[#00EF8B] to-[#2BCD72] rounded-full text-white font-bold text-xl hover:opacity-90 transform hover:scale-105 transition-all duration-300 animate-pulse"
          >
            Follow on Twitter 🐦
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`
                relative overflow-hidden rounded-2xl p-8
                transform transition-all duration-300 hover:scale-105
                bg-[#1E1F25] border border-[#2D2E36] hover:border-[#00EF8B]
              `}
            >
              <div className="relative z-10">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                  {feature.name}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
              
              {/* Glow Effect */}
              <div className={`absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 bg-gradient-to-r ${feature.gradient} opacity-20 rounded-full blur-2xl`} />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 gap-8 text-center">
          <div className="bg-[#1E1F25] rounded-xl p-6 border border-[#2D2E36]">
            <div className="text-3xl font-bold text-[#00EF8B]">24/7</div>
            <div className="text-gray-400">Link Generation</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-gray-500">
          <p>powered by Flow ⚡</p>
        </div>
      </div>
    </div>
  );
} 
```

# pages/fonts/GeistMonoVF.woff

This is a binary file of the type: Binary

# pages/fonts/GeistVF.woff

This is a binary file of the type: Binary

# pages/index.jsx

```jsx
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const chains = {
  monad: {
    name: 'Monad',
    icon: '/monad.png',
    apps: [
      // { 
      //   name: 'Yap on-chain', 
      //   icon: '/yaponchain.png', 
      //   baseUrl: 'https://yaponchain.xyz/',
      //   description: 'Unlock liquidity for your NFTs.'
      // },
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
        description: 'interactive game with NFT mint'
      },
      { 
        name: 'NadRunner', 
        icon: '/nadrunner.png', 
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
        description: 'Dex on monad'
      }
      ,
      { 
        name: 'Encifher', 
        icon: '/encifher.jpg', 
        baseUrl: 'https://monad.encifher.io/',
        description: 'Encrypting soon.'
      }      ,
      { 
        name: 'Nad.fun', 
        icon: '/nadfun.webp', 
        baseUrl: 'https://testnet.nad.fun',
        description: 'Social Memecoin Playground.'
      }     ,
      { 
        name: 'Nostra', 
        icon: '/nostra.webp', 
        baseUrl: 'https://monad.nostra.finance/lend-borrow',
        description: 'Lend, borrow, swap & bridge crypto.'
      } ,
      { 
        name: 'Monorail', 
        icon: '/monorail.png', 
        baseUrl: 'https://testnet-preview.monorail.xyz/',
        description: 'Trade anything across Monad'
      },      
      { 
        name: 'Crystal', 
        icon: '/crystal.png', 
        baseUrl: 'https://app.crystal.exchange/ ',
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
  },
  // solana: {
  //   name: 'Solana',
  //   icon: '/sol.png',
  //   apps: [
  //     { 
  //       name: 'Jupiter', 
  //       icon: '/jup.png', 
  //       baseUrl: 'https://jup.ag/swap',
  //       description: 'Best swap aggregator on Solana',
  //       params: {
  //         type: 'path',
  //         format: '/SOL-{output}',
  //         defaultInput: 'SOL'
  //       }
  //     },
  //     { 
  //       name: 'Raydium', 
  //       icon: '/ray.png', 
  //       baseUrl: 'https://raydium.io/swap',
  //       description: 'AMM and liquidity provider',
  //       params: {
  //         type: 'query',
  //         inputParam: 'inputMint',
  //         outputParam: 'outputMint',
  //         defaultInput: 'sol'
  //       }
  //     }
  //   ]
  // }
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

              {/* Apps Grid */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-4 md:grid-cols-4 sm:grid-cols-3 gap-6 p-6 bg-[#1A1B1E] rounded-2xl border border-gray-800"
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
  href={`/embed?url=${encodeURIComponent(getAppUrl(app))}&chain=${selectedChain}&t=${timestamp}`}
  className="group flex flex-col items-center"
>
  <motion.div 
    className="relative w-16 h-16 mb-3 rounded-2xl overflow-hidden bg-[#25262B] border border-gray-800/50 shadow-lg transition-all duration-300 group-hover:border-gray-700"
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
      className="rounded-2xl object-cover relative z-10"
    />
  </motion.div>
  <span className="text-gray-300 text-xs text-center group-hover:text-white font-medium tracking-tight">
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
                            }}
                            className="absolute top-full left-[40%] -translate-x-1/2 flex text-xs flex-col 
                                     items-center justify-center rounded-xl bg-black/40 backdrop-blur-md 
                                     z-50 shadow-2xl border border-white/10 p-3 min-w-[180px] max-w-[200px] mt-2
                                     before:absolute before:inset-0 before:rounded-xl 
                                     before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-50"
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
                                        
                                        const embedUrl = `https://poink-main.vercel.app/embed?url=${encodeURIComponent(finalUrl)}&chain=${selectedChain}&t=${timestamp}`;
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
```

# pages/neo/index.jsx

```jsx
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';

export default function NeoHome() {
  const router = useRouter();

  const features = [
    {
      id: 'carrot',
      name: 'Carrot Finance',
      description: 'Generate links for Carrot Finance swaps and bridges',
      gradient: 'from-orange-500 to-red-500',
      icon: '🥕'
    },
    {
      id: 'asteroneo',
      name: 'AsteroNeo',
      description: 'Create poinks for AsteroNeo swaps and bridges',
      gradient: 'from-purple-600 to-pink-600',
      icon: '🌠'
    },
    {
      id: 'neo',
      name: 'Neo Ecosystem',
      description: 'Your gateway to Neo DeFi',
      gradient: 'from-green-400 to-cyan-500',
      icon: '🟢'
    },
    {
      id: 'neox',
      name: 'NeoX Network',
      description: 'Experience the future of Neo',
      gradient: 'from-blue-500 to-indigo-600',
      icon: '⚡'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F1115] bg-gradient-to-b from-[#0F1115] to-[#1A1B1F]">
      <Head>
        <title>Poinky | Your NeoX Poink Generator</title>
        <meta name="description" content="Your favorite Neo ecosystem link generator. Generate links for Carrot Finance, AsteroNeo, and more." />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20 relative">
          <div className="mb-8 flex justify-center">
            <div className="relative h-32 w-32">
              <Image
                src="/logodark.png"
                alt="Poinky Logo"
                layout="fill"
                objectFit="contain"
                className="animate-bounce"
              />
            </div>
          </div>
          
          <h1 className="text-7xl font-bold mb-6 animate-pulse">
            <span className="bg-gradient-to-r from-[#00E599] to-[#00AF92] bg-clip-text text-transparent">
              Neo Poinks
            </span>
          </h1>
          
          <p className="text-[#00E599] text-2xl font-bold mb-4">
           Your NeoX Poink Generator
          </p>
          
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            ready to explore the Neo ecosystem? generate your poinks here! 🟢
          </p>

          {/* CTA Button */}
          <button 
            onClick={() => window.open('https://x.com/poinky42', '_blank')}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-[#00E599] to-[#00AF92] rounded-full text-white font-bold text-xl hover:opacity-90 transform hover:scale-105 transition-all duration-300 animate-pulse"
          >
            Follow on Twitter 🐦
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`
                relative overflow-hidden rounded-2xl p-8
                transform transition-all duration-300 hover:scale-105
                bg-[#1E1F25] border border-[#2D2E36] hover:border-[#00E599]
              `}
            >
              <div className="relative z-10">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                  {feature.name}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
              
              {/* Glow Effect */}
              <div className={`absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 bg-gradient-to-r ${feature.gradient} opacity-20 rounded-full blur-2xl`} />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 gap-8 text-center">
          <div className="bg-[#1E1F25] rounded-xl p-6 border border-[#2D2E36]">
            <div className="text-3xl font-bold text-[#00E599]">24/7</div>
            <div className="text-gray-400">Link Generation</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-gray-500">
          <p>powered by Neo N3 🟢</p>
        </div>
      </div>
    </div>
  );
} 
```

# pages/neocarrot/index.jsx

```jsx
import DexLinkGenerator from '../../components/DexLinkGenerator';

export default function CarrotPage() {
  return (
    <div className="min-h-screen bg-black p-8 space-y-8">
      <DexLinkGenerator
        title="Carrot Finance Swap Link Generator"
        description="Generate a link for Carrot Finance Swap."
        baseUrl="https://carrot-fi.xyz"
        routePath="/swap"
        isStatic={true}
      />

      <DexLinkGenerator
        title="Carrot Finance Bridge Link Generator"
        description="Generate a link for Carrot Finance Bridge."
        baseUrl="https://carrot-fi.xyz"
        routePath="/bridge"
        isStatic={true}
      />
    </div>
  );
} 
```

# pages/options.jsx

```jsx
import { useState, useEffect } from 'react';

export default function RouteGenerator() {
  const [timestamp, setTimestamp] = useState(null);
  const [apps] = useState([
    {
      name: 'Navi Protocol',
      url: 'https://app.naviprotocol.io/market'
    },
    {
      name: 'Uniswap',
      url: 'https://app.uniswap.org/'
    },
    {
      name: 'Cellana Finance',
      url: 'https://app.cellana.finance/swap?inputCurrency=0x1::aptos_coin::AptosCoin&outputCurrency=0x2ebb2ccac5e027a87fa0e2e5f656a3a4238d6a48d93ec9b610d570fc0aa0df12'
    }
  ]);

  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  const generateRoute = (url) => {
    if (!timestamp) return '';
    return `https://poinky.vercel.app/dapp/nav1?url=${url}&t=${timestamp}`;
  };

  if (!timestamp) return null;

  return (
    <div style={{ padding: '20px', background: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>Generated Routes</h1>
      {apps.map((app, index) => (
        <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #333', borderRadius: '8px' }}>
          <h3>{app.name}</h3>
          <code style={{ 
            display: 'block', 
            padding: '10px', 
            background: '#111', 
            borderRadius: '4px',
            wordBreak: 'break-all' 
          }}>
            {generateRoute(app.url)}
          </code>
        </div>
      ))}
    </div>
  );
}
```

# pages/scrolltest.jsx

```jsx
export default function TestScroll() {
    return (
      <>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Scroll Test Page</title>

          {/* Twitter Card Metadata */}
          <meta name="twitter:card" content="player" />
          <meta name="twitter:site" content="https://x.com/ethereum" />
          <meta name="twitter:title" content="Scroll Test" />
          <meta name="twitter:description" content="Testing iframe scroll behavior" />
          <meta name="twitter:player" content="https://knknknkn.vercel.app/" />
          <meta name="twitter:player:width" content="360" />
          <meta name="twitter:player:height" content="560" />
          <meta name="twitter:image" content="/logodark.png" />

          <script src="https://cdn.tailwindcss.com" />
        </head>

        <div className="min-h-screen w-full p-2 sm:p-4">
          <div className="w-full h-[calc(100vh-16px)] sm:h-screen rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://carrot-fi.xyz"
              className="w-full h-full"
              title="Test Scroll"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              loading="lazy"
            />
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
```

# pages/scrolltest2.jsx

```jsx
export default function TestScroll() {
    return (
      <>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Scroll Test Page</title>

          {/* Twitter Card Metadata */}
          <meta name="twitter:card" content="player" />
          <meta name="twitter:site" content="https://x.com/ethereum" />
          <meta name="twitter:title" content="Scroll Test" />
          <meta name="twitter:description" content="Testing iframe scroll behavior" />
          <meta name="twitter:player" content="https://knknknkn.vercel.app/" />
          <meta name="twitter:player:width" content="360" />
          <meta name="twitter:player:height" content="560" />
          <meta name="twitter:image" content="https://pbs.twimg.com/profile_images/1846897640677822470/8g6-quYE_400x400.jpg" />

          <script src="https://cdn.tailwindcss.com" />
        </head>

        <div className="min-h-screen w-full p-2 sm:p-4">
          <div className="w-full h-[calc(100vh-16px)] sm:h-screen rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://carrot-fi.xyz"
              className="w-full h-full"
              title="Test Scroll"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              loading="lazy"
            />
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
```

# pages/solanaold/index.jsx

```jsx
import DexLinkGenerator from '../../components/DexLinkGenerator';

export default function SolanaPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <DexLinkGenerator
        title="Raydium Poink Generator"
        description="Generate a poink for Raydium on Solana. Enter the token mint address you want to swap to."
        baseUrl="https://raydium.io/swap"
        inputParam="inputMint"
        outputParam="outputMint"
        nativeToken="sol"
        isSymbolBased={false}
        isSolana={true}
      />
    </div>
  );
}
```

# pages/soljup/index.jsx

```jsx
import DexLinkGenerator from '../../components/DexLinkGenerator';

export default function JupiterPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <DexLinkGenerator
        title="Jupiter Swap poink Generator"
        description="Generate a swap link for Jupiter on Solana. Enter the token mint address you want to swap to."
        baseUrl="https://jup.ag/swap"
        inputParam="SOL"
        outputParam=""
        nativeToken="sol"
        isSymbolBased={false}
        isSolana={true}
        separator="-"
      />
    </div>
  );
} 
```

# pages/testrandom.jsx

```jsx
export default function TestScroll() {
    return (
      <>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Scroll Test Page</title>

          {/* Twitter Card Metadata */}
          <meta name="twitter:card" content="player" />
          <meta name="twitter:site" content="https://x.com/ethereum" />
          <meta name="twitter:title" content="Scroll Test" />
          <meta name="twitter:description" content="Testing iframe scroll behavior" />
          <meta name="twitter:player" content="https://poinky.vercel.app/" />
          <meta name="twitter:player:width" content="360" />
          <meta name="twitter:player:height" content="560" />
          <meta name="twitter:image" content="/logodark.png" />

          <script src="https://cdn.tailwindcss.com" />
        </head>

        <div className="min-h-screen w-full p-2 sm:p-4">
          <div className="w-full h-[calc(100vh-16px)] sm:h-screen rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://carrot-fi.xyz"
              className="w-full h-full"
              title="Test Scroll"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              loading="lazy"
            />
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
```

# pages/testsame.jsx

```jsx
export default function TestScroll() {
    return (
      <>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Scroll Test Page</title>

          {/* Twitter Card Metadata */}
          <meta name="twitter:card" content="player" />
          <meta name="twitter:site" content="https://x.com/ethereum" />
          <meta name="twitter:title" content="Scroll Test" />
          <meta name="twitter:description" content="Testing iframe scroll behavior" />
          <meta name="twitter:player" content="https://poink-main.vercel.app/" />
          <meta name="twitter:player:width" content="360" />
          <meta name="twitter:player:height" content="560" />
          <meta name="twitter:image" content="/logodark.png" />

          <script src="https://cdn.tailwindcss.com" />
        </head>

        <div className="min-h-screen w-full p-2 sm:p-4">
          <div className="w-full h-[calc(100vh-16px)] sm:h-screen rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://carrot-fi.xyz"
              className="w-full h-full"
              title="Test Scroll"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              loading="lazy"
            />
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
```

# pages/testsamedomain.jsx

```jsx
export default function TestScroll() {
    return (
      <>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Scroll Test Page</title>

          {/* Twitter Card Metadata */}
          <meta name="twitter:card" content="player" />
          <meta name="twitter:site" content="https://x.com/ethereum" />
          <meta name="twitter:title" content="Scroll Test" />
          <meta name="twitter:description" content="Testing iframe scroll behavior" />
          <meta name="twitter:player" content="https://poink-main.vercel.app/testsamedomain" />
          <meta name="twitter:player:width" content="360" />
          <meta name="twitter:player:height" content="560" />
          <meta name="twitter:image" content="/logodark.png" />

          <script src="https://cdn.tailwindcss.com" />
        </head>

        <div className="min-h-screen w-full p-2 sm:p-4">
          <div className="w-full h-[calc(100vh-16px)] sm:h-screen rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://carrot-fi.xyz"
              className="w-full h-full"
              title="Test Scroll"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              loading="lazy"
            />
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
```

# pages/testtime.jsx

```jsx
export default function TestScroll() {
    return (
      <>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Scroll Test Page</title>

          {/* Twitter Card Metadata */}
          <meta name="twitter:card" content="player" />
          <meta name="twitter:site" content="https://x.com/ethereum" />
          <meta name="twitter:title" content="Scroll Test" />
          <meta name="twitter:description" content="Testing iframe scroll behavior" />
          <meta name="twitter:player" content="https://poink-main.vercel.app/testtime" />
          <meta name="twitter:player:width" content="360" />
          <meta name="twitter:player:height" content="560" />
          <meta name="twitter:image" content="/logodark.png" />

          <script src="https://cdn.tailwindcss.com" />
        </head>

        <div className="min-h-screen w-full p-2 sm:p-4">
          <div className="w-full h-[calc(100vh-16px)] sm:h-screen rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://carrot-fi.xyz"
              className="w-full h-full"
              title="Test Scroll"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              loading="lazy"
            />
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
```

# postcss.config.mjs

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

# public/agoric.png

This is a binary file of the type: Image

# public/aptos.png

This is a binary file of the type: Image

# public/arb.png

This is a binary file of the type: Image

# public/avalanche.png

This is a binary file of the type: Image

# public/base.png

This is a binary file of the type: Image

# public/beanexchange.jpg

This is a binary file of the type: Image

# public/cow.png

This is a binary file of the type: Image

# public/crystal.png

This is a binary file of the type: Image

# public/encifher.jpg

This is a binary file of the type: Image

# public/eth.png

This is a binary file of the type: Image

# public/favicon.ico

This is a binary file of the type: Binary

# public/file.svg

This is a file of the type: SVG Image

# public/Flow.com logo/PNG/Flow.com_wordmark_BlackText.png

This is a binary file of the type: Image

# public/Flow.com logo/PNG/Flow.com_wordmark_Bold.png

This is a binary file of the type: Image

# public/Flow.com logo/PNG/Flow.com_wordmark_MonochromeBlack.png

This is a binary file of the type: Image

# public/Flow.com logo/PNG/Flow.com_wordmark_MonochromeWhite.png

This is a binary file of the type: Image

# public/Flow.com logo/PNG/Flow.com_wordmark_WhiteText.png

This is a binary file of the type: Image

# public/Flow.com logo/SVG/Flow.com_wordmark_BlackText.svg

This is a file of the type: SVG Image

# public/Flow.com logo/SVG/Flow.com_wordmark_MonochomeBlack.svg

This is a file of the type: SVG Image

# public/Flow.com logo/SVG/Flow.com_wordmark_MonochomeWhite.svg

This is a file of the type: SVG Image

# public/Flow.com logo/SVG/Flow.com_wordmark_WhiteText.svg

This is a file of the type: SVG Image

# public/flow.png

This is a binary file of the type: Image

# public/flowlogo.png

This is a binary file of the type: Image

# public/flowlogo.zip

This is a binary file of the type: Compressed Archive

# public/globe.svg

This is a file of the type: SVG Image

# public/increment.png

This is a binary file of the type: Image

# public/jup.png

This is a binary file of the type: Image

# public/logo.png

This is a binary file of the type: Image

# public/logodark.png

This is a binary file of the type: Image

# public/manifest.json

```json
{
    "short_name": "MlinksApp",
    "name": "Mlinks Decentralized Actions",
    "icons": [
      {
        "src": "/logodark.png",
        "type": "image/png",
        "sizes": "192x192"
      }
    ],
    "start_url": ".",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#ffffff"
  }
```

# public/monad.png

This is a binary file of the type: Image

# public/monorail.png

This is a binary file of the type: Image

# public/more.png

This is a binary file of the type: Image

# public/nadfun.png

This is a binary file of the type: Image

# public/nadfun.webp

This is a binary file of the type: Image

# public/nadfunfull.webp

This is a binary file of the type: Image

# public/nadfunlogo.svg

This is a file of the type: SVG Image

# public/nadrunner.png

This is a binary file of the type: Image

# public/next.svg

This is a file of the type: SVG Image

# public/nostra.webp

This is a binary file of the type: Image

# public/pancake.png

This is a binary file of the type: Image

# public/purgenad.png

This is a binary file of the type: Image

# public/ray.png

This is a binary file of the type: Image

# public/sol.png

This is a binary file of the type: Image

# public/solana.png

This is a binary file of the type: Image

# public/sui.png

This is a binary file of the type: Image

# public/uni.png

This is a binary file of the type: Image

# public/unichain.png

This is a binary file of the type: Image

# public/vercel.svg

This is a file of the type: SVG Image

# public/window.svg

This is a file of the type: SVG Image

# public/yaponchain.jpg

This is a binary file of the type: Image

# public/yaponchain.png

This is a binary file of the type: Image

# README.md

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server :

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
# solanapoink

```

# styles/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
}

```

# tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

```

# utils/tokenMetadata.js

```js
export async function fetchTokenMetadata(chainId, tokenAddress) {
  try {
    const response = await fetch(`https://api.1inch.io/v5.0/${chainId}/tokens`);
    const data = await response.json();
    
    // Handle native token cases
    if (tokenAddress.toLowerCase() === 'eth' || tokenAddress.toLowerCase() === 'avax') {
      return {
        symbol: tokenAddress.toUpperCase(),
        name: tokenAddress === 'eth' ? 'Ethereum' : 'Avalanche',
        decimals: 18
      };
    }

    const token = data.tokens[tokenAddress];
    return token || null;
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    return null;
  }
} 
```

