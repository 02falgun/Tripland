"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Plane, ShieldCheck, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTravelStore } from "@/store/travelStore";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const siteSettings = useTravelStore((state) => state.siteSettings);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Flights", href: "/flights" },
    { name: "Packages", href: "/packages" },
    { name: "Visas", href: "/visa-services" },
    { name: "FAQs", href: "/faq" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans">
      {/* Super Slim Top Accent Info (fades out slightly on scroll) */}
      <div className={`transition-all duration-500 text-[10px] py-1.5 px-8 flex justify-between items-center bg-black/25 text-white/80 border-b border-white/5 ${
        isScrolled ? "h-0 py-0 opacity-0 overflow-hidden" : "h-auto opacity-100"
      }`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-brand-gold font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3 fill-current" stroke="none" />
            18 Years Legacy
          </span>
          <span className="w-[1px] h-2.5 bg-white/20"></span>
          <span className="font-semibold uppercase tracking-wider text-slate-300">IATA Accredited Agent</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3 h-3 text-brand-gold" />
          <span className="font-semibold">Hotlines: {siteSettings.phoneNumbers[0]}</span>
        </div>
      </div>

      {/* Main Navigation Glass Bar */}
      <div
        className={`w-full transition-all duration-500 border-b ${
          isScrolled
            ? "py-2 bg-slate-950/80 backdrop-blur-xl border-white/10 shadow-lg"
            : "py-3 bg-black/10 backdrop-blur-md border-white/15"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-9 w-36 bg-white px-2 py-0.5 rounded-lg shadow-md border border-white/25 group-hover:scale-102 transition-transform duration-300">
              <Image
                src="/TriplandLogo.jpeg"
                alt="Tripland Travels & Tours"
                fill
                priority
                className="object-contain p-0.5"
              />
            </div>
          </Link>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-6 font-semibold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-widest transition-all duration-300 hover:text-brand-red relative py-1 ${
                    isActive ? "text-brand-red" : "text-white/80"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-red"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/admin"
              className="text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              Console
            </Link>
            <Link
              href="https://wa.me/9779801126300?text=Hello%20TripLand%20Travels!%20I%20would%20like%20to%20inquire%20about%20flights%20and%20packages."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-brand-red hover:bg-brand-red/90 text-white rounded text-[10px] font-bold uppercase tracking-widest shadow-md shadow-brand-red/20 hover:shadow-brand-red/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Quick Quote
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <button
            className="md:hidden text-white hover:text-brand-red focus:outline-none p-1.5 cursor-pointer transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5.5 h-5.5" strokeWidth={2.5} />
            ) : (
              <Menu className="w-5.5 h-5.5" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-6 px-8 md:hidden flex flex-col gap-5 z-40"
          >
            <nav className="flex flex-col gap-3.5 font-bold text-white/80">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-1.5 text-xs uppercase tracking-widest transition-colors hover:text-brand-red ${
                      isActive ? "text-brand-red border-l-2 border-brand-red pl-2" : "pl-2"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="w-full h-[1px] bg-white/5 my-2"></div>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white py-1 pl-2"
              >
                Console (Admin)
              </Link>
              <Link
                href="https://wa.me/9779801126300?text=Hello%20TripLand%20Travels!%20I%20would%20like%20to%20inquire%20about%20flights%2520and%2520packages."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-brand-red hover:bg-brand-red/90 text-white rounded text-[10px] font-bold tracking-widest uppercase shadow-lg transition-colors mt-2"
              >
                WhatsApp Inquiry
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
