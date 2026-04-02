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
      <div className="flex-shrink-0 w-72 bg-white rounded-3xl p-6 shadow-lg space-y-4">
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
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
              <span className="font-bold text-dark">{review.name}</span>
              {review.verified && (
                <span className="text-green-500 text-xs">✓ Verified</span>
              )}
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < review.rating ? 'fill-yellow text-yellow' : 'text-gray-300'}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed">
          {review.text}
        </p>

        {product && (
          <div className="inline-block bg-offwhite px-3 py-1 rounded-full">
            <span className="text-xs font-mono text-purple font-bold">
              {product.name}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-16 sm:py-24 bg-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-2"
        >
          <h2 className="font-bebas text-purple text-5xl sm:text-6xl lg:text-7xl tracking-wider">
            THE PEOPLE HAVE SPOKEN
          </h2>
        </motion.div>
      </div>

      <div className="space-y-6">
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
