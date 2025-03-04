import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { event } from '@/lib/analytics';

export default function ResponsiveAppGrid({ chain, apps, timestamp }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [contractAddresses, setContractAddresses] = useState({});
  const [appUrls, setAppUrls] = useState({});
  const [generatedPoink, setGeneratedPoink] = useState(null);
  const [copiedStates, setCopiedStates] = useState({});

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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  const getAppUrl = (app) => {
    return appUrls[app.name] || app.baseUrl;
  };

  const handleAppClick = (app) => {
    event({
      action: 'open_app',
      category: 'App Interaction',
      label: app.name,
      value: chain,
      properties: {
        appName: app.name,
        chain: chain,
        appUrl: getAppUrl(app),
        timestamp: new Date().toISOString(),
        // Add any other app details you want to track
        hasCustomParams: !!app.params,
        appDescription: app.description
      }
    });
  };

  const handleCopy = async (app) => {
    if (generatedPoink) {
      try {
        await navigator.clipboard.writeText(generatedPoink);
        
        // Track the copy event
        event({
          action: 'copy_poink',
          category: 'Link Generation',
          label: app.name,
        });
        
        setCopiedStates(prev => ({ ...prev, [app.name]: true }));
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
          setCopiedStates(prev => ({ ...prev, [app.name]: true }));
          setTimeout(() => {
            setCopiedStates(prev => ({ ...prev, [app.name]: false }));
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      }
    }
  };

  const handleAddressChange = (app, value) => {
    // Track when user enters a token address
    if (value && value.length > 5) {
      event({
        action: 'input_token_address',
        category: 'Token Configuration',
        label: app.name,
      });
    }
    
    const ca = value;
    
    setContractAddresses(prev => ({
      ...prev,
      [app.name]: ca
    }));

    let finalUrl;
    
    if (app.params?.type === 'query') {
      finalUrl = `${app.baseUrl}?${app.params.inputParam}=${app.params.defaultInput}&${app.params.outputParam}=${ca}`;
    } else if (app.params?.type === 'path') {
      finalUrl = app.baseUrl + app.params.format.replace('{output}', ca);
    }

    if (finalUrl) {
      setAppUrls(prev => ({
        ...prev,
        [app.name]: finalUrl
      }));
      
      const embedUrl = `https://app.poink.xyz/embed?url=${encodeURIComponent(finalUrl)}&chain=${chain}&t=${timestamp}`;
      setGeneratedPoink(embedUrl);
      
      // Track when a poink URL is generated
      event({
        action: 'generate_poink',
        category: 'Link Generation',
        label: app.name,
      });
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 xs:gap-3 sm:gap-4 md:gap-6 p-4 sm:p-6 bg-[#1A1B1E] rounded-2xl border border-gray-800"
    >
      {apps.map((app, idx) => (
        <div
          key={app.name}
          className="relative group"
          onMouseEnter={() => {
            setHoveredIndex(idx);
            // Track tooltip view
            if (idx !== hoveredIndex) {
              event({
                action: 'view_tooltip',
                category: 'App Interaction',
                label: app.name,
              });
            }
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Link
            href={`/embed?url=${encodeURIComponent(getAppUrl(app))}&chain=${chain}&t=${timestamp}`}
            className="group flex flex-col items-center"
            onClick={() => handleAppClick(app)}
          >
            <motion.div 
              className="relative w-14 h-14 sm:w-16 sm:h-16 mb-2 rounded-2xl overflow-hidden bg-[#25262B] border border-gray-800/50 shadow-lg transition-all duration-300 group-hover:border-gray-700"
              whileHover={{ 
                y: -5,
                scale: 1.1,
                transition: { type: "spring", stiffness: 300 }
              }}
              whileTap={{ scale: 0.9 }}
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

          {/* Tooltip */}
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
                scale: 0.6
              }}
              className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-[200px] min-w-[150px] 
                       bg-black/40 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 p-3
                       before:absolute before:inset-0 before:rounded-xl 
                       before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-50"
            >
              {/* Tooltip background animation */}
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
              
              {/* Tooltip content */}
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
                      onChange={(e) => handleAddressChange(app, e.target.value)}
                    />
                    
                    <div className="relative group">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-emerald-500/20 to-sky-500/20 hover:from-emerald-500/30 hover:to-sky-500/30 border border-white/10 rounded-lg py-1 px-3 text-[11px] text-white/90 font-medium transition-all shadow-lg shadow-black/20"
                        onClick={() => handleCopy(app)}
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
        </div>
      ))}
    </motion.div>
  );
}