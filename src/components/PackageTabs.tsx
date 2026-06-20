"use client";

import { useState } from "react";
import { 
  Check, 
  X, 
  Calendar, 
  Eye, 
  ClipboardList, 
  BookOpen, 
  ShieldAlert, 
  ChevronDown, 
  ChevronUp,
  FileCheck,
  Building,
  PlaneTakeoff,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { OutboundPackage } from "@/types";
import Link from "next/link";

interface Props {
  pkg: OutboundPackage;
}

type TabType = "overview" | "itinerary" | "inclusions" | "visa" | "terms";

export default function PackageTabs({ pkg }: Props) {
  const showInclusions = pkg.id !== "pkg-8" && pkg.id !== "pkg-11";
  const showVisa = pkg.visaChecklist && pkg.visaChecklist.length > 0;
  const showTerms = pkg.termsAndConditions && pkg.termsAndConditions.length > 0;

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  
  // State for collapsible day accordions
  const [expandedDays, setExpandedDays] = useState<number[]>([1]); // Day 1 expanded by default

  const toggleDay = (day: number) => {
    if (expandedDays.includes(day)) {
      setExpandedDays(expandedDays.filter(d => d !== day));
    } else {
      setExpandedDays([...expandedDays, day]);
    }
  };

  const expandAll = () => {
    setExpandedDays(pkg.itinerary.map(item => item.day));
  };

  const collapseAll = () => {
    setExpandedDays([]);
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "itinerary", label: "Itinerary", icon: Calendar },
    ...(showInclusions ? [{ id: "inclusions", label: "Inclusions", icon: ClipboardList }] : []),
    ...(showVisa ? [{ id: "visa", label: "Visa Rules", icon: BookOpen }] : []),
    ...(showTerms ? [{ id: "terms", label: "Terms & Cancellation", icon: ShieldAlert }] : []),
  ];

  return (
    <div className="space-y-8">
      
      {/* Dynamic Tab Selector Headers */}
      <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-6 font-heading">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 pb-4 text-xs font-bold uppercase tracking-wider transition-all relative cursor-pointer whitespace-nowrap ${
                isActive ? "text-brand-blue font-black" : "text-slate-400 hover:text-slate-700"
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
      <div className="min-h-[350px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            
            {/* Tab: Overview & Highlights */}
            {activeTab === "overview" && (
              <div className="space-y-8 text-left">
                
                {/* Accommodation and Airline badging */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pkg.hotelCategory && (
                    <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl flex items-center gap-3">
                      <Building className="w-5 h-5 text-brand-blue" strokeWidth={2} />
                      <div className="leading-tight">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block">Hotel Category</span>
                        <span className="text-xs font-extrabold text-slate-800">{pkg.hotelCategory} Standards</span>
                      </div>
                    </div>
                  )}
                  {pkg.airline && (
                    <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl flex items-center gap-3">
                      <PlaneTakeoff className="w-5 h-5 text-brand-blue" strokeWidth={2} />
                      <div className="leading-tight">
                        <span className="text-[9px] uppercase font-bold text-slate-400 block">Airline / Transit</span>
                        <span className="text-xs font-extrabold text-slate-800">{pkg.airline}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Highlights */}
                <div className="space-y-4">
                  <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-slate-900">
                    Expedition Highlights
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-650">
                    {pkg.highlights.map((hl, i) => (
                      <li key={i} className="flex gap-2.5 items-start">
                        <span className="w-5 h-5 rounded-full bg-brand-blue/5 border border-brand-blue/15 flex items-center justify-center text-brand-blue flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <span className="pt-0.5 leading-relaxed">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab: Day-by-Day Itinerary */}
            {activeTab === "itinerary" && (
              <div className="space-y-6 text-left">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-slate-900">
                    Day-by-Day Chronicle Itinerary
                  </h3>
                  <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <button onClick={expandAll} className="hover:text-brand-blue cursor-pointer">Expand All</button>
                    <span>&bull;</span>
                    <button onClick={collapseAll} className="hover:text-brand-blue cursor-pointer">Collapse All</button>
                  </div>
                </div>

                {/* Itinerary Status Alerts */}
                {pkg.id === "pkg-14" && (
                  <div className="bg-amber-50 border border-amber-200/80 p-4 rounded-xl text-xs text-amber-800 leading-relaxed font-semibold">
                    ⚠️ Summary / Partial Itinerary (Days 3 to 7 represent transit and leisure programs which are fully structured and confirmed on GDS seat vouchers upon booking request).
                  </div>
                )}

                <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6 py-2">
                  {pkg.itinerary.map((item) => {
                    const isExpanded = expandedDays.includes(item.day);
                    return (
                      <div key={item.day} className="relative group">
                        
                        {/* Circle Dot Indicator */}
                        <button
                          onClick={() => toggleDay(item.day)}
                          className={`absolute -left-10 top-0.5 w-7 h-7 rounded-full text-white flex items-center justify-center text-[10px] font-extrabold shadow-md transition-all duration-300 hover:scale-110 cursor-pointer ${
                            isExpanded ? "bg-brand-blue shadow-brand-blue/20" : "bg-slate-400 shadow-slate-300"
                          }`}
                        >
                          {item.day}
                        </button>

                        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow">
                          {/* Accordion Trigger Row */}
                          <button
                            onClick={() => toggleDay(item.day)}
                            className="w-full p-5 flex items-center justify-between text-left cursor-pointer group/row"
                          >
                            <h4 className="font-heading text-xs font-extrabold uppercase text-slate-950 tracking-wider">
                              Day {item.day}: {item.title}
                            </h4>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-slate-450 group-hover/row:text-brand-blue" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-405 group-hover/row:text-brand-blue" />
                            )}
                          </button>

                          {/* Accordion Content Panel */}
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="px-5 pb-5 border-t border-slate-100 pt-4 text-xs text-slate-550 leading-relaxed font-light font-sans text-left">
                                  {item.description}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab: Inclusions & Exclusions */}
            {activeTab === "inclusions" && (
              <div className="space-y-8 text-left">
                
                {/* Inclusions */}
                <div className="space-y-4">
                  <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-slate-950 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" strokeWidth={3} /> What is Included
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-650">
                    {pkg.inclusions.map((inc, i) => (
                      <div
                        key={i}
                        className="flex gap-2.5 items-start bg-slate-50 p-4 rounded-xl border border-slate-200/60 hover:bg-slate-100/30 transition-colors"
                      >
                        <Check className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="leading-relaxed">{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exclusions */}
                {pkg.exclusions && pkg.exclusions.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-slate-950 flex items-center gap-2">
                      <X className="w-4 h-4 text-brand-red" strokeWidth={3} /> What is Excluded
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-650">
                      {pkg.exclusions.map((exc, i) => (
                        <div
                          key={i}
                          className="flex gap-2.5 items-start bg-slate-50 p-4 rounded-xl border border-slate-200/60 hover:bg-slate-100/30 transition-colors"
                        >
                          <X className="w-4.5 h-4.5 text-brand-red flex-shrink-0 mt-0.5" strokeWidth={3} />
                          <span className="leading-relaxed">{exc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Visa Checklist Details */}
            {activeTab === "visa" && pkg.visaChecklist && (
              <div className="space-y-6 text-left">
                <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-slate-900">
                      Visa Documentation Checklist
                    </h3>
                    <p className="text-[10px] text-slate-400 font-light mt-0.5">Vetted criteria for this package application</p>
                  </div>
                  {pkg.region === "Europe" && (
                    <Link
                      href="/visa-info"
                      className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-brand-gold hover:text-brand-gold/85"
                    >
                      Plan Europe Visa
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

                <div className="bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl space-y-4">
                  <ul className="space-y-3.5 text-xs text-slate-650 font-semibold">
                    {pkg.visaChecklist.map((checkStr, i) => (
                      <li key={i} className="flex gap-3 items-start leading-relaxed">
                        <FileCheck className="w-4.5 h-4.5 text-brand-blue flex-shrink-0 mt-0.5" strokeWidth={2} />
                        <span>{checkStr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab: Terms & Cancellation */}
            {activeTab === "terms" && pkg.termsAndConditions && (
              <div className="space-y-6 text-left">
                <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-3">
                  Package Terms & Cancellation Policy
                </h3>
                <div className="bg-slate-50 border border-slate-200/80 p-6 sm:p-8 rounded-2xl space-y-4">
                  <ul className="space-y-3.5 text-xs text-slate-650 font-semibold">
                    {pkg.termsAndConditions.map((termStr, i) => (
                      <li key={i} className="flex gap-3 items-start leading-relaxed">
                        <ShieldAlert className="w-4.5 h-4.5 text-brand-red flex-shrink-0 mt-0.5" strokeWidth={2} />
                        <span>{termStr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
