"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";

type CatalogWig = {
  id: string;
  name: string;
  category: string;
  lengths: string[];
  price: string | null;
  image_url: string | null;
};

const categories = [
  "All",
  "Straight",
  "Body Wave",
  "Deep Wave",
  "Curly",
  "Kinky",
  "Closure & Frontals",
];

type CatalogClientProps = {
  wigs: CatalogWig[];
};

export default function CatalogClient({ wigs }: CatalogClientProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredWigs = useMemo(() => {
    if (activeFilter === "All") {
      return wigs;
    }

    return wigs.filter((wig) => wig.category === activeFilter);
  }, [activeFilter, wigs]);

  return (
    <div className="bg-white min-h-screen pb-32">
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
          Premium quality hair in every texture and length. Find your perfect
          match.
        </motion.p>
      </section>

      <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-primary/20 mb-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] py-6 gap-3 items-center whitespace-nowrap">
            {categories.map((cat) => (
              <button
                key={cat}
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!wigs.length ? (
          <div className="w-full py-20 text-center">
            <p className="text-dark/50 font-sans text-lg italic">
              No wigs available at the moment. Check back soon! 😊
            </p>
          </div>
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredWigs.map((wig) => (
                  <motion.div
                    key={wig.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    <ProductCard
                      name={wig.name}
                      category={wig.category}
                      lengths={wig.lengths}
                      price={wig.price}
                      image_url={wig.image_url}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {!filteredWigs.length ? (
              <div className="w-full py-20 text-center">
                <p className="text-dark/50 font-sans text-lg italic">
                  No wigs available at the moment. Check back soon! 😊
                </p>
              </div>
            ) : null}
          </>
        )}
      </section>
    </div>
  );
}
