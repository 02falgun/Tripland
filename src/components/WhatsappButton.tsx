"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import settings from "../../data/siteSettings.json";

export default function WhatsappButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const message = encodeURIComponent(
      "Hello TripLand! I am browsing your website and would like to inquire about your private curated luxury tours in Nepal."
    );
    // Remove plus, space or other chars from settings.whatsappNumber for the URL format
    const cleanedNumber = settings.whatsappNumber.replace(/[+\s\-()]/g, "");
    window.open(`https://wa.me/${cleanedNumber}?text=${message}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4 }}
          onClick={handleClick}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none cursor-pointer group"
          aria-label="Contact us on WhatsApp"
        >
          {/* Pulsing ring indicator */}
          <span className="absolute inset-0 rounded-full bg-emerald-600 animate-ping opacity-25 group-hover:bg-emerald-500"></span>
          
          <MessageCircle className="w-7 h-7 relative z-10" strokeWidth={1.2} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
