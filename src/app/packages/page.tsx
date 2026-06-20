"use client";

import { useState } from "react";
import { useTravelStore } from "@/store/travelStore";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, SlidersHorizontal, Search, RotateCcw, ArrowRight, DollarSign, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PackagesPage() {
  const outboundPackages = useTravelStore((state) => state.outboundPackages);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  // Filter Logic
  const filtered = outboundPackages
    .filter((pkg) => {
      const query = searchQuery.toLowerCase();
      const matchTitle = pkg.title.toLowerCase().includes(query);
      const matchHighlights = pkg.highlights.some(h => h.toLowerCase().includes(query));
      return matchTitle || matchHighlights;
    })
    .sort((a, b) => {
      if (sortOrder === "price-asc") return a.price - b.price;
      if (sortOrder === "price-desc") return b.price - a.price;
      if (sortOrder === "duration") {
        const durA = parseInt(a.duration) || 0;
        const durB = parseInt(b.duration) || 0;
        return durA - durB;
      }
      return 0;
    });

  const resetFilters = () => {
    setSearchQuery("");
    setSortOrder("default");
  };

  return (
    <div className="pt-28 pb-20 bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      
      {/* Page Header */}
      <div className="bg-brand-blue text-white py-12 px-8 text-center border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-gold">
            Escorted Outbound Tours
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-black mt-2 mb-4 uppercase tracking-wide">
            International Packages
          </h1>
          <p className="text-sm text-slate-300 max-w-md mx-auto font-light leading-relaxed">
            All-inclusive tour portfolios including round-trip flight tickets, tourist visa clearance, 4-star hotel stays, meals, and private sightseeing guides.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Toolbar Filter */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between mb-10 border-b border-slate-200 pb-6">
          {/* Search bar */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search by country, city or highlights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-brand-blue font-semibold uppercase tracking-wider text-slate-700"
            />
          </div>

          {/* Sorter */}
          <div className="flex gap-4 flex-wrap items-center text-xs">
            <span className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-brand-blue" strokeWidth={1.5} />
              Sort Fares
            </span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-white border border-slate-200 rounded text-xs px-3 py-2.5 focus:outline-none focus:border-brand-blue font-semibold uppercase text-slate-700 cursor-pointer"
            >
              <option value="default">DEFAULT ORDER</option>
              <option value="price-asc">PRICE: LOW TO HIGH</option>
              <option value="price-desc">PRICE: HIGH TO LOW</option>
              <option value="duration">DURATION DAYS</option>
            </select>

            {(searchQuery !== "" || sortOrder !== "default") && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-brand-red font-bold uppercase tracking-wider cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Packages Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-200 rounded shadow-sm">
            <p className="text-xs text-slate-500 font-light mb-2">No outbound portfolios match your search query.</p>
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-brand-blue uppercase hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filtered.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white border border-slate-200 rounded overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group"
              >
                {/* Image */}
                <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={pkg.heroImage}
                    alt={pkg.title}
                    fill
                    sizes="(max-w-768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-brand-blue text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded shadow">
                    {pkg.duration}
                  </div>
                </div>

                {/* Body details */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="space-y-4">
                    <h3 className="font-heading text-base font-extrabold text-slate-900 line-clamp-1 uppercase leading-snug tracking-wide group-hover:text-brand-blue transition-colors">
                      {pkg.title}
                    </h3>
                    
                    {/* Highlights */}
                    <ul className="space-y-1.5 text-xs text-slate-500 font-medium">
                      {pkg.highlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className="line-clamp-1 flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 bg-brand-red rounded-full flex-shrink-0 mt-1.5"></span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Inclusions badging */}
                    <div className="pt-2 flex flex-wrap gap-1">
                      {pkg.inclusions.map((inc, i) => (
                        <span
                          key={i}
                          className="text-[9px] bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded font-bold uppercase"
                        >
                          {inc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Package Price</span>
                      <span className="text-lg font-black text-brand-red">Rs. {pkg.price.toLocaleString()}</span>
                    </div>
                    <Link
                      href={`/package/${pkg.slug}`}
                      className="px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white rounded text-[11px] font-bold uppercase tracking-wider shadow-sm transition-colors flex items-center gap-1"
                    >
                      View Tour Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
