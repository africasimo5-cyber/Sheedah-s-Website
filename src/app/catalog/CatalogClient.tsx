"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";

const categories = ["All", "Straight", "Body Wave", "Deep Wave", "Curly", "Kinky", "Closure & Frontals"];
const allLengths = ["10\"", "12\"", "14\"", "16\"", "18\"", "20\"", "22\"", "24\"", "26\"", "28\"", "30\""];
const shortLengths = ["10\"", "12\"", "14\"", "16\"", "18\"", "20\""];

const products = [
  { id: 1, name: "Brazilian Straight", category: "Straight", image: "/wigs/straight-hair-1.jpg", lengths: allLengths },
  { id: 2, name: "Peruvian Straight", category: "Straight", image: "/wigs/straight-hair-2.jpg", lengths: allLengths },
  { id: 3, name: "Brazilian Body Wave", category: "Body Wave", image: "/wigs/body-wave-1.jpg", lengths: allLengths },
  { id: 4, name: "Malaysian Body Wave", category: "Body Wave", image: "/wigs/body-wave-2.jpg", lengths: allLengths },
  { id: 5, name: "Brazilian Deep Wave", category: "Deep Wave", image: "/wigs/body-wave-3.jpg", lengths: allLengths },
  { id: 6, name: "Indian Deep Wave", category: "Deep Wave", image: "/wigs/straight-hair-3.jpg", lengths: allLengths },
  { id: 7, name: "Brazilian Curly", category: "Curly", image: "/wigs/curly-hair-1.jpg", lengths: allLengths },
  { id: 8, name: "Kinky Curly", category: "Curly", image: "/wigs/curly-hair-2.jpg", lengths: allLengths },
  { id: 9, name: "Afro Kinky", category: "Kinky", image: "/wigs/curly-hair-3.jpg", lengths: allLengths },
  { id: 10, name: "Kinky Straight", category: "Kinky", image: "/wigs/straight-hair-4.jpg", lengths: allLengths },
  { id: 11, name: "HD Lace Frontal", category: "Closure & Frontals", image: "https://placehold.co/400x500/1a1a1a/2aADA8?text=HD+Frontal", lengths: shortLengths },
  { id: 12, name: "4x4 Lace Closure", category: "Closure & Frontals", image: "https://placehold.co/400x500/1a1a1a/f0197d?text=4x4+Closure", lengths: shortLengths },
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
    <div className="bg-white min-h-screen pb-32">
      {/* Header */}
      <section className="bg-dark pt-28 pb-16 px-4 text-center border-b border-primary/20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-heading font-bold text-primary mb-4"
        >
          Our Hair Collection
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/80 font-sans text-lg md:text-xl max-w-2xl mx-auto"
        >
          Premium quality hair in every texture and length. Find your perfect match.
        </motion.p>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-primary/20 mb-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-6 gap-3 items-center whitespace-nowrap">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-full border transition-all duration-300 uppercase tracking-widest text-xs font-bold font-sans ${
                  activeFilter === cat
                    ? "bg-primary border-primary text-white shadow-md scale-105"
                    : "bg-white border-primary/40 text-dark/70 hover:border-primary hover:text-primary"
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
                  className="w-full h-full bg-primary/10 animate-pulse rounded-xl aspect-[4/5] min-h-[400px]"
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
            <p className="text-dark/50 font-sans text-lg italic">
              No products found in this category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
