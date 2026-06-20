"use client";

import Link from "next/link";
import Image from "next/image";
import { useTravelStore } from "@/store/travelStore";
import { FileText, Clock, FileCheck, PhoneCall, ShieldAlert, Star, ShieldCheck, ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

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

export default function VisaServicesPage() {
  const { visaServices, siteSettings } = useTravelStore();

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 font-sans">
      
      {/* 45vh Cinematic Hero Section */}
      <section className="relative h-[45vh] min-h-[380px] w-full flex items-center justify-center overflow-hidden text-white bg-slate-950">
        <Image
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop"
          alt="International Travel Passports and Stamps"
          fill
          priority
          sizes="100vw"
          className="object-cover pointer-events-none opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-slate-950/30 to-slate-950 pointer-events-none"></div>
        
        <div className="max-w-7xl w-full mx-auto px-8 relative z-10 text-center space-y-4 pt-10">
          <div className="inline-flex items-center gap-1.5 bg-brand-gold/20 text-brand-gold border border-brand-gold/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
            <ShieldCheck className="w-3.5 h-3.5 fill-current" stroke="none" />
            18 Years Legacy &bull; IATA Coordinator
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-black tracking-tight uppercase flex flex-col leading-none">
            <span className="text-white"><BouncingText text="VISA SERVICES" /></span>
            <span className="text-brand-gold mt-1.5"><BouncingText text="HUB" /></span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light max-w-lg mx-auto">
            Professional visa documentation assistance for travelers from Nepal. We compile standard tourist files according to strict embassy guidelines to minimize rejection rates.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {visaServices.map((visa) => (
            <div
              key={visa.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-slate-900 uppercase tracking-tight">
                      {visa.country} Visa
                    </h3>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">
                      Accurate Document Compiling
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-brand-blue/5 border border-brand-blue/15 text-[9px] font-extrabold text-brand-blue uppercase rounded-md tracking-wider">
                    Success Rate &bull; High
                  </span>
                </div>

                {/* Technical Specs */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                      <Clock className="w-3.5 h-3.5 inline mr-1 text-brand-blue" strokeWidth={2} />
                      Processing Time
                    </span>
                    <span className="font-bold text-slate-800">{visa.processingTime}</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                      <FileText className="w-3.5 h-3.5 inline mr-1 text-brand-blue" strokeWidth={2} />
                      Required Items
                    </span>
                    <span className="font-bold text-slate-800">{visa.requiredDocuments.length} Key Documents</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3.5">
                  <h4 className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                    Our Vetting Portfolios
                  </h4>
                  <ul className="space-y-2.5 text-xs">
                    {visa.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-slate-600 font-medium">
                        <FileCheck className="w-4.5 h-4.5 text-emerald-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                <Link
                  href={`/visa/${visa.slug}`}
                  className="w-full text-center py-3 bg-brand-blue hover:bg-brand-blue/95 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all shadow shadow-brand-blue/15 hover:shadow-brand-blue/35 hover:-translate-y-0.5 duration-300 block"
                >
                  Verify Checklist
                </Link>
                <Link
                  href={`https://wa.me/${siteSettings.whatsappNumber.replace(/[+\s\-()]/g, "")}?text=Hello%20TripLand!%20I%20would%20like%2520to%2520apply%2520for%2520a%2520${encodeURIComponent(visa.country)}%20visa.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all shadow shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:-translate-y-0.5 duration-300 flex items-center justify-center gap-1.5 block cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  WhatsApp Desk
                </Link>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Advisory section */}
      <section className="bg-slate-100 py-16 px-8 border-y border-slate-200 text-slate-600">
        <div className="max-w-4xl mx-auto space-y-4 text-center">
          <ShieldAlert className="w-8 h-8 text-brand-red mx-auto" strokeWidth={1.5} />
          <h3 className="font-heading font-black text-slate-800 text-sm uppercase tracking-widest">Visa Vetting & Processing Disclaimer</h3>
          <p className="text-xs text-slate-500 leading-relaxed font-light max-w-xl mx-auto">
            TripLand Travels assists in document formatting, booking biometric slot calendars, and standardizing application files. The ultimate right of visa issuance rests strictly with the respective embassies or consulate departments. Application processing service fees are non-refundable once lodged in GDS or embassy portals.
          </p>
        </div>
      </section>

    </div>
  );
}
