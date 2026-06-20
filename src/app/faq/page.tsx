"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What makes TripLand Travels unique for flight ticketing?",
    answer: "TripLand Travels & Tours Pvt. Ltd. is an IATA Accredited Agent with 18 years of service commitment in Nepal. We have direct, real-time integration with international and domestic airline booking GDS systems, enabling us to lock in the cheapest air fares and handle date changes, cancellations, and extra baggage allowances efficiently."
  },
  {
    question: "How do I request a custom flight quotation?",
    answer: "You can use the Flight search widget on our homepage or visit our Flights section. Enter your origin, destination, preferred departure/return dates, and passenger details. Submitting the form automatically generates a pre-formatted booking inquiry and opens a WhatsApp session directly to our ticketing desk."
  },
  {
    question: "Do your tour packages include flight tickets and visas?",
    answer: "Yes, our escorted outbound tour packages (to Japan, China, Bali, and Thailand) are all-inclusive. The listed package price covers round-trip flight tickets from Kathmandu, visa processing coordination, hotel accommodations, meals, and sightseeing transfers."
  },
  {
    question: "How can I apply for a visa through TripLand?",
    answer: "For countries like UAE (Dubai), Hong Kong, Japan, and Schengen states, we provide end-to-end documentation support. You can visit our Visa services section to verify required document checklists, and click 'Apply via WhatsApp' to upload your passport copy. Our team will verify and submit the application."
  },
  {
    question: "Where is the TripLand corporate office located?",
    answer: "Our head office is located at Ratopul, Gaushala, Kathmandu, Nepal. You can visit us during business hours (9:30 AM to 6:00 PM, Sunday to Friday) to submit physical passport booklets or documents, or call our hotlines at 9801126300 / 01-4599802."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="pt-28 pb-20 bg-[#f8fafc] text-slate-800 min-h-screen font-sans">
      
      {/* Header Banner */}
      <div className="relative py-20 px-8 text-center text-white bg-slate-950 overflow-hidden border-b border-slate-900">
        <Image
          src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1600&auto=format&fit=crop"
          alt="Support desk background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-slate-950 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-3">
          <span className="text-[10px] font-extrabold tracking-widest uppercase text-brand-gold bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full inline-block">
            Support Desk
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-black mt-2 mb-4 uppercase tracking-wide">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-slate-355 max-w-md mx-auto font-light leading-relaxed">
            Essential information regarding air ticket reservations, visa processing times, payment methods, and package departures.
          </p>
        </div>
      </div>

      {/* Accordions */}
      <section className="py-16 px-8 max-w-3xl mx-auto">
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded overflow-hidden bg-white shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="font-heading text-xs font-extrabold text-slate-900 uppercase tracking-wide leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" strokeWidth={1.5} />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" strokeWidth={1.5} />
                  )}
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-1 pl-11 border-t border-slate-100 text-xs text-slate-550 leading-relaxed font-light tracking-wide font-sans">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
