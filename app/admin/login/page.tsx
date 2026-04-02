'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@fuelbar.com' && password === 'Fuel@123') {
      localStorage.setItem('adminAuth', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glassmorphism max-w-md w-full p-8 space-y-6"
      >
        <div className="text-center space-y-2">
          <h1 className="font-bebas text-white text-5xl tracking-wider">
            FUELBAR
          </h1>
          <p className="text-white/60 font-mono text-sm">ADMIN PORTAL</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow/50"
              placeholder="admin@fuelbar.com"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow/50"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-xl text-sm">
              {error}
            </div>
          )}

          <motion.button
            type="submit"
            className="w-full bg-yellow text-dark rounded-full py-3 font-bold hover:bg-white transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            LOGIN
          </motion.button>
        </form>

        <div className="flex items-center justify-center space-x-2 text-white/40 text-xs font-mono">
          <Lock size={12} />
          <span>Secure admin access</span>
        </div>

        <div className="text-center text-white/40 text-xs">
          Demo credentials: admin@fuelbar.com / Fuel@123
        </div>
      </motion.div>
    </div>
  );
}
