"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { getStaticGallery } from "@/lib/db";

export default function GalleryPage() {
  const gallery = getStaticGallery();

  return (
    <div className="pt-28 pb-24 bg-[#FAF9F5] text-slate-800 font-sans min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-8 mb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-brand-blue transition-colors group mb-6"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Portal
        </Link>
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold tracking-widest text-brand-blue uppercase block">
            Visual Chronicles
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
            The Cinematic Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed max-w-lg">
            A high-end editorial travel portfolio. Unfiltered captures from outbound cherry blossom tours, Schengen mountain pathways, and serene desert dunes.
          </p>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[250px]">
          {gallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`relative overflow-hidden rounded-2xl border border-slate-200/60 shadow-md group ${item.spanType || "col-span-1 row-span-1"}`}
            >
              {/* Image container */}
              <div className="w-full h-full relative">
                <Image
                  src={item.imageUrl}
                  alt={item.location}
                  fill
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                  loading="lazy"
                />
                
                {/* Backdrop Blur Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                  <div className="text-white text-left space-y-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-brand-gold uppercase tracking-wider">
                      <Camera className="w-3 h-3" /> Captured
                    </span>
                    <h4 className="font-heading font-black text-sm uppercase tracking-wide">
                      {item.location}
                    </h4>
                  </div>
                </div>

                {/* Flat design fallback caption for screen readers/mobile taps */}
                <div className="absolute bottom-4 left-4 z-10 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider block group-hover:hidden transition-all">
                  {item.location}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
