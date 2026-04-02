'use client';

import { motion } from 'framer-motion';
import { products } from '@/lib/products';
import ProductCard from './ProductCard';

export default function Bestsellers() {
  return (
    // Background: Millet Cream (#FDF5E6)
    <section id="bestsellers" className="py-20 sm:py-32 bg-[#FDF5E6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        
        {/* Floating Header UI/UX */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative mb-20 sm:mb-28 text-center"
        >
          {/* Decorative Back-text for extra "style" */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] sm:text-[12rem] lg:text-[15rem] font-bebas text-[#800020]/5 select-none pointer-events-none">
            BESTSELLERS
          </span>

          <h2 className="relative font-bebas text-[#800020] text-6xl sm:text-7xl lg:text-9xl tracking-tighter leading-none mb-4">
            FUELLING THE <br className="sm:hidden" /> <span className="text-transparent" style={{ WebkitTextStroke: '2px #800020' }}>OBSESSED</span>
          </h2>

          {/* <motion.div 
            initial={{ rotate: -5, opacity: 0 }}
            whileInView={{ rotate: -2, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block bg-[#DAA520] text-white px-6 py-2 rounded-full shadow-lg transform -rotate-2 ml-auto sm:ml-40"
          >
            <p className="font-mono text-sm sm:text-base font-bold italic uppercase tracking-widest">
              Pick your weapon.
            </p>
          </motion.div> */}
        </motion.div>

        {/* Grid with staggered entry UI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1] // Custom "snappy" easing
              }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Subtle UI Footer for the section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="font-mono text-[10px] text-[#4B2C20]/40 font-bold uppercase tracking-[0.4em]">
            Limited Batch • Freshly Built
          </p>
        </motion.div>
      </div>
    </section>
  );
}