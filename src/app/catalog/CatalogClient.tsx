"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";

const categories = ["All", "Straight", "Body Wave", "Deep Wave", "Curly", "Kinky", "Closure & Frontals"];
const allLengths = ["10\"", "12\"", "14\"", "16\"", "18\"", "20\"", "22\"", "24\"", "26\"", "28\"", "30\""];
const shortLengths = ["10\"", "12\"", "14\"", "16\"", "18\"", "20\""];

const products = [
  { id: 1, name: "Brazilian Straight", category: "Straight", image: "https://placehold.co/400x500/1a1a1a/2a2a2a?text=Brazilian+Straight", lengths: allLengths },
  { id: 2, name: "Peruvian Straight", category: "Straight", image: "https://placehold.co/400x500/2a2a2a/3a3a3a?text=Peruvian+Straight", lengths: allLengths },
  { id: 3, name: "Brazilian Body Wave", category: "Body Wave", image: "https://placehold.co/400x500/3a3a3a/4a4a4a?text=Brazilian+Body+Wave", lengths: allLengths },
  { id: 4, name: "Malaysian Body Wave", category: "Body Wave", image: "https://placehold.co/400x500/4a4a4a/5a5a5a?text=Malaysian+Body+Wave", lengths: allLengths },
  { id: 5, name: "Brazilian Deep Wave", category: "Deep Wave", image: "https://placehold.co/400x500/5a5a5a/6a6a6a?text=Brazilian+Deep+Wave", lengths: allLengths },
  { id: 6, name: "Indian Deep Wave", category: "Deep Wave", image: "https://placehold.co/400x500/6a6a6a/7a7a7a?text=Indian+Deep+Wave", lengths: allLengths },
  { id: 7, name: "Brazilian Curly", category: "Curly", image: "https://placehold.co/400x500/7a7a7a/8a8a8a?text=Brazilian+Curly", lengths: allLengths },
  { id: 8, name: "Kinky Curly", category: "Curly", image: "https://placehold.co/400x500/8a8a8a/9a9a9a?text=Kinky+Curly", lengths: allLengths },
  { id: 9, name: "Afro Kinky", category: "Kinky", image: "https://placehold.co/400x500/9a9a9a/aaaaaa?text=Afro+Kinky", lengths: allLengths },
  { id: 10, name: "Kinky Straight", category: "Kinky", image: "https://placehold.co/400x500/aaaaaa/bbbbbb?text=Kinky+Straight", lengths: allLengths },
  { id: 11, name: "HD Lace Frontal", category: "Closure & Frontals", image: "https://placehold.co/400x500/bbbbbb/cccccc?text=HD+Frontal", lengths: shortLengths },
  { id: 12, name: "4x4 Lace Closure", category: "Closure & Frontals", image: "https://placehold.co/400x500/cccccc/dddddd?text=4x4+Closure", lengths: shortLengths },
];

export default function Catalog() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, [activeFilter]);

  const filteredProducts = activeFilter === "All" 
    ? products 
    : products.filter((product) => product.category === activeFilter);

  return (
    <div className="bg-cream min-h-screen pb-32">
      {/* Header */}
      <section className="bg-black pt-28 pb-16 px-4 text-center border-b border-gold/20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-heading font-bold text-gold mb-4"
        >
          Our Hair Collection
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-cream/80 font-sans text-lg md:text-xl max-w-2xl mx-auto"
        >
          Premium quality hair in every texture and length. Find your perfect match.
        </motion.p>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-40 bg-cream/95 backdrop-blur-md border-b border-gold/20 mb-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-6 gap-3 items-center whitespace-nowrap">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-full border transition-all duration-300 uppercase tracking-widest text-xs font-bold font-sans ${
                  activeFilter === cat
                    ? "bg-gold border-gold text-black shadow-md scale-105"
                    : "bg-transparent border-gold/40 text-black/70 hover:border-gold hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <motion.div
                  key={`skeleton-${idx}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full bg-gold/10 animate-pulse rounded-xl aspect-[4/5] min-h-[400px]"
                />
              ))
            ) : (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <ProductCard 
                    name={product.name}
                    category={product.category}
                    image={product.image}
                    lengths={product.lengths}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="w-full py-20 text-center">
            <p className="text-black/50 font-sans text-lg italic">
              No products found in this category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
