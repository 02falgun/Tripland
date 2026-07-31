"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTravelStore } from "@/store/travelStore";
import { getStaticGallery, getStaticBlogs } from "@/lib/db";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Plane, 
  PhoneCall, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  Camera,
  BookOpen,
  Clock,
  Building,
  Compass,
  FileText,
  MapPin
} from "lucide-react";
import HeroSearchWidget from "@/components/HeroSearchWidget";
import HeroSlideshow from "@/components/HeroSlideshow";
import AffiliateFlights from "@/components/AffiliateFlights";
import heroImages from "../../data/heroImages.json";

const visaImages: Record<string, string> = {
  "dubai-uae-visa": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
  "hong-kong-visa": "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=1200&auto=format&fit=crop",
  "japan-visa": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
  "schengen-europe-visa": "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1200&auto=format&fit=crop",
};

// Headline motion letters helper
function BouncingText({ text }: { text: string }) {
  const letters = Array.from(text);
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      className="inline-flex flex-wrap"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className={letter === " " ? "mr-3" : ""}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Home() {
  const { flightDeals, visaServices, siteSettings, holidayPackages } = useTravelStore();
  
  // State for dynamic Visa morphing
  const [hoveredVisaId, setHoveredVisaId] = useState<string>("");
  const [holidayTab, setHolidayTab] = useState<"inbound" | "outbound">("inbound");

  // Load static gallery & blogs
  const gallery = getStaticGallery();
  const blogs = getStaticBlogs();

  // Set default visa ID once loaded
  useEffect(() => {
    if (visaServices.length > 0 && !hoveredVisaId) {
      setHoveredVisaId(visaServices[0].id);
    }
  }, [visaServices, hoveredVisaId]);

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 font-sans">

      {/* 100vh Full-Screen Cinematic Hero Section */}
      <section className="relative h-[95vh] min-h-162.5 w-full flex items-center justify-center overflow-hidden text-white bg-slate-950">
        {/* Hero Image Slideshow Background */}
        <HeroSlideshow images={heroImages} />
        {/* Linear dark gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-slate-950/30 to-slate-950 pointer-events-none"></div>

        <div className="max-w-7xl w-full mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10 pt-16">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6 text-left">
<div className="flex items-center gap-3">
              <div className="relative h-12 w-12 sm:h-16 sm:w-16 shrink-0">
                <Image
                  src="/images/badges/18yrs-logo.png"
                  alt="18 Years Trust Badge"
                  fill
                  sizes="(max-width: 640px) 48px, 64px"
                  className="object-contain"
                />
              </div>
              <div className="inline-flex items-center gap-1.5 bg-brand-gold/20 text-brand-gold border border-brand-gold/30 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm animate-pulse">
                <Star className="w-3.5 h-3.5 fill-current" />
                18 Years of Trust &amp; Commitment
              </div>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white uppercase flex flex-col">
              <span className="text-white"><BouncingText text="CHEAP AIR" /></span>
              <span className="text-brand-gold"><BouncingText text="TICKETS" /></span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light max-w-sm">
              As an accredited IATA agent, we leverage direct airline channels to provide the cheapest flight rates in Nepal. Get instant quotes via WhatsApp.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-slate-300 font-medium">Ticketing agents online right now</span>
            </div>
          </div>

          {/* Right Widget (Tabbed Hero Search Widget) */}
          <div className="lg:col-span-7">
            <HeroSearchWidget />
          </div>
        </div>
      </section>

      {/* Trust &amp; Accreditations Banner */}
      <section className="bg-slate-100 py-10 px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-around gap-8 text-slate-600">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-brand-blue shrink-0" strokeWidth={1.5} />
            <div>
              <h3 className="font-heading font-bold text-slate-800 text-sm uppercase">IATA Accredited</h3>
              <p className="text-[11px] text-slate-500">Official agent licensed for global flight ticketing.</p>
            </div>
          </div>
          <div className="w-px h-10 bg-slate-300 hidden md:block"></div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-brand-blue shrink-0" strokeWidth={1.5} />
            <div>
              <h3 className="font-heading font-bold text-slate-800 text-sm uppercase">18 Years Commitment</h3>
              <p className="text-[11px] text-slate-500">Reliable agency service located in Kathmandu.</p>
            </div>
          </div>
          <div className="w-px h-10 bg-slate-300 hidden md:block"></div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-brand-blue shrink-0" strokeWidth={1.5} />
            <div>
              <h3 className="font-heading font-bold text-slate-800 text-sm uppercase">99% Visa Approvals</h3>
              <p className="text-[11px] text-slate-500">High success rates for Dubai, China, &amp; Japan visas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Section */}
      <section className="py-20 px-8 max-w-7xl mx-auto border-b border-slate-200/50">
        <div className="text-center max-w-xl mx-auto mb-16 relative">
          <span className="text-[11px] font-extrabold tracking-widest text-brand-blue uppercase block mb-1">
            TRAVEL SOLUTIONS
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-slate-900 uppercase">
            OUR CORE PORTFOLIOS
          </h2>
          <div className="w-12 h-1 bg-brand-red mx-auto my-4"></div>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            We leverage accredited GDS systems and GDS queue direct-access lines to guarantee seamless retail travel booking solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            {
              title: "Flight Booking",
              description: "Accredited GDS wholesale ticketing queues for domestic &amp; international flights.",
              icon: Plane,
              link: "/flights",
            },
            {
              title: "Hotel Booking",
              description: "Vetted international resort vouchers &amp; accommodation reservation options.",
              icon: Building,
              link: "/packages",
            },
            {
              title: "Tour Package",
              description: "All-inclusive group departures &amp; customized private outbound itineraries.",
              icon: Compass,
              link: "/packages",
            },
            {
              title: "Travel Insurance",
              description: "Consolidated multi-risk travel safety coverage for absolute peace of mind.",
              icon: ShieldCheck,
              link: "/faq",
            },
            {
              title: "Visa Services",
              description: "Embassy file compiling, VFS booking slot check, and compliance reviews.",
              icon: FileText,
              link: "/visa-services",
            },
          ].map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="bg-white border border-slate-200/85 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:border-brand-blue/20 transition-all duration-300 flex flex-col justify-between text-left group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/5 border border-brand-blue/15 text-brand-blue flex items-center justify-center group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading text-xs font-black uppercase text-slate-900 tracking-wider">
                      {srv.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                </div>
                <Link
                  href={srv.link}
                  className="inline-flex items-center gap-1 text-[9px] font-extrabold text-brand-blue uppercase tracking-widest pt-4 group-hover:text-brand-red transition-colors"
                >
                  Configure
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Flight Ticket Deals Section */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-extrabold tracking-widest text-brand-blue uppercase block mb-1">
            Top Selling Channels
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-slate-900 uppercase">
            Cheap Air Ticket Deals
          </h2>
          <div className="w-12 h-1 bg-brand-red mx-auto my-4"></div>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Seize our lowest airline ticket rates pre-negotiated for domestic hops and popular international routes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {flightDeals.filter(f => f.isFeatured).slice(0, 3).map((deal) => (
            <div key={deal.id} className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-brand-blue/30 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full blur-xl group-hover:bg-brand-blue/10 transition-colors pointer-events-none"></div>
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-extrabold tracking-wider bg-slate-50 border border-slate-200 text-slate-650 px-2.5 py-1 rounded uppercase">
                    {deal.airline}
                  </span>
                  <span className="text-[10px] font-bold text-brand-gold uppercase flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-current animate-pulse" /> Featured
                  </span>
                </div>
                <div>
                  <h4 className="font-heading text-lg font-black text-slate-950 uppercase group-hover:text-brand-blue transition-colors">{deal.route}</h4>
                  <span className="text-[11px] text-slate-450 font-semibold block mt-0.5">{deal.type} Flight | {deal.baggageAllowance}</span>
                </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Starting Price</span>
                  <span className="text-lg font-extrabold text-brand-blue">Rs. {deal.startingPrice.toLocaleString()}</span>
                </div>
                <Link
                  href={`/flights?route=${encodeURIComponent(deal.route)}`}
                  className="px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white rounded text-[10px] font-bold uppercase tracking-wider shadow-sm transition-colors"
                >
                  Book Now
                </Link>
              </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Affiliate Flights Section */}
      <AffiliateFlights />

      {/* Holiday Packages Section — Inbound / Outbound */}
      <section className="py-20 px-8 bg-slate-50 border-t border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-stretch md:items-end justify-between mb-8 gap-4">
            <div className="relative">
              <span className="text-[11px] font-extrabold tracking-widest text-brand-blue uppercase">
                Fixed Departures 2026
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-black text-slate-900 uppercase mt-1">
                Holiday Packages
              </h2>
            </div>
            <Link
              href="/holidays"
              className="inline-flex items-center gap-1.5 text-[10px] font-bold text-brand-blue uppercase hover:text-brand-red transition-colors group tracking-wider"
            >
              Explore All Packages
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Inbound / Outbound Tabs */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-sm w-fit mx-auto mb-10">
            <button
              onClick={() => setHolidayTab("inbound")}
              className={`px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                holidayTab === "inbound"
                  ? "bg-brand-blue text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Plane className="w-3.5 h-3.5 inline mr-1.5" strokeWidth={2} />
              Inbound (Domestic)
            </button>
            <button
              onClick={() => setHolidayTab("outbound")}
              className={`px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-all ${
                holidayTab === "outbound"
                  ? "bg-brand-blue text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Plane className="w-3.5 h-3.5 inline mr-1.5 rotate-45" strokeWidth={2} />
              Outbound (International)
            </button>
          </div>

          {/* Package Cards Carousel */}
          <div className="flex overflow-x-auto no-scrollbar gap-8 pb-8 scroll-smooth snap-x snap-mandatory px-2">
            {(holidayTab === "inbound" ? holidayPackages.inbound : holidayPackages.outbound).slice(0, 4).map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="w-70 sm:w-80 shrink-0 bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between snap-start relative group"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-50">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-brand-blue text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
                    {pkg.duration}
                  </div>
                </div>
                {/* Body */}
                <div className="p-5 flex flex-col grow justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                      <MapPin className="w-3 h-3 text-brand-gold" strokeWidth={1.5} />
                      {pkg.location}
                    </span>
                    <h3 className="font-heading text-sm font-extrabold text-slate-900 uppercase tracking-wide text-left group-hover:text-brand-blue transition-colors line-clamp-1">
                      {pkg.title}
                    </h3>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block mb-0.5">Package Price</span>
                      <span className="text-sm font-black text-brand-red">{pkg.price}</span>
                    </div>
                    <button
                      onClick={() => {
                        const number = siteSettings.whatsappNumber.replace(/[+\s\-()]/g, "");
                        const text = encodeURIComponent(`*TRIPLAND ENQUIRY*\n\nInterested in: ${pkg.title} (${holidayTab === "inbound" ? "Inbound" : "Outbound"})`);
                        window.open(`https://wa.me/${number}?text=${text}`, "_blank");
                      }}
                      className="px-4 py-2 bg-brand-red hover:bg-brand-red/90 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all duration-300"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visa Services Section (Tabbed Image Morph Engine) */}
      <section className="py-24 px-8 max-w-7xl mx-auto relative border-t border-slate-200/50">
        <div className="text-center max-w-xl mx-auto mb-16 relative">
          {/* Handwritten Annotation floating relative to header */}
          <div className="absolute -top-10 right-0 sm:right-6 rotate-[-4deg] font-handwritten text-2xl text-brand-red hidden md:flex items-center gap-1 select-none pointer-events-none drop-shadow">
            Embassy checklists pre-checked! 📄
          </div>
          <span className="text-[11px] font-extrabold tracking-widest text-brand-blue uppercase block mb-1">
            Documentation Desk
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-slate-900 uppercase">
            Visa Services Hub
          </h2>
          <div className="w-12 h-1 bg-brand-red mx-auto my-4"></div>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Fast, secure visa documentation and processing support for popular travel corridors. High approval ratios.
          </p>
        </div>

        {/* Morphing Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column Tabs */}
          <div className="md:col-span-4 flex flex-col gap-4">
            {visaServices.map((visa, idx) => {
              const isActive = hoveredVisaId === visa.id;
              return (
                <button
                  key={visa.id}
                  onMouseEnter={() => setHoveredVisaId(visa.id)}
                  onClick={() => setHoveredVisaId(visa.id)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 text-left cursor-pointer group ${
                    isActive 
                      ? "bg-white border-brand-blue/35 shadow-md scale-[1.02]" 
                      : "bg-transparent border-slate-200/65 hover:bg-white hover:border-slate-350"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold block">0{idx + 1}</span>
                    <span className={`font-heading font-black uppercase text-sm tracking-wide transition-colors ${isActive ? "text-brand-blue" : "text-slate-700"}`}>
                      {visa.country}
                    </span>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-all ${isActive ? "text-brand-blue translate-x-1" : "text-slate-300 group-hover:text-slate-500"}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column Morphing Background Sheet */}
          <div className="md:col-span-8">
            {(() => {
              const activeVisa = visaServices.find(v => v.id === hoveredVisaId) || visaServices[0];
              if (!activeVisa) return null;
              const visaCoverImage = visaImages[activeVisa.slug] || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop";
              return (
                <div className="relative h-120 rounded-3xl overflow-hidden border border-slate-200/60 shadow-xl group">
                  
                  {/* Animating morph image swap */}
                  <Image
                    key={activeVisa.id}
                    src={visaCoverImage}
                    alt={`${activeVisa.country} Visa Destination`}
                    fill
                    sizes="(max-w-1024px) 100vw, 60vw"
                    className="object-cover transition-all duration-700 pointer-events-none scale-102"
                  />
                  <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-[2px] transition-all"></div>
                  
                  {/* Glassmorphic Panel Details */}
                  <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between text-white text-left z-10">
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] font-black uppercase tracking-widest bg-brand-gold text-slate-900 px-3 py-1 rounded">
                          Checklist pre-checked
                        </span>
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-brand-gold" /> {activeVisa.processingTime}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-white">
                          {activeVisa.country} Visa
                        </h3>
                        <p className="text-xs text-slate-350 font-light leading-relaxed max-w-md">
                          Standard tourist visa processing. Direct queue coordination to optimize embassy slots and application file formatting.
                        </p>
                      </div>

                      <div className="space-y-2.5">
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-gold block">
                          Required Documents (First 4 Items)
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-slate-200 font-semibold">
                          {activeVisa.requiredDocuments.slice(0, 4).map((doc, idx) => (
                            <li key={idx} className="flex gap-2 items-start leading-tight">
                              <span className="w-4.5 h-4.5 rounded-full bg-white/15 text-white flex items-center justify-center shrink-0 text-[9px] font-bold mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="pt-0.5">{doc.length > 45 ? doc.slice(0, 45) + "..." : doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                      <Link
                        href={`/visa/${activeVisa.slug}`}
                        className="px-5 py-2.5 bg-white text-slate-950 hover:bg-slate-100 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
                      >
                        Verify Full Checklist
                      </Link>
<Link
                        href={`https://wa.me/${siteSettings.whatsappNumber.replace(/[+\s\-()]/g, "")}?text=${encodeURIComponent(`Hello TripLand! I would like to apply for a ${activeVisa.country} visa.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5" /> WhatsApp Desk
                      </Link>
                    </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Cinematic Masonry Gallery Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto relative bg-[#FAF9F5] border-t border-slate-200/60">
        <div className="text-center max-w-xl mx-auto mb-16 relative">
          <span className="text-[10px] font-extrabold tracking-widest text-brand-blue uppercase block mb-1">
            Visual Chronicles
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-slate-900 uppercase">
            The Cinematic Portfolio
          </h2>
          <div className="w-12 h-1 bg-brand-red mx-auto my-4"></div>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Capture glimpses of cherry blossoms, snowcapped alpine passes, and heritage water palaces.
          </p>
        </div>

        {/* Asymmetrical masonry previews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 auto-rows-[220px]">
          {gallery.slice(0, 3).map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-2xl border border-slate-200/60 shadow-md group ${
                idx === 0 ? "md:col-span-2 md:row-span-2" : "col-span-1 row-span-1"
              }`}
            >
              <Image
                src={item.imageUrl}
                alt={item.location}
                fill
                sizes="(max-w-768px) 100vw, 40vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                <div className="text-white text-left space-y-1">
                  <span className="text-[8px] font-bold text-brand-gold uppercase tracking-wider flex items-center gap-1">
                    <Camera className="w-3 h-3" /> Captured
                  </span>
                  <h4 className="font-heading font-black text-sm uppercase tracking-wide">{item.location}</h4>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-white text-[9px] font-bold uppercase tracking-wider group-hover:hidden transition-all pointer-events-none">
                {item.location}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 px-6 py-3 border border-slate-350 hover:border-brand-blue hover:text-brand-blue text-slate-650 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
          >
            Explore Full Gallery
          </Link>
        </div>
      </section>

      {/* Traveler Journals Section */}
      <section className="py-24 px-8 max-w-7xl mx-auto relative border-t border-slate-200/60">
        <div className="text-center max-w-xl mx-auto mb-16 relative">
          <span className="text-[10px] font-extrabold tracking-widest text-brand-blue uppercase block mb-1">
            Traveler Journals
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-slate-900 uppercase">
            Voices from the Expedition
          </h2>
          <div className="w-12 h-1 bg-brand-red mx-auto my-4"></div>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Unedited logs, alpine vetting guidelines, and family retreats shared directly by our travel clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((article, idx) => (
            <article 
              key={article.id} 
              className="flex flex-col bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-50">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="320px"
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-700 pointer-events-none"
                />
              </div>
                <div className="p-6 sm:p-8 flex flex-col justify-between grow space-y-4">
                <div className="space-y-2 text-left">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    {article.date} &bull; By {article.author.split(" ")[0]}
                  </span>
                  <h4 className="font-heading font-black text-sm uppercase tracking-wide leading-snug line-clamp-2 text-slate-900 group-hover:text-brand-blue transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-[11px] text-slate-550 leading-relaxed font-light line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
                <Link
                  href={`/blog/${article.slug}`}
                  className="text-[10px] font-bold text-brand-red uppercase tracking-widest text-left hover:underline flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Read Story
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="px-6 py-3 bg-brand-blue hover:bg-brand-blue/95 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors cursor-pointer shadow shadow-brand-blue/20"
          >
            Explore All Journals
          </Link>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <TestimonialsSection />

      {/* Corporate Call to Action */}
      <section className="relative bg-slate-950 text-white py-20 px-8 text-center overflow-hidden border-t border-slate-900">
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop"
          alt="Scenic mountain lake travel backdrop"
          fill
          sizes="100vw"
          className="object-cover opacity-25 pointer-events-none"
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/50 via-transparent to-slate-950 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h2 className="font-heading text-2xl md:text-4xl font-extrabold uppercase">
            Ready to book your flights or plan an escape?
          </h2>
          <p className="text-xs text-slate-300 font-light max-w-lg mx-auto leading-relaxed">
            Contact our accredited corporate ticketing specialists right now for the lowest airfares and custom outbound schedules.
          </p>
          <div className="flex justify-center gap-4 pt-4 flex-wrap">
            <Link
              href={`tel:${siteSettings.phoneNumbers[0]}`}
              className="px-6 py-3 bg-white text-brand-blue font-bold uppercase text-[10px] tracking-wider rounded shadow-lg hover:bg-slate-100 transition-colors"
            >
              Call {siteSettings.phoneNumbers[0]}
            </Link>
            <Link
              href={`https://wa.me/${siteSettings.whatsappNumber.replace(/[+\s\-()]/g, "")}?text=${encodeURIComponent("Hello! I need assistance with flight ticketing.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-brand-red text-white font-bold uppercase text-[10px] tracking-wider rounded shadow-lg hover:bg-brand-red/90 transition-colors"
            >
              Consult via WhatsApp
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

// Testimonials Carousel Component
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "TripLand secured our group tickets to Tokyo during the peak cherry blossom season at an unbeatable wholesale rate. Their direct GDS queues are extremely fast and reliable.",
      author: "Rajesh Shrestha",
      role: "Corporate Group Lead",
      service: "International Ticketing Desk",
      rating: 5,
      initials: "RS"
    },
    {
      quote: "Embassy appointment slots are notoriously difficult to secure, but the documentation experts at TripLand compiled my Schengen visa file flawlessly. Processed on time!",
      author: "Dr. Smriti Pandey",
      role: "Medical Practitioner",
      service: "Schengen Visa Hub",
      rating: 5,
      initials: "SP"
    },
    {
      quote: "Our family holiday in Bali was perfectly coordinated. Flight timings, hotel check-ins, and local guides were fully aligned. An exceptional, stress-free luxury service.",
      author: "Anil Thapa",
      role: "Business Consultant",
      service: "Outbound Tour Package",
      rating: 5,
      initials: "AT"
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, testimonials.length]);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[activeIdx];

  return (
    <section
      className="py-24 bg-slate-50 border-t border-slate-200/60 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-w-125 h-w-125 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-[10px] font-extrabold tracking-widest text-brand-blue uppercase block mb-1">
            Client Stories
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-black text-slate-900 uppercase">
            Voices of Explorers
          </h2>
          <div className="w-12 h-1 bg-brand-red mx-auto my-4"></div>
        </div>

        {/* Carousel Card */}
          <div className="relative bg-white border border-slate-200/90 rounded-2xl shadow-xl p-8 md:p-12 min-h-80 flex flex-col justify-between">

          {/* Big quotes icon */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 text-brand-gold/10 select-none">
            <Quote className="w-20 h-20 fill-current" stroke="none" />
          </div>

          <div className="relative min-h-35 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 relative z-10"
              >
                {/* Star Rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-base md:text-lg italic text-slate-800 leading-relaxed font-light font-sans text-left">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                {/* Service Tag */}
                <div className="inline-block px-3 py-1 bg-brand-blue/5 border border-brand-blue/15 rounded text-[9px] font-extrabold text-brand-blue uppercase tracking-widest text-left">
                  {current.service}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Row: Client info & controls */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            {/* Author details */}
            <div className="min-h-12.5 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-linear-to-tr from-brand-blue to-slate-900 text-white flex items-center justify-center font-black text-sm uppercase shadow-sm">
                    {current.initials}
                  </div>
                  <div className="text-left leading-tight">
                    <h4 className="font-heading font-black text-slate-950 uppercase text-xs tracking-wide">
                      {current.author}
                    </h4>
                    <span className="text-[10px] text-slate-450 font-bold uppercase tracking-widest block mt-0.5">
                      {current.role}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous Testimonial"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-brand-blue hover:text-brand-blue flex items-center justify-center shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dot Indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${activeIdx === idx ? "bg-brand-blue w-6" : "bg-slate-250 hover:bg-slate-350"
                      }`}
                  ></button>
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Next Testimonial"
                className="w-10 h-10 rounded-full bg-white border border-slate-200 hover:border-brand-blue hover:text-brand-blue flex items-center justify-center shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
