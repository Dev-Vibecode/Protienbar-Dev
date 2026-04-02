'use client';

import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerLinks = {
    Shop: [
      { name: 'All Products', href: '/#bestsellers' },
      { name: 'Build Your Box', href: '/#build-box' },
      { name: 'Subscriptions', href: '/#subscribe' },
      { name: 'Gift Cards', href: '#' }
    ],
    Learn: [
      { name: 'Our Story', href: '#' },
      { name: 'Ingredients', href: '/#ingredients' },
      { name: 'Nutrition', href: '#' },
      { name: 'Blog', href: '#' }
    ],
    Help: [
      { name: 'FAQs', href: '#' },
      { name: 'Shipping', href: '#' },
      { name: 'Returns', href: '#' },
      { name: 'Contact', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' }
  ];

  return (
    <footer className="bg-dark text-white/60 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="font-bebas text-white text-4xl tracking-wider">
                FUELBAR
              </h2>
              <p className="text-sm max-w-xs">
                Made with obsession. Not additives.
              </p>
              <p className="font-mono text-xs text-white/40">
                Real protein. Zero nonsense. 5 ingredients only.
              </p>
            </motion.div>
          </div>

          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-sans font-bold text-white mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-pink transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm font-mono">
            © 2025 FUELBAR. Made with obsession. Not additives.
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-sans font-bold text-white">
              Follow Us
            </span>
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-pink transition-colors duration-200"
                  aria-label={social.name}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
