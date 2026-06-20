"use client";

import { useState } from "react";
import { useTravelStore } from "@/store/travelStore";
import Image from "next/image";
import Link from "next/link";
import { 
  Clock, 
  SlidersHorizontal, 
  Search, 
  RotateCcw, 
  ArrowRight, 
  Compass, 
  CalendarDays, 
  HelpCircle, 
  X, 
  CheckCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import InquiryForm from "@/components/InquiryForm";

// Centralized Coming Soon Placeholder Data
const placeholderDestinations = [
  {
    id: "place-macau",
    title: "Macau Heritage Tour",
    country: "Macau",
    region: "Asia" as const,
    heroImage: "https://images.unsplash.com/photo-1563884392-540c7ff910c2?q=80&w=1200&auto=format&fit=crop",
    duration: "Duration on Request",
    highlights: ["Ruins of St. Paul's", "Macau Tower & Skyline", "Cotai Strip Resorts"],
    status: "Coming Soon"
  },
  {
    id: "place-philippines",
    title: "Manila & Boracay Escape",
    country: "Philippines (Manila)",
    region: "Asia" as const,
    heroImage: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200&auto=format&fit=crop",
    duration: "Duration on Request",
    highlights: ["Intramuros Walled City", "White Beach Boracay", "Taal Volcano View"],
    status: "Coming Soon"
  },
  {
    id: "place-cambodia",
    title: "Cambodia Angkor Wat Discovery",
    country: "Cambodia",
    region: "Asia" as const,
    heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
    duration: "Duration on Request",
    highlights: ["Angkor Wat UNESCO Site", "Bayon Temple Stone Faces", "Siem Reap Night Market"],
    status: "Coming Soon"
  },
  {
    id: "place-germany",
    title: "Germany Castle & Romantic Road",
    country: "Germany",
    region: "Europe" as const,
    heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop",
    duration: "Duration on Request",
    highlights: ["Neuschwanstein Castle", "Munich & Marienplatz", "Black Forest Scenery"],
    status: "Coming Soon"
  },
  {
    id: "place-italy",
    title: "Grand Italy & Amalfi Coast",
    country: "Italy",
    region: "Europe" as const,
    heroImage: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?q=80&w=1200&auto=format&fit=crop",
    duration: "Duration on Request",
    highlights: ["Rome Colosseum", "Venice Gondola Ride", "Florence Duomo & Art Galleries"],
    status: "Coming Soon"
  },
  {
    id: "place-greece",
    title: "Athens & Santorini Island Holiday",
    country: "Greece",
    region: "Europe" as const,
    heroImage: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
    duration: "Duration on Request",
    highlights: ["Athens Acropolis & Parthenon", "Santorini Caldera Sunset View", "Mykonos Windmills & Beaches"],
    status: "Coming Soon"
  }
];

export default function PackagesPage() {
  const outboundPackages = useTravelStore((state) => state.outboundPackages);
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState<"all" | "Asia" | "Europe">("all");
  const [durationFilter, setDurationFilter] = useState<"all" | "short" | "medium" | "long">("all");
  const [inquiryTarget, setInquiryTarget] = useState<string | null>(null);

  // Helper: Parse duration string to determine range category
  const getDurationCategory = (durationStr: string): "short" | "medium" | "long" | "unknown" => {
    const num = parseInt(durationStr.replace(/\D/g, ""));
    if (isNaN(num)) return "unknown";
    if (num <= 5) return "short";
    if (num >= 6 && num <= 8) return "medium";
    return "long";
  };

  // 1. Filter Seeded Packages
  const filteredSeeded = outboundPackages.filter((pkg) => {
    const query = searchQuery.toLowerCase();
    const matchSearch = 
      pkg.title.toLowerCase().includes(query) || 
      pkg.highlights.some(h => h.toLowerCase().includes(query)) ||
      (pkg.region && pkg.region.toLowerCase().includes(query));
      
    const matchRegion = regionFilter === "all" || pkg.region === regionFilter;
    const matchDuration = durationFilter === "all" || getDurationCategory(pkg.duration) === durationFilter;

    return matchSearch && matchRegion && matchDuration;
  });

  // 2. Filter Coming Soon Placeholders
  const filteredPlaceholders = placeholderDestinations.filter((dest) => {
    const query = searchQuery.toLowerCase();
    const matchSearch = 
      dest.title.toLowerCase().includes(query) || 
      dest.country.toLowerCase().includes(query) ||
      dest.highlights.some(h => h.toLowerCase().includes(query)) ||
      dest.region.toLowerCase().includes(query);
      
    const matchRegion = regionFilter === "all" || dest.region === regionFilter;
    
    // Since coming soon placeholders are duration-on-request, they only show when "All Durations" is selected
    const matchDuration = durationFilter === "all";

    return matchSearch && matchRegion && matchDuration;
  });

  const allFilteredItems = [
    ...filteredSeeded.map(p => ({ ...p, isPlaceholder: false })),
    ...filteredPlaceholders.map(p => ({ ...p, isPlaceholder: true }))
  ];

  const resetFilters = () => {
    setSearchQuery("");
    setRegionFilter("all");
    setDurationFilter("all");
  };

  return (
    <div className="pt-28 pb-20 bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      
      {/* Page Header */}
      <section className="relative py-20 px-8 text-center text-white bg-slate-950 overflow-hidden border-b border-slate-900">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop"
          alt="Scenic travel landscapes background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-slate-950 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-3">
          <span className="text-[10px] font-extrabold tracking-widest uppercase text-brand-gold bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full inline-block">
            Tripland Escorted Outbound Portfolios
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-black mt-2 mb-4 uppercase tracking-wide">
            International Packages
          </h1>
          <p className="text-xs text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
            All-inclusive escorted portfolios. Select dynamic flight itineraries, tourist visa clearances, 3 to 5-star hotel stays, and local guide transfers.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-10">
        
        {/* Advanced Filters Panel */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between mb-10 border-b border-slate-200 pb-8">
          
          {/* Keyword Search */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" strokeWidth={2} />
            <input
              type="text"
              placeholder="Search by country, highlights, or region..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200/90 rounded-xl text-xs focus:outline-none focus:border-brand-blue font-bold uppercase tracking-wider text-slate-700 placeholder-slate-400 shadow-sm transition-all focus:ring-1 focus:ring-brand-blue/20"
            />
          </div>

          {/* Region and Duration Segment selectors */}
          <div className="flex gap-4 flex-wrap items-center text-xs">
            
            {/* Region Filter */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setRegionFilter("all")}
                className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                  regionFilter === "all" ? "bg-brand-blue text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                All Regions
              </button>
              <button
                onClick={() => setRegionFilter("Asia")}
                className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                  regionFilter === "Asia" ? "bg-brand-blue text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Asia
              </button>
              <button
                onClick={() => setRegionFilter("Europe")}
                className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                  regionFilter === "Europe" ? "bg-brand-blue text-white" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Europe
              </button>
            </div>

            {/* Duration Filter */}
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-xl text-[10px] px-3 py-2.5 focus:outline-none focus:border-brand-blue font-bold uppercase text-slate-655 cursor-pointer shadow-sm"
            >
              <option value="all">ALL DURATIONS</option>
              <option value="short">SHORT (3-5 DAYS)</option>
              <option value="medium">MEDIUM (6-8 DAYS)</option>
              <option value="long">LONG (9+ DAYS)</option>
            </select>

            {/* Reset button */}
            {(searchQuery !== "" || regionFilter !== "all" || durationFilter !== "all") && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200/80 px-3.5 py-2.5 rounded-xl border border-slate-200 text-brand-red font-bold uppercase tracking-wider cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Portfolios Grid */}
        {allFilteredItems.length === 0 ? (
          <div className="text-center py-24 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
            <Compass className="w-10 h-10 text-slate-300 mx-auto animate-spin" strokeWidth={1} />
            <p className="text-xs text-slate-400 font-light max-w-xs mx-auto">No travel packages match your search parameters. Please try a different keywords combination.</p>
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-brand-blue uppercase hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allFilteredItems.map((item, index) => {
              const isPlaceholder = item.isPlaceholder;
              const hasPrice = !isPlaceholder && (item as any).price !== 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group relative"
                >
                  {/* Image */}
                  <div className="relative h-56 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={item.heroImage}
                      alt={item.title}
                      fill
                      sizes="(max-w-768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-102 transition-transform duration-700 pointer-events-none"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/60 backdrop-blur-md text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-lg border border-white/10 shadow">
                      {item.duration}
                    </div>
                    {isPlaceholder && (
                      <div className="absolute top-3 right-3 bg-brand-gold text-slate-900 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-lg shadow font-mono">
                        COM LAUNCH
                      </div>
                    )}
                  </div>

                  {/* Body details */}
                  <div className="p-6 flex flex-col flex-grow justify-between text-left space-y-6">
                    <div className="space-y-4">
                      
                      {/* Destination Region Tag */}
                      <span className="text-[9px] font-extrabold uppercase tracking-widest bg-brand-blue/5 border border-brand-blue/15 text-brand-blue px-2.5 py-1 rounded-md">
                        {item.region} Group Tour
                      </span>

                      <h3 className="font-heading text-base font-black text-slate-950 uppercase leading-snug tracking-wide group-hover:text-brand-blue transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      
                      {/* Highlights */}
                      <ul className="space-y-2 text-xs text-slate-500 font-medium">
                        {item.highlights.slice(0, 3).map((hl, i) => (
                          <li key={i} className="line-clamp-1 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-brand-red rounded-full flex-shrink-0 mt-1.5"></span>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price and Action Row */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Package Price</span>
                        {hasPrice ? (
                          <span className="text-base font-black text-brand-red font-heading">
                            Rs. {(item as any).price?.toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                            Price on Request
                          </span>
                        )}
                      </div>

                      {isPlaceholder ? (
                        <button
                          onClick={() => setInquiryTarget(item.title)}
                          className="px-4 py-2 bg-brand-gold hover:bg-brand-gold/90 text-slate-950 rounded-lg text-[10px] font-extrabold uppercase tracking-wider shadow-sm transition-colors cursor-pointer flex items-center gap-1"
                        >
                          Enquire Now
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <Link
                          href={`/package/${(item as any).slug}`}
                          className="px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          View Details
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* Inquiry Modal for Placeholders */}
      <AnimatePresence>
        {inquiryTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 text-slate-800 max-w-md w-full rounded-2xl shadow-2xl p-6 sm:p-8 relative text-left"
            >
              <button
                onClick={() => setInquiryTarget(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b border-slate-100 pb-3 mb-6">
                <h3 className="font-heading text-xs font-bold text-slate-900 uppercase tracking-widest">
                  Custom Tour Inquiry
                </h3>
                <p className="text-[10px] text-slate-400 font-light mt-1">
                  You are enquiring for a custom package to: <strong className="text-slate-850">{inquiryTarget}</strong>. Provide your travel parameters.
                </p>
              </div>

              <InquiryForm targetPackage={inquiryTarget} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
