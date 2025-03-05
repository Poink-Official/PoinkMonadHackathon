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