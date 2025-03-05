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