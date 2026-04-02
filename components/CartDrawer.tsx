'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal, getItemCount } = useCartStore();

  const total = getTotal();
  const freeShippingThreshold = 80;
  const shippingProgress = Math.min((total / freeShippingThreshold) * 100, 100);
  const amountToFreeShipping = Math.max(freeShippingThreshold - total, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#4B2C20]/40 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 40 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[450px] bg-[#FDF5E6] z-50 shadow-[-20px_0_50px_rgba(75,44,32,0.1)] flex flex-col"
          >
            {/* Header: Sticky & Glassy */}
            <div className="p-6 border-b border-[#800020]/10 flex items-center justify-between bg-[#FDF5E6]/80 backdrop-blur-md sticky top-0 z-10">
              <div className="space-y-1">
                <h2 className="font-bebas text-[#800020] text-4xl tracking-wider leading-none">
                  YOUR FUEL BOX
                </h2>
                <p className="font-mono text-[10px] text-[#4B2C20]/60 font-bold uppercase tracking-widest">
                  {getItemCount()} items selected
                </p>
              </div>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeCart}
                className="p-2 bg-[#800020] text-white rounded-full transition-shadow hover:shadow-lg shadow-[#800020]/20"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
              {/* Modern Shipping Tracker */}
              <div className="bg-white/50 border border-white p-5 rounded-[2rem] shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-end mb-3">
                  <p className="text-sm font-bold text-[#4B2C20]">
                    {shippingProgress < 100 
                      ? `Add $${amountToFreeShipping.toFixed(2)} for FREE shipping` 
                      : "🎉 You've unlocked Free Shipping!"}
                  </p>
                  <span className="text-[10px] font-mono text-[#DAA520] font-black uppercase">Goal: $80</span>
                </div>
                <div className="h-2 bg-[#4B2C20]/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    className="h-full bg-gradient-to-r from-[#DAA520] to-[#800020] relative"
                  >
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-white/20 skew-x-12" 
                    />
                  </motion.div>
                </div>
              </div>

              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-24 h-24 bg-[#4B2C20]/5 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={40} className="text-[#4B2C20]/20" />
                  </div>
                  <h3 className="font-bebas text-2xl text-[#4B2C20] mb-2">YOUR BOX IS EMPTY</h3>
                  <p className="text-sm text-[#4B2C20]/60 mb-8 max-w-[200px]">Don't let your gains fade away. Fuel up now.</p>
                  <Link href="/#bestsellers" onClick={closeCart}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#800020] text-white px-8 py-3 rounded-full font-bold text-sm tracking-widest shadow-xl shadow-[#800020]/20"
                    >
                      BROWSE BARS
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.packSize}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group bg-white rounded-[1.5rem] p-4 flex gap-4 border border-transparent hover:border-[#DAA520]/20 transition-all hover:shadow-xl hover:shadow-[#4B2C20]/5"
                    >
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-[#FDF5E6]">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-[#4B2C20] leading-tight">{item.product.name}</h4>
                            <p className="text-[10px] font-mono text-[#DAA520] font-bold uppercase mt-1">
                              {item.packSize} • {item.product.protein}
                            </p>
                          </div>
                          <button 
                            onClick={() => removeItem(item.product.id)}
                            className="text-[#4B2C20]/20 hover:text-[#800020] transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center space-x-4 bg-[#FDF5E6] px-3 py-1.5 rounded-full border border-[#4B2C20]/5">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="hover:scale-125 transition-transform"><Minus size={12} /></button>
                            <span className="font-mono text-xs font-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="hover:scale-125 transition-transform"><Plus size={12} /></button>
                          </div>
                          <p className="font-bold text-[#800020]">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary: Fixed Bottom */}
            {items.length > 0 && (
              <div className="p-8 bg-white rounded-t-[3rem] shadow-[0_-20px_40px_rgba(75,44,32,0.05)] border-t border-[#4B2C20]/5 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-[#4B2C20]/40 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-[#4B2C20]/40 uppercase tracking-widest">
                    <span>Shipping</span>
                    <span className="text-[#DAA520]">{total >= freeShippingThreshold ? 'FREE' : 'Calculated at Step 2'}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bebas text-3xl text-[#4B2C20]">TOTAL</span>
                    <span className="font-bebas text-4xl text-[#800020]">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#DAA520] text-white py-5 rounded-full font-bebas text-2xl tracking-widest flex items-center justify-center space-x-3 shadow-lg shadow-[#DAA520]/20 hover:bg-[#800020] transition-colors"
                  >
                    <span>CHECKOUT NOW</span>
                    <ArrowRight size={24} />
                  </motion.button>
                </Link>

                <div className="flex justify-center items-center gap-2 opacity-30">
                  <ShieldCheck size={14} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-tighter">Secure 256-bit SSL Encryption</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}