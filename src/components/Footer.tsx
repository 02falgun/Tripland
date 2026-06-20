"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Send, ShieldCheck, X, FileText, CheckCircle } from "lucide-react";
import { useTravelStore } from "@/store/travelStore";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const siteSettings = useTravelStore((state) => state.siteSettings);
  const currentYear = new Date().getFullYear();
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const bookingTerms = [
    "50% payment required at time of booking/confirmation to hold seats; remainder per individual package terms.",
    "Prices are calculated per person on a twin/double-sharing basis.",
    "A surcharge may apply if the client requests changes to the given package.",
    "Standard hotel check-in: 14:00/15:00; check-out: 11:00/12:00 (unless stated otherwise).",
    "Cancellation after confirmation is generally non-refundable in full (specific tiers vary by package — see each package's detail page).",
    "Flight delays/cancellations by airlines are outside the agency's responsibility.",
    "Visa fees are subject to embassy decision and are non-refundable if refused.",
    "Guests are responsible for handling their own immigration process; the agency may issue a cooperation letter but does not guarantee outcomes."
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t-0 relative z-10 font-sans before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-brand-blue before:via-brand-red before:to-brand-gold before:opacity-85 before:shadow-md before:shadow-brand-red/35">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand & Accreditations */}
        <div className="space-y-5">
          <Link href="/" className="flex items-center group">
            <div className="relative h-9 w-36 bg-white px-2 py-0.5 rounded-lg shadow-md border border-white/20 hover:scale-102 transition-transform duration-300">
              <Image
                src="/TriplandLogo.jpeg"
                alt="Tripland Travels & Tours"
                fill
                className="object-contain p-0.5"
              />
            </div>
          </Link>
          <p className="text-xs leading-relaxed text-slate-400 font-light">
            TripLand Travels & Tours Pvt. Ltd. is an IATA Accredited travel agent in Nepal with 18 years of commitment, trust, and service excellence in air ticketing and visa documentation.
          </p>
          <div className="flex items-center gap-2 bg-slate-800/60 p-3 border border-slate-850 rounded">
            <ShieldCheck className="w-5 h-5 text-brand-gold flex-shrink-0" strokeWidth={1.5} />
            <div className="leading-tight">
              <span className="text-[10px] font-bold text-white uppercase block">IATA Agent</span>
              <span className="text-[9px] text-slate-400 font-light">Accredited ticketing coordinator</span>
            </div>
          </div>
        </div>

        {/* Core Services */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-5">
            Core Portfolios
          </h3>
          <ul className="space-y-3 text-[12px] font-medium">
            <li>
              <Link href="/flights" className="hover:text-white transition-colors duration-250">
                Air Ticket Deals
              </Link>
            </li>
            <li>
              <Link href="/packages" className="hover:text-white transition-colors duration-250">
                Outbound Tour Packages
              </Link>
            </li>
            <li>
              <Link href="/visa-services" className="hover:text-white transition-colors duration-250">
                Visa Services Hub
              </Link>
            </li>
            <li>
              <Link href="/visa-info" className="hover:text-white text-brand-gold transition-colors duration-250 font-semibold">
                Plan Your Europe Visa
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors duration-250">
                Support FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Tour Packages */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-5">
            Tour Packages
          </h3>
          <ul className="space-y-3 text-[12px] font-medium">
            <li>
              <Link href="/package/japan-7n-8d" className="hover:text-white transition-colors">
                Japan Tour Package
              </Link>
            </li>
            <li>
              <Link href="/package/beijing-shanghai-china-5n-6d" className="hover:text-white transition-colors">
                China Tour Package
              </Link>
            </li>
            <li>
              <Link href="/package/danang-hanoi-vietnam-6d-5n" className="hover:text-white transition-colors">
                Vietnam Tour Package
              </Link>
            </li>
            <li>
              <Link href="/package/netherlands-france-switzerland-8d" className="hover:text-white transition-colors">
                Europe Tour Package
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter / Contact Direct */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Direct Dispatch
          </h3>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Subscribe to receive seasonal flight discounts, fixed departures guides, and visa advisory alerts.
          </p>
          <div className="flex border-b border-slate-700 focus-within:border-brand-blue transition-colors py-1">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-transparent text-xs py-1 w-full focus:outline-none text-white placeholder-slate-500"
            />
            <button
              className="text-slate-400 hover:text-white px-2 transition-colors cursor-pointer"
              aria-label="Subscribe"
            >
              <Send className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

      </div>

      {/* Corporate Info & Bottom Bar */}
      <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-slate-800 flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-5 text-[11px] font-medium text-slate-400">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" strokeWidth={1.5} />
            {siteSettings.address}
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" strokeWidth={1.5} />
            {siteSettings.contactEmail}
          </span>
          <button
            onClick={() => setIsTermsOpen(true)}
            className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors text-slate-400"
          >
            <FileText className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" strokeWidth={1.5} />
            Universal Booking Terms
          </button>
        </div>
        <div className="text-[11px] text-slate-400 lg:text-right font-medium">
          &copy; {currentYear} Tripland Travels & Tours Pvt. Ltd. Accredited IATA Agent. All Rights Reserved.
        </div>
      </div>

      {/* State-Based Terms Overlay Modal */}
      <AnimatePresence>
        {isTermsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 text-slate-800 max-w-2xl w-full rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto relative text-left"
            >
              <button
                onClick={() => setIsTermsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border-b border-slate-100 pb-4 mb-6">
                <h2 className="font-heading text-lg font-black text-slate-900 uppercase">
                  Universal Booking Terms & Conditions
                </h2>
                <p className="text-xs text-slate-500 font-light mt-0.5">
                  Official operational clauses for all tour portfolios managed by Tripland Travels & Tours Pvt. Ltd.
                </p>
              </div>

              <ul className="space-y-4 text-xs font-semibold text-slate-650">
                {bookingTerms.map((term, i) => (
                  <li key={i} className="flex gap-3 items-start leading-relaxed">
                    <CheckCircle className="w-4.5 h-4.5 text-brand-blue flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setIsTermsOpen(false)}
                  className="px-6 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow shadow-brand-blue/10 cursor-pointer"
                >
                  I Understand & Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
