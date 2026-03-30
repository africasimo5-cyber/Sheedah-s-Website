"use client";

import { motion } from "framer-motion";
import { Users, Heart, Globe, MapPin } from "lucide-react";

export default function About() {
  const stats = [
    { value: "45K+", label: "Instagram Followers", icon: <Users className="w-6 h-6 text-gold mb-3" /> },
    { value: "13K+", label: "Orders Delivered", icon: <Heart className="w-6 h-6 text-gold mb-3" /> },
    { value: "Worldwide", label: "Global Delivery", icon: <Globe className="w-6 h-6 text-gold mb-3" /> },
    { value: "Lagos", label: "Established In", icon: <MapPin className="w-6 h-6 text-gold mb-3" /> }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Section 1 — Hero */}
      <section className="bg-black pt-32 pb-24 px-4 text-center border-b border-gold/20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-heading font-bold text-cream mb-6"
        >
          Meet <span className="text-gold italic">Sheedah</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-cream/80 font-sans text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          The woman behind Lagos&apos; most trusted luxury hair brand.
        </motion.p>
      </section>

      {/* Section 2 — Story */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-[5/6] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://placehold.co/500x600/1a1a1a/2a2a2a?text=Kareem+Rasheedat')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-6 text-black/80 font-sans leading-relaxed text-lg"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-black mb-8 border-b-2 border-gold pb-2 inline-block">
              Our Origin Story
            </h2>
            <p>
              Founded by Kareem Rasheedat, Sheedah&apos;s Beauty World began with a singular, uncompromising vision: to bring authentic, shed-free, and tangle-free luxury hair to women who value premium quality without the outrageous markups. What started as a small personal supply operation quickly transformed into a nationwide phenomenon.
            </p>
            <p>
              Through a commitment to rigorous curation and sourcing directly from top-tier international human hair donors, Kareem built an incredibly loyal community. That dedication to excellence has grown the brand to over 45,000 active followers and thousands of satisfied clients across the globe. We aren&apos;t just selling hair; we are building confidence.
            </p>
            <p>
              Today, Sheedah&apos;s is recognized not just as a retail destination, but as a trusted wholesale partner for hundreds of salon owners and beauty entrepreneurs worldwide. We believe that every woman deserves access to breathtaking, long-lasting hair that makes her feel unstoppable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 3 — Stats Row */}
      <section className="py-16 bg-black border-y border-gold/20 relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-y md:divide-y-0 divide-gold/20">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col items-center text-center p-4 ${index > 1 ? 'pt-8 md:pt-4' : ''} ${index === 1 || index === 3 ? 'border-t border-gold/20 md:border-t-0' : ''}`}
              >
                {stat.icon}
                <span className="text-3xl lg:text-4xl font-heading font-bold text-cream mb-2">{stat.value}</span>
                <span className="text-gold font-sans uppercase tracking-widest text-xs font-semibold">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Mission */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-cream text-center flex flex-col items-center justify-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <span className="text-8xl absolute -top-10 -left-6 md:-left-12 opacity-20 text-gold font-heading leading-none">&quot;</span>
          <p className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-black leading-tight italic z-10 relative">
            My mission is to make every woman feel confident and beautiful, no matter where she is in the world.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
