'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal, getItemCount } = useCartStore();

  const total = getTotal();
  const itemCount = getItemCount();
  const freeShippingThreshold = 80;
  const shippingProgress = Math.min((total / freeShippingThreshold) * 100, 100);
  const amountToFreeShipping = Math.max(freeShippingThreshold - total, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-offwhite z-50 shadow-2xl overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bebas text-purple text-3xl tracking-wide">
                  YOUR BOX 🎒
                </h2>
                <button
                  onClick={closeCart}
                  className="p-2 hover:bg-white rounded-full transition-colors"
                >
                  <X className="text-purple" size={24} />
                </button>
              </div>

              {shippingProgress < 100 ? (
                <div className="bg-white rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-purple">
                      Add ${amountToFreeShipping.toFixed(2)} for FREE shipping 🚀
                    </span>
                  </div>
                  <div className="w-full bg-softpink rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-pink h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${shippingProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-green-100 rounded-2xl p-4 text-center">
                  <span className="font-bold text-green-700">
                    🎉 You unlocked free shipping!
                  </span>
                </div>
              )}

              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <ShoppingBag size={64} className="text-gray-300" />
                  <p className="text-gray-500 text-center">
                    Your box is empty. That's a crime. 🍫
                  </p>
                  <Link href="/#bestsellers">
                    <motion.button
                      onClick={closeCart}
                      className="bg-yellow text-dark rounded-full px-6 py-3 font-bold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      SHOP NOW
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {items.map((item) => {
                      const packMultiplier =
                        item.packSize === '6-pack' ? 6 : item.packSize === '12-pack' ? 12 : 1;
                      const discount =
                        item.packSize === '6-pack' ? 0.9 : item.packSize === '12-pack' ? 0.82 : 1;
                      const itemPrice = item.product.price * packMultiplier * discount;

                      return (
                        <motion.div
                          key={`${item.product.id}-${item.packSize}`}
                          layout
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="bg-white rounded-2xl p-4 flex gap-4"
                        >
                          <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-contain p-2"
                              sizes="80px"
                            />
                          </div>

                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-bold text-purple">
                                  {item.product.name}
                                </h3>
                                <p className="text-xs text-gray-500">
                                  {item.packSize} · {item.product.protein}
                                </p>
                              </div>
                              <button
                                onClick={() => removeItem(item.product.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <X size={18} />
                              </button>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 bg-offwhite rounded-full">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="p-1 hover:bg-white rounded-full transition-colors"
                                >
                                  <Minus size={14} className="text-purple" />
                                </button>
                                <span className="font-mono text-sm font-bold w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="p-1 hover:bg-white rounded-full transition-colors"
                                >
                                  <Plus size={14} className="text-purple" />
                                </button>
                              </div>
                              <span className="font-bold text-brown">
                                ${(itemPrice * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="bg-white rounded-2xl p-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-bold">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-bold text-green-600">
                        {total >= freeShippingThreshold ? 'FREE' : 'Calculated at checkout'}
                      </span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-2xl text-purple">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <motion.button
                      onClick={closeCart}
                      className="w-full bg-yellow text-dark rounded-full py-4 font-bebas text-xl tracking-wide hover:bg-purple hover:text-white transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      CHECKOUT (${total.toFixed(2)})
                    </motion.button>
                  </Link>

                  <div className="text-center text-sm text-gray-500 space-y-1">
                    <div className="flex items-center justify-center space-x-2">
                      <span>🔒</span>
                      <span className="font-mono text-xs">Secure checkout • SSL encrypted</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
