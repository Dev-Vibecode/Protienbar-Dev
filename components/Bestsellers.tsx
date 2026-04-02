'use client';

import { motion } from 'framer-motion';
import { products } from '@/lib/products';
import ProductCard from './ProductCard';

export default function Bestsellers() {
  return (
    <section id="bestsellers" className="py-16 sm:py-24 bg-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12 sm:mb-16 space-y-4"
        >
          <h2 className="font-bebas text-purple text-5xl sm:text-6xl lg:text-7xl tracking-wider">
            FUELLING THE OBSESSED
          </h2>
          <p className="text-pink text-xl sm:text-2xl italic">
            Pick your weapon.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
