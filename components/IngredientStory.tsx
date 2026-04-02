'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export default function IngredientStory() {
  const ingredients = [
    { emoji: '🌴', name: 'DATES', origin: 'Gujarat, India' },
    { emoji: '🍫', name: 'DARK COCOA', origin: 'Ecuador' },
    { emoji: '🥜', name: 'ALMONDS', origin: 'California' },
    { emoji: '🐄', name: 'WHEY PROTEIN', origin: 'NZ Grass-Fed' },
    { emoji: '🧂', name: 'SEA SALT', origin: 'Himalayan' }
  ];

  const goodList = [
    'Real Whey Protein',
    'Organic Dates',
    'Raw Nuts & Seeds',
    'Pure Cocoa',
    'Himalayan Sea Salt'
  ];

  const badList = [
    'Maltodextrin',
    'Sucralose',
    'Palm Oil',
    'Artificial Colors',
    'Preservatives'
  ];

  return (
    <section id="ingredients" className="py-16 sm:py-24 bg-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="font-bebas text-white text-5xl sm:text-6xl lg:text-8xl tracking-wider">
            ONLY REAL THINGS INSIDE
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.name}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="glassmorphism p-6 text-center min-w-[140px]"
            >
              <div className="text-5xl mb-3">{ingredient.emoji}</div>
              <h3 className="font-bebas text-white text-xl tracking-wide mb-1">
                {ingredient.name}
              </h3>
              <p className="text-white/60 text-xs font-mono">
                {ingredient.origin}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glassmorphism p-6 sm:p-8"
          >
            <h3 className="font-bebas text-green-400 text-2xl sm:text-3xl mb-6 tracking-wide">
              WHAT WE PUT IN
            </h3>
            <ul className="space-y-3">
              {goodList.map((item) => (
                <li key={item} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="text-green-400" size={16} />
                  </div>
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glassmorphism p-6 sm:p-8"
          >
            <h3 className="font-bebas text-red-400 text-2xl sm:text-3xl mb-6 tracking-wide">
              WHAT WE LEAVE OUT
            </h3>
            <ul className="space-y-3">
              {badList.map((item) => (
                <li key={item} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                    <X className="text-red-400" size={16} />
                  </div>
                  <span className="text-white/90 line-through opacity-60">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
