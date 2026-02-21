'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Truck, Route, Fuel } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { value: '220+', label: 'Active Vehicles', icon: Truck },
  { value: '98%', label: 'On-Time Rate', icon: Route },
  { value: '₹2.4L', label: 'Monthly Saved', icon: Fuel },
];

const wordAnimation = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const letterAnimation = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export default function Hero() {
  const headlineWords = ['Manage', 'Your', 'Entire', 'Fleet,'];
  const accentWord = 'Effortlessly.';

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Subtle radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(240,101,34,0.04)_0%,_transparent_70%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="container mx-auto px-6 pt-24 pb-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-primary text-sm font-semibold mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Built for the Odoo Hackathon
          </motion.div>

          {/* Animated Headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.08] tracking-tight mb-6"
            variants={wordAnimation}
            initial="hidden"
            animate="visible"
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                variants={letterAnimation}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span
              variants={letterAnimation}
              className="inline-block text-primary"
            >
              {accentWord}
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-500 leading-relaxed mb-12 max-w-2xl"
          >
            A centralized platform to register vehicles, dispatch trips,
            track maintenance, monitor driver safety, and analyze costs — all in one place.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="/login"
              className="btn-primary flex items-center gap-2 px-8 py-3.5 text-base font-bold"
            >
              Get Started <ArrowRight size={18} />
            </Link>
            <Link
              href="#features"
              className="btn-secondary flex items-center gap-2 px-8 py-3.5 text-base font-bold"
            >
              <span className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                <span className="w-0 h-0 border-l-[5px] border-l-primary border-y-[3px] border-y-transparent ml-0.5" />
              </span>
              View Modules
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-10"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-primary">
                  <stat.icon size={20} />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-extrabold text-gray-900 leading-none">{stat.value}</div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
