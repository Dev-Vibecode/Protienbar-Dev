'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Heart, ShoppingCart, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/cartStore';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false); // Fix for hydration
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    setMounted(true); // Component has mounted on client
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', href: '/#bestsellers' },
    { name: 'Flavours', href: '/#flavors' },
    { name: 'Build Box', href: '/#build-box' },
    { name: 'About', href: '/#about' }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        // Updated colors to Millet Cream (#FDF5E6) and Maroon (#800020)
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FDF5E6]/90 backdrop-blur-md border-b border-[#800020]/10 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="w-8 h-8 bg-[#800020] rounded-lg" // Brand Maroon
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <span className="font-bebas text-[#800020] text-2xl sm:text-3xl tracking-wider">
                 Nutri Bar
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-sans font-bold text-[#4B2C20] hover:text-[#800020] transition-colors duration-200 uppercase text-sm tracking-widest"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <button className="p-2 text-[#4B2C20] hover:text-[#800020] transition-colors hidden sm:block">
                <Search size={20} />
              </button>
              <Link href="/admin/login" className="p-2 text-[#4B2C20] hover:text-[#800020] transition-colors hidden sm:block">
                <User size={20} />
              </Link>
              <button
                onClick={openCart}
                className="relative p-2 text-[#4B2C20] hover:text-[#800020] transition-colors"
              >
                <ShoppingCart size={20} />
                {/* Fixed Hydration Logic: only show itemCount if mounted */}
                {mounted && itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-[#DAA520] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center font-mono shadow-sm"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#800020]"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu updated to Rich Chocolate Background */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#4B2C20] md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-bebas text-[#FDF5E6] text-5xl tracking-wider hover:text-[#DAA520] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}