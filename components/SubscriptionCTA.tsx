'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function SubscriptionCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="subscribe" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple via-pink to-yellow"
           style={{ backgroundImage: 'linear-gradient(135deg, #640184 0%, #D9298E 50%, #F1EA03 100%)' }} />
      <div className="grain-texture" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6 sm:space-y-8"
        >
          <h2 className="font-bebas text-white text-5xl sm:text-7xl lg:text-9xl tracking-wider leading-none">
            NEVER RUN OUT AGAIN
          </h2>

          <p className="text-white text-lg sm:text-xl max-w-2xl mx-auto">
            Subscribe & save 15%. Pause or cancel anytime.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-white/20 border border-white/30 text-white placeholder-white/60 rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              />
              <motion.button
                type="submit"
                className="bg-yellow text-dark rounded-full px-8 py-4 font-bold tracking-wide hover:bg-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {submitted ? '✓ SUBSCRIBED!' : 'GET MY DISCOUNT →'}
              </motion.button>
            </div>
          </form>

          <div className="flex items-center justify-center space-x-2 text-white/50 font-mono text-sm">
            <Lock size={14} />
            <span>No spam. No BS. Just protein.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
