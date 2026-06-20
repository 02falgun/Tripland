"use client";

import { useState } from "react";
import { Check, CheckCircle2, Calendar, Clock, MapPin, Eye, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { OutboundPackage } from "@/types";

interface Props {
  pkg: OutboundPackage;
}

type TabType = "overview" | "itinerary" | "inclusions";

export default function PackageTabs({ pkg }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const tabs = [
    { id: "overview", label: "Overview & Highlights", icon: Eye },
    { id: "itinerary", label: "Day-by-Day Itinerary", icon: Calendar },
    { id: "inclusions", label: "Inclusions & Logistics", icon: ClipboardList },
  ];

  return (
    <div className="space-y-8">
      {/* Tab Selectors Row */}
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-6 font-heading">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 pb-4 text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer whitespace-nowrap ${
                isActive ? "text-brand-blue" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-blue"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "overview" && (
              <div className="space-y-8 text-left">
                {/* Intro summary */}
                <div className="space-y-3">
                  <h3 className="font-heading text-sm font-extrabold text-slate-900 uppercase">
                    Trip Overview
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light font-sans max-w-2xl">
                    Embark on an all-inclusive adventure package designed from Kathmandu. We manage airline bookings, visa logistics, high-end accommodation vouchers, and curated local guides to make your expedition stress-free.
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-4">
                  <h3 className="font-heading text-sm font-extrabold text-slate-900 uppercase">
                    Expedition Highlights
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-650">
                    {pkg.highlights.map((hl, i) => (
                      <li key={i} className="flex gap-2.5 items-start">
                        <span className="w-5 h-5 rounded-full bg-brand-blue/5 border border-brand-blue/15 flex items-center justify-center text-brand-blue flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3" strokeWidth={2.5} />
                        </span>
                        <span className="pt-0.5 leading-snug">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "itinerary" && (
              <div className="space-y-6 text-left">
                <h3 className="font-heading text-sm font-extrabold text-slate-900 uppercase">
                  Day-by-Day Chronicle Itinerary
                </h3>
                <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-8 py-2">
                  {pkg.itinerary.map((item) => (
                    <div key={item.day} className="relative group">
                      {/* Circle Dot with dynamic spring feel */}
                      <span className="absolute -left-10 top-0.5 w-7 h-7 rounded-full bg-brand-blue text-white flex items-center justify-center text-[10px] font-extrabold shadow-md shadow-brand-blue/20 group-hover:bg-brand-red transition-all duration-300 group-hover:scale-110">
                        {item.day}
                      </span>
                      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-2">
                        <h4 className="font-heading text-xs font-extrabold uppercase text-slate-950 tracking-wider">
                          Day {item.day}: {item.title}
                        </h4>
                        <p className="text-xs text-slate-550 leading-relaxed font-light font-sans">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "inclusions" && (
              <div className="space-y-6 text-left">
                <h3 className="font-heading text-sm font-extrabold text-slate-900 uppercase">
                  What is included in Rs. {pkg.price.toLocaleString()}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
                  {pkg.inclusions.map((inc, i) => (
                    <div
                      key={i}
                      className="flex gap-2.5 items-center bg-slate-50 p-4 rounded-xl border border-slate-150 hover:bg-slate-100/50 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" strokeWidth={2.5} />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
