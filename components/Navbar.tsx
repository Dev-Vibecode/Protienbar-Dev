'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Heart, ShoppingCart, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/lib/cartStore';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F1EBDC]/80 backdrop-blur-md border-b border-[#FFB4C1] shadow-sm'
            : 'bg-[#F1EBDC]/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="w-8 h-8 bg-purple rounded-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <span className="font-bebas text-purple text-2xl sm:text-3xl tracking-wider">
                FUELBAR
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-sans font-medium text-purple hover:text-pink transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                className="p-2 text-purple hover:text-pink transition-colors hidden sm:block"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                className="p-2 text-purple hover:text-pink transition-colors hidden sm:block"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </button>
              <Link
                href="/admin/login"
                className="p-2 text-purple hover:text-pink transition-colors hidden sm:block"
                aria-label="Admin Login"
              >
                <User size={20} />
              </Link>
              <button
                onClick={openCart}
                className="relative p-2 text-purple hover:text-pink transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-yellow text-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center font-mono"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-purple hover:text-pink transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-dark md:hidden"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ staggerChildren: 0.1 }}
              className="flex flex-col items-center justify-center h-full space-y-8"
            >
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
                    className="font-bebas text-white text-5xl tracking-wider hover:text-yellow transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
