'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { reviews } from '@/lib/reviews';
import { products } from '@/lib/products';

export default function Testimonials() {
  const topReviews = reviews.slice(0, 4);
  const bottomReviews = reviews.slice(4);

  const ReviewCard = ({ review }: { review: typeof reviews[0] }) => {
    const product = products.find(p => p.id === review.productId);

    return (
      // Card: White with Rich Chocolate text
      <div className="flex-shrink-0 w-72 bg-white rounded-3xl p-6 shadow-xl space-y-4 border border-[#4B2C20]/5">
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#DAA520]">
            <Image
              src={review.photo}
              alt={review.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-bold text-[#4B2C20]">{review.name}</span>
              {review.verified && (
                <span className="text-[#DAA520] text-[10px] font-bold uppercase tracking-tighter">✓ Verified</span>
              )}
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < review.rating ? 'fill-[#DAA520] text-[#DAA520]' : 'text-gray-200'}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-[#4B2C20]/80 leading-relaxed italic">
          "{review.text}"
        </p>

        {product && (
          // Product Tag: Deep Maroon (#800020)
          <div className="inline-block bg-[#800020]/10 px-3 py-1 rounded-full border border-[#800020]/20">
            <span className="text-[10px] font-mono text-[#800020] font-bold uppercase tracking-widest">
              {product.name}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    // Background: Millet Cream (#FDF5E6)
    <section className="py-16 sm:py-24 bg-[#FDF5E6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-2"
        >
          <h2 className="font-bebas text-[#800020] text-5xl sm:text-6xl lg:text-8xl tracking-wider">
            THE PEOPLE HAVE SPOKEN
          </h2>
          <p className="font-mono text-[#4B2C20]/60 text-xs font-bold tracking-widest uppercase">
            Trusted by 10,000+ athletes worldwide
          </p>
        </motion.div>
      </div>

      <div className="space-y-6">
        {/* Marquee effect */}
        <div className="flex animate-marquee">
          <div className="flex space-x-6 pr-6">
            {[...topReviews, ...topReviews].map((review, index) => (
              <ReviewCard key={`top-${index}`} review={review} />
            ))}
          </div>
        </div>

        <div className="flex" style={{ animation: 'marquee 50s linear infinite reverse' }}>
          <div className="flex space-x-6 pr-6">
            {[...bottomReviews, ...bottomReviews].map((review, index) => (
              <ReviewCard key={`bottom-${index}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}