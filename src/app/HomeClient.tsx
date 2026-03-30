"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Globe, DollarSign, Sparkles, MessageSquare, Star } from "lucide-react";

export default function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-gold mb-4" />,
      title: "Worldwide Delivery",
      description: "We ship to any country, fast and secure",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-gold mb-4" />,
      title: "Wholesale Pricing",
      description: "Best bulk prices for business owners",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-gold mb-4" />,
      title: "Premium Quality",
      description: "Only the finest luxury hair textures",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-gold mb-4" />,
      title: "Fast Response",
      description: "Quick replies via WhatsApp & Instagram",
    },
  ];

  const categories = [
    { name: "Straight", image: "https://placehold.co/400x500/1a1a1a/3a3a3a?text=Straight" },
    { name: "Body Wave", image: "https://placehold.co/400x500/2a2a2a/4a4a4a?text=Body+Wave" },
    { name: "Deep Wave", image: "https://placehold.co/400x500/3a3a3a/5a5a5a?text=Deep+Wave" },
    { name: "Curly", image: "https://placehold.co/400x500/4a4a4a/6a6a6a?text=Curly" },
    { name: "Kinky", image: "https://placehold.co/400x500/5a5a5a/7a7a7a?text=Kinky" },
    { name: "Closure & Frontals", image: "https://placehold.co/400x500/6a6a6a/8a8a8a?text=Closures" },
  ];

  const testimonials = [
    {
      text: "Sheedah's hair is absolutely premium. I've been a loyal customer for 2 years!",
      author: "Amaka T., Abuja"
    },
    {
      text: "Best wholesale supplier in Lagos. Fast delivery and great prices every time.",
      author: "Beauty by Zara, Port Harcourt"
    },
    {
      text: "I ordered from the UK and got my package in 5 days. Incredible service!",
      author: "Titi M., London"
    }
  ];

  const instagramPosts = [
    "https://placehold.co/400x400/2a2a2a/3a3a3a?text=Insta+1",
    "https://placehold.co/400x400/3a3a3a/4a4a4a?text=Insta+2",
    "https://placehold.co/400x400/4a4a4a/5a5a5a?text=Insta+3",
    "https://placehold.co/400x400/5a5a5a/6a6a6a?text=Insta+4",
    "https://placehold.co/400x400/6a6a6a/7a7a7a?text=Insta+5",
    "https://placehold.co/400x400/7a7a7a/8a8a8a?text=Insta+6"
  ];

  return (
    <div className="flex flex-col w-full -mt-20">
      {/* Section 1 — Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-20 bg-black overflow-hidden">
        {/* Background Image Container */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://placehold.co/1920x1080/111111/222222?text=Luxury+Hair+Placeholder')" }}
        />
        
        {/* Dark Overlay (#0A0A0A at 70% opacity) */}
        <div className="absolute inset-0 z-0 bg-[#0A0A0A]/70" />

        {/* Hero Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto w-full mb-10"
        >
          <motion.span 
            variants={itemVariants}
            className="text-gold font-sans font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm mb-6 block"
          >
            Wholesale & Retail Hair Supplier
          </motion.span>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-cream mb-6 leading-[1.1]"
          >
            Luxury Hair,<br className="hidden sm:block" /> Delivered Worldwide
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-cream/80 font-sans max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Premium quality hair shipped from Lagos, Nigeria to anywhere in the world.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link 
              href="/catalog"
              className="w-full sm:w-auto px-10 py-4 bg-gold text-black font-semibold tracking-wide uppercase text-sm rounded-sm hover:bg-gold/90 transition-all shadow-lg text-center"
            >
              Shop Now
            </Link>
            <a 
              href="https://wa.me/2347030599735"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 border border-cream text-cream font-semibold tracking-wide uppercase text-sm rounded-sm hover:bg-cream hover:text-black transition-all text-center"
            >
              WhatsApp Us
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2 — Why Choose Us */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-cream text-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-black inline-block relative border-b-2 border-gold pb-2">
              Why Women Trust Sheedah&apos;s
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" as const }}
                className="bg-cream border border-gold/15 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="p-4 bg-gold/5 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">{feature.title}</h3>
                <p className="text-black/70 font-sans leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Shop by Category */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-cream relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-bold text-cream inline-block relative border-b-2 border-gold pb-2"
            >
              Shop by Category
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((category, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg aspect-[4/5] block cursor-pointer"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${category.image}')` }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-gold/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-3xl font-heading font-bold text-cream mb-4 drop-shadow-md">{category.name}</h3>
                  <Link 
                    href="/catalog"
                    className="px-6 py-3 border border-cream text-cream font-sans uppercase tracking-[0.2em] text-xs rounded-sm hover:bg-cream hover:text-black transition-all shadow-sm"
                  >
                    Shop Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-cream text-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-bold text-black inline-block relative border-b-2 border-gold pb-2"
            >
              What Our Customers Say
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white p-10 rounded-xl shadow-sm border border-gold/10 relative flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-gold mb-6 relative">
                  <span className="text-6xl absolute -top-4 -left-6 opacity-30 font-heading">&quot;</span>
                  <div className="flex gap-1 justify-center z-10 relative">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-gold text-gold" />
                    ))}
                  </div>
                </div>
                <p className="text-black/80 font-sans italic mb-8 flex-grow leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>
                <p className="font-heading font-bold text-lg text-black tracking-wide">
                  — {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Instagram Section */}
      <section className="pt-24 pb-16 bg-cream border-t border-gold/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-bold text-black inline-block relative border-b-2 border-gold pb-2 mb-4"
            >
              Follow Our Latest Styles
            </motion.h2>
            <p className="text-black/60 font-sans mt-2">
              Join our community and get inspired for your next look.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 w-full">
          {instagramPosts.map((post, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group aspect-square relative cursor-pointer overflow-hidden"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${post}')` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-gold/60 transition-colors duration-300 flex items-center justify-center">
                <span className="text-transparent group-hover:text-black font-sans font-bold tracking-widest uppercase transition-colors duration-300 shadow-sm">
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16 pb-8">
          <a
            href="https://www.instagram.com/sheedahsbeautyworld2/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-gold text-black font-semibold uppercase tracking-widest text-sm rounded-sm hover:bg-black hover:text-gold transition-colors shadow-lg"
          >
            @sheedahsbeautyworld2
          </a>
        </div>
      </section>
    </div>
  );
}
