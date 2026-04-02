'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Lock, Sparkles, ArrowRight, Mail } from 'lucide-react';
import { useRef } from 'react';

export default function SubscriptionCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section ref={containerRef} id="subscribe" className="relative py-24 sm:py-32 bg-[#FDF5E6] overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative grid lg:grid-cols-5 gap-0 bg-[#4B2C20] rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(75,44,32,0.3)]"
        >
          {/* LEFT COLUMN: Visual & Impact (3/5 width) */}
          <div className="lg:col-span-3 relative p-8 sm:p-16 flex flex-col justify-center overflow-hidden">
            {/* The Requested Gradient - Enhanced with Parallax Orbs */}
            <div 
              className="absolute inset-0 opacity-60"
              style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #800020 0%, #4B2C20 100%)' }} 
            />
            <div className="grain-texture absolute inset-0 opacity-20 pointer-events-none" />
            
            {/* Floating UI Elements for UX Depth */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 w-24 h-24 bg-[#DAA520]/20 rounded-full blur-2xl"
            />

            <div className="relative z-10 space-y-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="flex items-center gap-2 text-[#DAA520] font-mono text-xs font-black uppercase tracking-[0.3em]"
              >
                <Sparkles size={14} className="animate-pulse" />
                The Fuel Club 2026
              </motion.div>

              <h2 className="font-bebas text-[#FDF5E6] text-6xl sm:text-8xl lg:text-9xl tracking-tighter leading-[0.85]">
                NEVER RUN <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '2px #DAA520' }}>OUT AGAIN</span>
              </h2>

              <p className="text-[#FDF5E6]/60 text-lg max-w-md font-medium leading-relaxed">
                Join 10k+ athletes. Get fresh bars delivered monthly. 
                <span className="text-[#FDF5E6] block">Save 15% forever. Cancel anytime.</span>
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Action & Form (2/5 width) */}
          <div className="lg:col-span-2 bg-[#FDF5E6]/5 backdrop-blur-xl p-8 sm:p-16 flex flex-col justify-center border-l border-white/5">
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <h3 className="font-bebas text-3xl text-[#FDF5E6] tracking-wide">SECURE YOUR SLOT</h3>
                <div className="h-1 w-12 bg-[#DAA520] rounded-full" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="group relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FDF5E6]/30 group-focus-within:text-[#DAA520] transition-colors" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-white/5 border border-white/10 text-[#FDF5E6] placeholder-[#FDF5E6]/20 rounded-2xl pl-14 pr-6 py-5 focus:outline-none focus:ring-2 focus:ring-[#DAA520]/50 focus:bg-white/10 transition-all text-lg font-medium"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={submitted}
                  className={`w-full relative overflow-hidden group py-5 rounded-2xl font-bebas text-2xl tracking-widest transition-all ${
                    submitted ? 'bg-green-600' : 'bg-[#DAA520] hover:bg-[#800020]'
                  } text-white shadow-xl shadow-black/20`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {submitted ? 'WELCOME TO THE CLUB' : 'GET MY 15% OFF'}
                    {!submitted && <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />}
                  </span>
                </motion.button>
              </form>

              <div className="flex items-start gap-3 p-4 bg-black/20 rounded-2xl">
                <Lock size={16} className="text-[#DAA520] mt-1 shrink-0" />
                <p className="text-[10px] font-mono text-[#FDF5E6]/40 leading-relaxed uppercase font-bold tracking-tight">
                  Encrypted checkout. No hidden fees. <br /> unsubscribe in one click.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden whitespace-nowrap opacity-[0.02] pointer-events-none select-none">
        <span className="text-[20vw] font-bebas leading-none text-[#4B2C20]">SUBSCRIBE • SAVE • REPEAT • </span>
      </div>
    </section>
  );
}