"use client";

import { useState } from "react";
import Image from "next/image";
import { useTravelStore } from "@/store/travelStore";
import { Plane, MapPin, Clock, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HolidaysPage() {
  const { holidayPackages, siteSettings } = useTravelStore();
  const [activeTab, setActiveTab] = useState<"inbound" | "outbound">("inbound");

  const currentPackages = activeTab === "inbound" ? holidayPackages.inbound : holidayPackages.outbound;
  const tabLabel = activeTab === "inbound" ? "Inbound" : "Outbound";

  const handleEnquire = (pkgTitle: string) => {
    const greeting = `*TRIPLAND HOLIDAY ENQUIRY*\n\n`;
    const details = `*Package Interested In:* ${pkgTitle} (${tabLabel})\n\nPlease share more details about this holiday package.`;

    const text = encodeURIComponent(`${greeting}${details}`);
    const cleanedNumber = siteSettings.whatsappNumber.replace(/[+\s\-()]/g, "");
    window.open(`https://wa.me/${cleanedNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="pt-28 pb-20 bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-20 px-8 text-center text-white bg-slate-950 overflow-hidden border-b border-slate-900">
        <Image
          src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1600&auto=format&fit=crop"
          alt="Holiday travel destination background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 pointer-events-none"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/55 via-transparent to-slate-950 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-3">
          <span className="text-[10px] font-extrabold tracking-widest uppercase text-brand-gold bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full inline-block">
            Curated Holiday Experiences
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-black mt-2 mb-4 uppercase tracking-wide">
            Holidays
          </h1>
          <p className="text-xs text-slate-300 max-w-lg mx-auto font-light leading-relaxed">
            Explore our handpicked holiday packages — whether within Nepal or beyond, we craft memorable getaways.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Inbound / Outbound Tabs */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-sm w-fit mx-auto mb-12">
          <button
            onClick={() => setActiveTab("inbound")}
            className={`px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeTab === "inbound"
                ? "bg-brand-blue text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Plane className="w-4 h-4 inline mr-1.5" strokeWidth={2} />
            Inbound (Domestic)
          </button>
          <button
            onClick={() => setActiveTab("outbound")}
            className={`px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer transition-all ${
              activeTab === "outbound"
                ? "bg-brand-blue text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Plane className="w-4 h-4 inline mr-1.5 rotate-45" strokeWidth={2} />
            Outbound (International)
          </button>
        </div>

        {/* Tab Content: Package Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {currentPackages.length === 0 ? (
              <div className="text-center py-24 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
                <MapPin className="w-10 h-10 text-slate-300 mx-auto" strokeWidth={1} />
                <p className="text-xs text-slate-400 font-light max-w-xs mx-auto">
                  No {tabLabel.toLowerCase()} packages available at the moment. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative"
                  >
                    {/* Image */}
                    <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent pointer-events-none"></div>
                      <div className="absolute top-3 left-3 bg-slate-950/60 backdrop-blur-md text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                        <Clock className="w-3 h-3" strokeWidth={2} />
                        {pkg.duration}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex flex-col grow justify-between text-left">
                      <div className="space-y-3">
                        {/* Location */}
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                          <MapPin className="w-3 h-3 text-brand-gold" strokeWidth={1.5} />
                          {pkg.location}
                        </span>

                        <h3 className="font-heading text-base font-black text-slate-950 uppercase leading-snug tracking-wide group-hover:text-brand-blue transition-colors line-clamp-2">
                          {pkg.title}
                        </h3>
                      </div>

                      {/* Price & CTA */}
                      <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Package Price</span>
                          <span className="text-base font-black text-brand-red font-heading">
                            {pkg.price}
                          </span>
                        </div>

                        <button
                          onClick={() => handleEnquire(pkg.title)}
                          className="px-4 py-2.5 bg-brand-red hover:bg-brand-red/90 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all hover:shadow-brand-red/20 hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Enquire
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Section info */}
        <div className="mt-16 bg-slate-100 border border-slate-200 rounded-2xl p-8 text-center">
          <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-slate-800 mb-2">
            {activeTab === "inbound" ? "Domestic Getaways" : "International Escapes"}
          </h3>
          <p className="text-xs text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
            {activeTab === "inbound"
              ? "Discover the beauty of Nepal — from the serene lakes of Pokhara to the wildlife of Chitwan and the spiritual sites of Lumbini and Muktinath."
              : "Explore the world with our curated international holiday packages. From the skyscrapers of Dubai to the cultural wonders of Japan and Europe."}
          </p>
        </div>
      </div>
    </div>
  );
}

