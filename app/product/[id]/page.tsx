'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ChevronRight, Minus, Plus, Check, X as XIcon, Truck } from 'lucide-react';
import { useParams } from 'next/navigation';
import { products } from '@/lib/products';
import { reviews as allReviews } from '@/lib/reviews';
import { useCartStore } from '@/lib/cartStore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const product = products.find(p => p.id === productId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [packSize, setPackSize] = useState<'single' | '6-pack' | '12-pack'>('single');
  const [isAdding, setIsAdding] = useState(false);

  const { addItem, openCart } = useCartStore();

  if (!product) {
    return <div>Product not found</div>;
  }

  const productImages = [product.image, product.image, product.image, product.image];
  const productReviews = allReviews.filter(r => r.productId === product.id);
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  const packOptions = [
    { value: 'single', label: 'Single', discount: 0 },
    { value: '6-pack', label: '6-Pack', discount: 10 },
    { value: '12-pack', label: '12-Pack', discount: 18 }
  ];

  const calculatePrice = () => {
    let price = product.price;
    if (packSize === '6-pack') price = price * 6 * 0.9;
    if (packSize === '12-pack') price = price * 12 * 0.82;
    return price * quantity;
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      addItem(product, packSize);
    }
    setTimeout(() => {
      setIsAdding(false);
      openCart();
    }, 800);
  };

  return (
    <>
      <Navbar />
      <CartDrawer />

      <div className="min-h-screen bg-offwhite pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-purple">Home</Link>
            <ChevronRight size={16} />
            <Link href="/#bestsellers" className="hover:text-purple">Shop</Link>
            <ChevronRight size={16} />
            <span className="text-purple font-medium">{product.name}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-4">
              <motion.div
                className={`relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br ${product.gradient} flex items-center justify-center`}
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={productImages[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-contain p-12"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-yellow text-dark font-mono text-sm px-4 py-2 rounded-full font-bold">
                    {product.protein} PROTEIN
                  </span>
                </div>
              </motion.div>

              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-xl overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-purple' : 'opacity-60 hover:opacity-100'
                    } transition-all`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="inline-block bg-yellow px-3 py-1 rounded-full mb-3">
                  <span className="text-xs font-mono font-bold text-dark uppercase">
                    {product.badge}
                  </span>
                </div>
                <h1 className="font-bebas text-purple text-5xl sm:text-6xl tracking-wide mb-2">
                  {product.name}
                </h1>
                <p className="text-pink text-xl italic">{product.tagline}</p>
              </div>

              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? 'fill-yellow text-yellow' : 'text-gray-300'}
                  />
                ))}
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold text-brown">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-yellow text-dark px-3 py-1 rounded-full text-sm font-bold font-mono">
                  YOU SAVE ${(product.originalPrice - product.price).toFixed(2)} ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF)
                </span>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-purple">Pack Size</label>
                <div className="grid grid-cols-3 gap-3">
                  {packOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPackSize(option.value as any)}
                      className={`py-3 px-4 rounded-xl border-2 transition-all ${
                        packSize === option.value
                          ? 'border-purple bg-purple text-white'
                          : 'border-gray-300 hover:border-purple'
                      }`}
                    >
                      <div className="font-bold">{option.label}</div>
                      {option.discount > 0 && (
                        <div className="text-xs">Save {option.discount}%</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-bold text-purple">Quantity</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3 bg-white rounded-full px-4 py-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 hover:bg-offwhite rounded-full transition-colors"
                    >
                      <Minus size={18} className="text-purple" />
                    </button>
                    <span className="font-mono text-xl font-bold w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 hover:bg-offwhite rounded-full transition-colors"
                    >
                      <Plus size={18} className="text-purple" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <motion.button
                  onClick={handleAddToCart}
                  className={`w-full ${isAdding ? 'bg-green-500' : 'bg-yellow hover:bg-purple hover:text-white'} text-dark rounded-full py-4 font-bebas text-xl tracking-wide transition-colors`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isAdding ? '✓ ADDED TO CART!' : `ADD TO CART — $${calculatePrice().toFixed(2)}`}
                </motion.button>

                <button className="w-full border-2 border-purple text-purple rounded-full py-4 font-bold hover:bg-purple hover:text-white transition-colors">
                  🔁 SUBSCRIBE & SAVE 15%
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <XIcon size={16} className="text-red-500" />
                  <span>No Added Sugar</span>
                </div>
                <div className="flex items-center space-x-2">
                  <XIcon size={16} className="text-red-500" />
                  <span>No Palm Oil</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check size={16} className="text-green-500" />
                  <span>Lab Tested</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck size={16} className="text-purple" />
                  <span>Ships in 1-2 days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-3xl p-8 space-y-6">
              <h2 className="font-bebas text-purple text-3xl tracking-wide">
                WHAT'S INSIDE?
              </h2>
              <div className="space-y-3">
                {product.ingredients.map((ingredient) => (
                  <div key={ingredient} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple rounded-full" />
                    <span className="font-medium">{ingredient}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-offwhite px-3 py-1 rounded-full text-xs font-bold text-purple"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 space-y-6">
              <h2 className="font-bebas text-purple text-3xl tracking-wide">
                THE HONEST NUMBERS
              </h2>
              <div className="space-y-4">
                {Object.entries(product.macros).map(([key, value]) => {
                  const percentage = (value / 50) * 100;
                  const colors = {
                    protein: 'bg-purple',
                    carbs: 'bg-pink',
                    fat: 'bg-brown',
                    fiber: 'bg-yellow'
                  };
                  return (
                    <div key={key}>
                      <div className="flex justify-between mb-1">
                        <span className="font-bold capitalize">{key}</span>
                        <span className="font-mono">{value}g</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className={`${colors[key as keyof typeof colors]} h-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {productReviews.length > 0 && (
            <div className="mb-16">
              <h2 className="font-bebas text-purple text-4xl tracking-wide mb-8">
                {productReviews.length} REAL REVIEWS
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {productReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-3xl p-6 space-y-4">
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
                          <span className="font-bold">{review.name}</span>
                          {review.verified && (
                            <span className="text-green-500 text-xs">✓</span>
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
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {relatedProducts.length > 0 && (
            <div>
              <h2 className="font-bebas text-purple text-4xl tracking-wide mb-8">
                STACK YOUR STASH
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p, index) => (
                  <ProductCard key={p.id} product={p} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-offwhite/80 backdrop-blur-md border-t border-softpink py-3 px-4 md:hidden z-30">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div>
              <div className="text-xs text-gray-500">Total</div>
              <div className="font-bold text-xl text-purple">
                ${calculatePrice().toFixed(2)}
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className={`${isAdding ? 'bg-green-500' : 'bg-yellow'} text-dark px-6 py-3 rounded-full font-bold`}
            >
              {isAdding ? '✓ ADDED!' : 'ADD TO CART'}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
