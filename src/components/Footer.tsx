"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram, Send, ShieldCheck, CheckCircle } from "lucide-react";
import { useTravelStore } from "@/store/travelStore";

export default function Footer() {
  const siteSettings = useTravelStore((state) => state.siteSettings);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t-0 relative z-10 font-sans before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-brand-blue before:via-brand-red before:to-brand-gold before:opacity-85 before:shadow-md before:shadow-brand-red/35">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand & Accreditations */}
        <div className="space-y-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-lg font-extrabold tracking-tight text-white uppercase">
              Trip<span className="text-brand-red">Land</span>
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-slate-400 font-light">
            TripLand Travels & Tours P. LTD is an IATA Accredited travel agent in Nepal with 18 years of commitment, trust, and service excellence in air ticketing and visa documentation.
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
              <Link href="/faq" className="hover:text-white transition-colors duration-250">
                Support FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Corporate Support */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-5">
            Tour Packages
          </h3>
          <ul className="space-y-3 text-[12px] font-medium">
            <li>
              <Link href="/package/japan-cherry-blossom-heritage" className="hover:text-white transition-colors">
                Japan Tour Package
              </Link>
            </li>
            <li>
              <Link href="/package/imperial-china-great-wall" className="hover:text-white transition-colors">
                China Tour Package
              </Link>
            </li>
            <li>
              <Link href="/package/tropical-bali-scenic-gateway" className="hover:text-white transition-colors">
                Bali Tour Package
              </Link>
            </li>
            <li>
              <Link href="/package/bangkok-pattaya-explorer" className="hover:text-white transition-colors">
                Bangkok Pattaya Tour
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
      <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div className="flex flex-col sm:flex-row gap-5 text-[11px] font-medium text-slate-400">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" strokeWidth={1.5} />
            {siteSettings.address}
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" strokeWidth={1.5} />
            {siteSettings.contactEmail}
          </span>
        </div>
        <div className="text-[11px] text-slate-400 lg:text-right font-medium">
          &copy; {currentYear} TripLand Travels & Tours P. LTD. Accredited IATA Agent. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
