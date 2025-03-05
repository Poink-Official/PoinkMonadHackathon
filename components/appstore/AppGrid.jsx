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