'use client';

import Link from 'next/link';
import { Instagram, Youtube, Twitter, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const footerLinks = {
    Explore: [
      { name: 'All Products', href: '/#bestsellers' },
      { name: 'Build Your Box', href: '/#build-box' },
      { name: 'Subscriptions', href: '/#subscribe' },
      { name: 'Gift Cards', href: '#' }
    ],
    Company: [
      { name: 'Our Story', href: '#' },
      { name: 'Ingredients', href: '/#ingredients' },
      { name: 'Nutrition', href: '#' },
      { name: 'Sustainability', href: '#' }
    ],
    Support: [
      { name: 'FAQs', href: '#' },
      { name: 'Shipping', href: '#' },
      { name: 'Returns', href: '#' },
      { name: 'Contact', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' }
  ];

  return (
    <footer className="relative bg-[#4B2C20] pt-24 pb-12 overflow-hidden">
      {/* Editorial Ghost Text */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden whitespace-nowrap opacity-[0.03] pointer-events-none select-none">
        <span className="text-[15vw] font-bebas leading-none text-[#FDF5E6]">
          REAL PROTEIN • ZERO NONSENSE • REAL PROTEIN • 
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Pillar */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-bebas text-[#FDF5E6] text-6xl tracking-wider leading-none">
                NUTRI <br /> <span className="text-[#DAA520]">BAR.</span>
              </h2>
              <p className="text-[#FDF5E6]/60 text-lg max-w-sm leading-relaxed">
                We make protein bars for people who actually read labels. No chemicals, no filler, just fuel.
              </p>
              
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ y: -5, color: '#DAA520' }}
                      className="p-3 bg-white/5 border border-white/10 rounded-xl text-[#FDF5E6]/60 transition-colors"
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Quick Links Pillar */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([category, links], index) => (
              <div key={category} className="space-y-6">
                <h3 className="font-mono text-[10px] font-black text-[#DAA520] uppercase tracking-[0.3em]">
                  {category}
                </h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-1 text-[#FDF5E6]/60 hover:text-[#FDF5E6] text-sm transition-all"
                      >
                        {link.name}
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Location/Quick Contact Pillar */}
          <div className="lg:col-span-3 space-y-6">
             <h3 className="font-mono text-[10px] font-black text-[#DAA520] uppercase tracking-[0.3em]">
                Headquarters
              </h3>
              <div className="space-y-2 text-[#FDF5E6]/60 text-sm">
                <p>CloudInteract-Dev Lane</p>
                <p>Bengaluru, KA 560001</p>
                <p className="pt-4 text-[#FDF5E6] font-bold underline cursor-pointer hover:text-[#DAA520] transition-colors">
                  hello@nutribar.com
                </p>
              </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-mono font-bold text-[#FDF5E6]/30 uppercase tracking-widest">
            <span>© 2026 Nutri Bar Global</span>
            <Link href="#" className="hover:text-[#DAA520]">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#DAA520]">Terms of Service</Link>
            <Link href="#" className="hover:text-[#DAA520]">Accessibility</Link>
          </div>

          <motion.div 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="text-[10px] font-mono text-[#FDF5E6]/40 uppercase font-bold tracking-widest">
              Systems Operational
            </span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}