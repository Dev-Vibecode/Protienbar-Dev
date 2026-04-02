'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postal: '',
    country: 'United States',
  });

  const total = getTotal();
  const shipping = total >= 80 ? 0 : 8;
  const finalTotal = total + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      alert('Order placed! (This is a demo)');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const steps = ['Contact', 'Shipping', 'Payment'];

  return (
    <div className="min-h-screen bg-offwhite">
      <div className="bg-white border-b border-softpink py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <Link href="/" className="font-bebas text-purple text-3xl tracking-wider">
            FUELBAR
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 py-8 sm:py-12">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step > index + 1
                      ? 'bg-green-500 text-white'
                      : step === index + 1
                      ? 'bg-purple text-white'
                      : 'bg-gray-200 text-gray-500'
                  } font-bold`}
                >
                  {step > index + 1 ? <Check size={20} /> : index + 1}
                </div>
                <span
                  className={`ml-2 hidden sm:inline ${
                    step === index + 1 ? 'text-purple font-bold' : 'text-gray-500'
                  }`}
                >
                  {stepName}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-12 sm:w-20 h-0.5 bg-gray-200 mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 space-y-6"
                >
                  <h2 className="font-bebas text-purple text-3xl tracking-wide">
                    Contact Information
                  </h2>
                  <div>
                    <label className="block text-sm font-bold text-purple mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
                      placeholder="you@email.com"
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 space-y-6"
                >
                  <h2 className="font-bebas text-purple text-3xl tracking-wide">
                    Shipping Address
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-purple mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-purple mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-purple mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-purple mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-purple mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postal"
                        value={formData.postal}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 space-y-6"
                >
                  <h2 className="font-bebas text-purple text-3xl tracking-wide">
                    Payment
                  </h2>
                  <div className="bg-yellow/20 border border-yellow rounded-xl p-4">
                    <p className="text-sm font-bold text-center">
                      This is a demo. No real payment will be processed.
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="flex gap-4">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 border-2 border-purple text-purple rounded-full py-4 font-bold hover:bg-purple hover:text-white transition-colors"
                  >
                    BACK
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 bg-yellow text-dark rounded-full py-4 font-bold hover:bg-purple hover:text-white transition-colors"
                >
                  {step === 3 ? 'PLACE ORDER' : 'CONTINUE'}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 sm:p-8 space-y-6 sticky top-24">
              <h3 className="font-bebas text-purple text-2xl tracking-wide">
                Order Summary
              </h3>

              <div className="space-y-4">
                {items.map((item) => {
                  const packMultiplier =
                    item.packSize === '6-pack' ? 6 : item.packSize === '12-pack' ? 12 : 1;
                  const discount =
                    item.packSize === '6-pack' ? 0.9 : item.packSize === '12-pack' ? 0.82 : 1;
                  const itemPrice = item.product.price * packMultiplier * discount;

                  return (
                    <div key={`${item.product.id}-${item.packSize}`} className="flex gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-contain p-2"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-bold text-sm">{item.product.name}</h4>
                            <p className="text-xs text-gray-500">
                              {item.packSize} × {item.quantity}
                            </p>
                          </div>
                          <span className="font-bold text-brown">
                            ${(itemPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className={`font-bold ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-purple">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <Lock size={14} />
                <span className="font-mono text-xs">Secure checkout • SSL encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
