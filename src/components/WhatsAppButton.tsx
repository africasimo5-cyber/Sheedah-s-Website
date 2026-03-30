"use client";

import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="mr-3 bg-black/80 backdrop-blur-sm text-cream text-xs font-medium py-2 px-3 rounded-lg shadow-lg"
          >
            Chat with us
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="relative flex items-center justify-center w-14 h-14"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <a
          href="https://wa.me/2347030599735"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#20ba59] transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={28} />
        </a>

        {/* Pulsing ring animation */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1.5],
            opacity: [0.7, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 z-0 bg-[#25D366] rounded-full"
        />
      </div>
    </div>
  );
}
