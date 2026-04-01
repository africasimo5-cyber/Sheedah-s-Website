"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Globe, DollarSign, Sparkles, MessageSquare, Star } from "lucide-react";

type HomeCategory = {
  name: string;
  image: string;
};

type Testimonial = {
  text: string;
  author: string;
};

type HomeClientProps = {
  categories: HomeCategory[];
  testimonials: Testimonial[];
};

export default function Home({ categories, testimonials }: HomeClientProps) {
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
      icon: <Globe className="w-8 h-8 text-primary mb-4" />,
      title: "Worldwide Delivery",
      description: "We ship to any country, fast and secure",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-primary mb-4" />,
      title: "Wholesale Pricing",
      description: "Best bulk prices for business owners",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary mb-4" />,
      title: "Premium Quality",
      description: "Only the finest luxury hair textures",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-primary mb-4" />,
      title: "Fast Response",
      description: "Quick replies via WhatsApp & Instagram",
    },
  ];

  const instagramPosts = [
    "/wigs/curly-hair-2.jpg",
    "/wigs/straight-hair-2.jpg",
    "/wigs/body-wave-2.jpg",
    "/wigs/straight-hair-3.jpg",
    "/wigs/curly-hair-1.jpg",
    "/wigs/body-wave-3.jpg"
  ];

  return (
    <div className="flex flex-col w-full -mt-20">
      {/* Section 1 — Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen pt-20 bg-dark overflow-hidden">
        {/* Background Image Container with Gradient Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/wigs/straight-hair-1.jpg')" }}
        />

        {/* Teal Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-dark to-[#0d3533] opacity-90" />

        {/* Hero Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto w-full mb-10"
        >
          <motion.span
            variants={itemVariants}
            className="text-secondary font-sans font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm mb-6 block"
          >
            Wholesale & Retail Hair Supplier
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 leading-[1.1]"
          >
            Luxury Hair,<br className="hidden sm:block" /> Delivered Worldwide
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[#E0E0E0] font-sans max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Premium quality hair shipped from Lagos, Nigeria to anywhere in the world.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/catalog"
              className="w-full sm:w-auto px-10 py-4 bg-primary text-white font-semibold tracking-wide uppercase text-sm rounded-sm hover:bg-[#228e89] transition-all shadow-lg text-center"
            >
              Shop Now
            </Link>
            <a
              href="https://wa.me/2347030599735"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 border-2 border-secondary text-secondary font-semibold tracking-wide uppercase text-sm rounded-sm hover:bg-secondary hover:text-white transition-all text-center"
            >
              WhatsApp Us
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2 — Why Choose Us */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-lightbg text-dark relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary inline-block relative border-b-4 border-secondary pb-2">
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
                className="bg-white border-t-4 border-primary p-8 rounded-xl shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(42,173,168,0.3)] transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="p-4 bg-primary/10 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-heading font-bold mb-3 text-dark">{feature.title}</h3>
                <p className="text-[#555555] font-sans leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Shop by Category */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white text-dark relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-bold text-dark inline-block relative border-b-4 border-secondary pb-2"
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
                <div className="absolute inset-0 bg-dark/20 group-hover:bg-primary/80 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Link
                    href="/catalog"
                    className="px-6 py-3 border-2 border-white text-white font-sans uppercase tracking-[0.2em] text-xs font-bold rounded-sm hover:bg-white hover:text-primary transition-all shadow-sm"
                  >
                    Shop Now
                  </Link>
                </div>
                <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none group-hover:hidden transition-all">
                  <h3 className="text-3xl font-heading font-bold text-primary drop-shadow-lg">{category.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary text-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-bold text-white inline-block relative border-b-4 border-secondary pb-2"
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
                className="bg-white p-10 rounded-xl shadow-sm border border-secondary/10 relative flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-secondary mb-6 relative">
                  <span className="text-6xl absolute -top-4 -left-6 opacity-30 font-heading">&quot;</span>
                  <div className="flex gap-1 justify-center z-10 relative">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                </div>
                <p className="text-dark font-sans italic mb-8 flex-grow leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>
                <p className="font-heading font-bold text-lg text-primary tracking-wide">
                  — {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 — Instagram Section */}
      <section className="pt-24 pb-16 bg-lightbg border-t border-primary/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-bold text-dark inline-block relative border-b-4 border-secondary pb-2 mb-4"
            >
              Follow Our Latest Styles
            </motion.h2>
            <p className="text-[#555555] font-sans mt-2">
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
              <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/70 transition-colors duration-300 flex items-center justify-center">
                <span className="text-transparent group-hover:text-white font-sans font-bold tracking-widest uppercase transition-colors duration-300 shadow-sm">
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
            className="inline-block px-10 py-4 bg-secondary text-white font-semibold uppercase tracking-widest text-sm rounded-sm hover:bg-[#c9126a] transition-colors shadow-lg"
          >
            @sheedahsbeautyworld2
          </a>
        </div>
      </section>
    </div>
  );
}
