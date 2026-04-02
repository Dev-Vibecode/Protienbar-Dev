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
  const [isFlipped, setIsFlipped] = useState(false);
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
      style={{
        perspective: 1000,
      }}
    >
      <Link href={`/product/${product.id}`}>
        <motion.div
          className="relative bg-white rounded-3xl overflow-hidden shadow-lg cursor-pointer group"
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
          <div className={`relative h-64 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
            <div className="relative w-48 h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="absolute top-3 left-3">
              <span className="bg-yellow text-dark font-mono text-xs px-3 py-1 rounded-full font-bold uppercase">
                {product.badge}
              </span>
            </div>

            <div className="absolute top-3 right-3">
              <span className="bg-purple text-white font-mono text-xs px-3 py-1 rounded-full font-bold">
                {product.protein} PROTEIN
              </span>
            </div>
          </div>

          <div className="bg-offwhite p-5 space-y-3">
            <div>
              <h3 className="font-bebas text-2xl text-purple tracking-wide">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600">
                {product.tagline}
              </p>
            </div>

            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(product.rating) ? 'fill-yellow text-yellow' : 'text-gray-300'}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1 font-mono">
                ({product.reviews})
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-brown">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </div>
              <span className="text-xs font-mono text-green-600">
                SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            </div>

            <motion.button
              onClick={handleAddToCart}
              className={`w-full ${isAdding ? 'bg-green-500' : 'bg-pink hover:bg-purple'} text-white rounded-full py-3 font-bold transition-colors duration-200 flex items-center justify-center space-x-2`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isAdding ? (
                <span>✓ ADDED!</span>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  <span>ADD TO CART</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
