'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/products';
import { useCartStore } from '@/lib/cartStore';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [8, -8]);
  const rotateY = useTransform(mouseX, [-100, 100], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product);
    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ perspective: 1000 }}
    >
      <Link href={`/product/${product.id}`}>
        <motion.div
          // Background updated to Millet Cream (#FDF5E6)
          className="relative bg-[#FDF5E6] rounded-3xl overflow-hidden shadow-lg cursor-pointer group border border-[#4B2C20]/5"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Top section with dynamic gradient (ensure product.gradient includes earthy tones) */}
          <div className={`relative h-64 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
            <div className="relative w-48 h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain drop-shadow-[0_20px_30px_rgba(75,44,32,0.4)] scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            {/* Badge updated to Golden Harvest (#DAA520) */}
            <div className="absolute top-3 left-3">
              <span className="bg-[#DAA520] text-white font-mono text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter shadow-sm">
                {product.badge}
              </span>
            </div>

            {/* Protein tag updated to Deep Maroon (#800020) */}
            <div className="absolute top-3 right-3">
              <span className="bg-[#800020] text-white font-mono text-[10px] px-3 py-1 rounded-full font-bold shadow-sm">
                {product.protein} PROTEIN
              </span>
            </div>
          </div>

          {/* Info Section - Clean and Earthy */}
          <div className="p-5 space-y-3">
            <div>
              {/* Title updated to Deep Maroon (#800020) */}
              <h3 className="font-bebas text-2xl text-[#800020] tracking-wide">
                {product.name}
              </h3>
              {/* Tagline updated to Chocolate tone (#4B2C20) */}
              <p className="text-sm text-[#4B2C20]/70 font-medium">
                {product.tagline}
              </p>
            </div>

            {/* Rating Stars - Using Golden Harvest (#DAA520) */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating) ? 'fill-[#DAA520] text-[#DAA520]' : 'text-gray-300'}
                />
              ))}
              <span className="text-xs text-[#4B2C20]/50 ml-1 font-mono">
                ({product.reviews})
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline space-x-2">
                {/* Price updated to Rich Chocolate (#4B2C20) */}
                <span className="text-2xl font-bold text-[#4B2C20]">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-[#4B2C20]/30 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-green-700">
                SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={handleAddToCart}
              className={`w-full ${
                isAdding ? 'bg-green-600' : 'bg-[#800020] hover:bg-[#4B2C20]'
              } text-white rounded-full py-3 font-bold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md shadow-[#800020]/10`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isAdding ? (
                <span className="flex items-center gap-2">✓ ADDED!</span>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  <span className="tracking-wide">ADD TO CART</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}