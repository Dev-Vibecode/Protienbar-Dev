'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 60, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    // Background updated to Millet Cream (#FDF5E6)
    <section className="relative min-h-screen flex items-center overflow-hidden grain-texture bg-[#FDF5E6]">
      {/* Gradients updated to use Maroon and Gold tones */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#800020]/10 via-[#DAA520]/10 to-[#4B2C20]/10" />
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#800020]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#DAA520]/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-20 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <motion.div
            className="lg:col-span-3 space-y-6 sm:space-y-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item}>
              {/* Tag updated to Golden Harvest (#DAA520) */}
              <span className="inline-block bg-[#DAA520] text-white font-mono text-xs sm:text-sm px-4 py-2 rounded-full font-bold uppercase tracking-wide shadow-sm">
                CLEAN LABEL PROTEIN 2026
              </span>
            </motion.div>

            <motion.div variants={item} className="space-y-2">
              {/* Primary Text updated to Deep Maroon (#800020) */}
              <h1 className="font-bebas text-[#800020] leading-none">
                <div className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-wider">
                  REAL PROTEIN.
                </div>
                {/* Stroke updated to Rich Chocolate (#4B2C20) */}
                <div className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-wider text-transparent"
                     style={{
                       WebkitTextStroke: '2px #4B2C20'
                     } as React.CSSProperties}>
                  ZERO
                </div>
                <div className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-wider">
                  NONSENSE.
                </div>
              </h1>
            </motion.div>

            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-[#4B2C20]/80 max-w-xl font-medium"
            >
              Looks like dessert. Works like fuel. 5 ingredients only.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/#bestsellers">
                <motion.button
                  /* Button updated to Golden Harvest (#DAA520) */
                  className="w-full sm:w-auto bg-[#DAA520] text-white rounded-full px-8 sm:px-10 py-4 font-bold text-lg tracking-wide hover:shadow-xl transition-all shadow-[#DAA520]/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  SHOP BARS →
                </motion.button>
              </Link>
              <Link href="/#build-box">
                <motion.button
                  /* Border updated to Deep Maroon (#800020) */
                  className="w-full sm:w-auto border-2 border-[#800020] text-[#800020] rounded-full px-8 sm:px-10 py-4 font-bold text-lg tracking-wide hover:bg-[#800020] hover:text-white transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  BUILD YOUR BOX
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              variants={item}
              className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[#DAA520]/20"
            >
              <span className="text-sm font-bold text-[#800020]">4.8</span>
              <span className="text-sm text-[#4B2C20]/40">|</span>
              <span className="text-sm text-[#4B2C20]/70">Trusted by 10,000+ athletes</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-2 relative"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src="/Nutribar.png"
                alt="Nutri Protein Bar"
                fill
                className="object-contain drop-shadow-[0_35px_35px_rgba(75,44,32,0.3)] scale-110"
                priority
              />

              {/* Badges updated with the palette colors */}
              <motion.div
                className="absolute top-0 right-0 bg-[#DAA520] text-white font-mono text-sm px-4 py-2 rounded-full font-bold shadow-lg"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                22g PROTEIN
              </motion.div>

              <motion.div
                className="absolute top-1/4 left-0 bg-[#800020] text-white font-mono text-xs px-3 py-2 rounded-full font-bold shadow-md"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                NO SUGAR
              </motion.div>

              <motion.div
                className="absolute bottom-1/4 right-0 bg-[#FDF5E6] border border-[#DAA520] text-[#4B2C20] font-mono text-xs px-3 py-2 rounded-full font-bold shadow-sm"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                5 INGREDIENTS
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}