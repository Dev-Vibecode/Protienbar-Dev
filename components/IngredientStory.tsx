'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Check, X, Leaf, Zap, ShieldCheck } from 'lucide-react';
import { useRef } from 'react';

export default function IngredientStory() {
  const containerRef = useRef(null);
  
  // Parallax logic for the background elements
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const ingredients = [
    { emoji: '🌴', name: 'DATES', origin: 'Gujarat, India', color: '#DAA520' },
    { emoji: '🍫', name: 'DARK COCOA', origin: 'Ecuador', color: '#800020' },
    { emoji: '🥜', name: 'ALMONDS', origin: 'California', color: '#DAA520' },
    { emoji: '🐄', name: 'WHEY PROTEIN', origin: 'NZ Grass-Fed', color: '#800020' },
    { emoji: '🧂', name: 'SEA SALT', origin: 'Himalayan', color: '#DAA520' }
  ];

  return (
    <section 
      ref={containerRef}
      id="ingredients" 
      className="relative py-24 sm:py-32 bg-[#2D1B14] overflow-hidden"
    >
      {/* Animated Background Orbs for UI Depth */}
      <motion.div style={{ y: y1 }} className="absolute top-20 left-[10%] w-64 h-64 bg-[#800020]/20 blur-[120px] rounded-full" />
      <motion.div style={{ y: y2 }} className="absolute bottom-20 right-[10%] w-96 h-96 bg-[#DAA520]/10 blur-[150px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        
        {/* Header with Reveal Animation */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-[#DAA520]/10 border border-[#DAA520]/20 text-[#DAA520] px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
          >
            <Leaf size={14} /> 100% Clean Label
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="font-bebas text-[#FDF5E6] text-6xl sm:text-8xl lg:text-9xl tracking-tight leading-none"
          >
            ONLY <span className="text-[#DAA520]">REAL</span> THINGS <br /> INSIDE
          </motion.h2>
        </div>

        {/* 3D Ingredient Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 mb-24">
          {ingredients.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center transition-all group-hover:border-[#DAA520]/50 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                  className="text-5xl mb-4 filter drop-shadow-lg"
                >
                  {ing.emoji}
                </motion.div>
                <h3 className="font-bebas text-[#FDF5E6] text-xl tracking-wide leading-none mb-2">{ing.name}</h3>
                <p className="text-[#FDF5E6]/40 text-[10px] font-mono font-black uppercase tracking-tighter">{ing.origin}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Section with Enhanced Glassmorphism */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* THE GOOD PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#DAA520]/5 group-hover:bg-[#DAA520]/10 transition-colors rounded-[2.5rem]" />
            <div className="relative p-8 sm:p-12 border border-white/10 rounded-[2.5rem] backdrop-blur-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#DAA520] flex items-center justify-center shadow-lg shadow-[#DAA520]/40">
                  <Zap className="text-white" size={24} />
                </div>
                <h3 className="font-bebas text-[#DAA520] text-4xl tracking-wide">WHAT WE PUT IN</h3>
              </div>
              <ul className="grid sm:grid-cols-2 gap-4">
                {['Real Whey Protein', 'Organic Dates', 'Raw Nuts', 'Pure Cocoa', 'Sea Salt'].map((item) => (
                  <li key={item} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                    <Check className="text-[#DAA520]" size={18} />
                    <span className="text-sm font-bold text-[#FDF5E6]/90 uppercase tracking-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* THE BAD PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#800020]/5 group-hover:bg-[#800020]/10 transition-colors rounded-[2.5rem]" />
            <div className="relative p-8 sm:p-12 border border-white/10 rounded-[2.5rem] backdrop-blur-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#800020] flex items-center justify-center shadow-lg shadow-[#800020]/40">
                  <ShieldCheck className="text-white" size={24} />
                </div>
                <h3 className="font-bebas text-[#800020] text-4xl tracking-wide">LEAVE OUT</h3>
              </div>
              <ul className="grid sm:grid-cols-2 gap-4">
                {['Maltodextrin', 'Sucralose', 'Palm Oil', 'Artificials', 'Preservatives'].map((item) => (
                  <li key={item} className="flex items-center gap-3 p-3 rounded-xl bg-black/20 border border-white/5 opacity-50 grayscale hover:grayscale-0 transition-all">
                    <X className="text-[#800020]" size={18} />
                    <span className="text-sm font-bold text-[#FDF5E6]/60 line-through uppercase tracking-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>

        {/* Floating Bottom Label */}
        <motion.div 
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-20 text-center"
        >
          <p className="font-mono text-[10px] text-[#FDF5E6]/20 font-black uppercase tracking-[0.5em]">
            No Hidden Ingredients • No Marketing Lies
          </p>
        </motion.div>
      </div>
    </section>
  );
}