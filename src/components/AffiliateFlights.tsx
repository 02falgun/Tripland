"use client";

import Image from "next/image";
import { useTravelStore } from "@/store/travelStore";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";

export default function AffiliateFlights() {
  const { affiliateAirlines } = useTravelStore();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  return (
    <section className="py-20 px-8 max-w-7xl mx-auto border-b border-slate-200/50">
      {/* Section Heading */}
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-[11px] font-extrabold tracking-widest text-brand-red uppercase block mb-1">
          <Plane className="w-4 h-4 inline mr-1" strokeWidth={2.5} />
          Our Affiliate Flights
        </span>
        <h2 className="font-heading text-2xl md:text-3xl font-black text-slate-900 uppercase">
          Affiliate Flights
        </h2>
        <div className="w-12 h-1 bg-brand-red mx-auto my-4"></div>
        <p className="text-xs text-slate-500 leading-relaxed font-light">
          Partner airlines we work with to bring you the best flight deals and seamless travel experiences.
        </p>
      </div>

      {/* Airline Logo Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-6"
      >
        {affiliateAirlines.map((airline) => (
          <motion.div
            key={airline.id}
            variants={itemVariants}
            className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
          >
            <div className="relative h-14 w-full max-w-32.5">
              <Image
                src={airline.logo}
                alt={airline.name}
                fill
                sizes="130px"
                className="object-contain group-hover:scale-110 transition-transform duration-300 grayscale hover:grayscale-0"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

