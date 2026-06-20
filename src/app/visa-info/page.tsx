"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Briefcase, 
  FolderHeart, 
  DollarSign, 
  Users, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowLeft, 
  GraduationCap, 
  UserCheck, 
  CalendarDays, 
  FileCheck 
} from "lucide-react";

type TabType = "personal" | "purpose" | "employment" | "financial" | "minors" | "advisories";
type JobTabType = "self-employed" | "employed" | "student" | "retired";

export default function VisaInfoPage() {
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [activeJobTab, setActiveJobTab] = useState<JobTabType>("self-employed");

  const tabs = [
    { id: "personal", label: "Personal & Family", icon: FolderHeart },
    { id: "purpose", label: "Travel & Purpose", icon: CalendarDays },
    { id: "employment", label: "Employment Vetting", icon: Briefcase },
    { id: "financial", label: "Financial Vetting", icon: DollarSign },
    { id: "minors", label: "Accompanying Minors", icon: Users },
    { id: "advisories", label: "Vaccine & Advisories", icon: ShieldAlert },
  ];

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 font-sans min-h-screen pb-20">
      
      {/* Cinematic Header */}
      <section className="relative h-[40vh] min-h-[320px] w-full flex items-center justify-center overflow-hidden text-white bg-slate-950">
        <Image
          src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1600&auto=format&fit=crop"
          alt="Schengen Visa planning concept"
          fill
          priority
          sizes="100vw"
          className="object-cover pointer-events-none opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-slate-950/30 to-slate-950 pointer-events-none"></div>
        
        <div className="max-w-7xl w-full mx-auto px-8 relative z-10 text-center space-y-4 pt-10">
          <Link
            href="/visa-services"
            className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Visa Hub
          </Link>
          <span className="text-[10px] font-extrabold tracking-widest text-brand-gold bg-slate-900 border border-slate-800 px-3 py-1 rounded-full uppercase block max-w-fit mx-auto">
            Schengen & Europe Planning
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-black tracking-tight uppercase leading-none text-white">
            Plan Your <span className="text-brand-gold">Europe Visa</span>
          </h1>
          <p className="text-xs text-slate-350 leading-relaxed font-light max-w-lg mx-auto">
            Review the official consolidated checklist of documents required to process a Short-Stay Schengen or European tourist visa from Nepal.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Navigation Tabs list */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 p-5 rounded-2xl shadow-sm space-y-2">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block px-3 mb-2">Checklist Chapters</span>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left text-xs font-bold uppercase tracking-wide transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-brand-blue border-brand-blue text-white shadow-md shadow-brand-blue/15"
                    : "bg-transparent border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon className="w-4.5 h-4.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right Side: Tab Panel Content */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 p-6 sm:p-10 rounded-2xl shadow-sm min-h-[450px] relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6 text-left"
            >
              
              {/* Tab: Personal & Family */}
              {activeTab === "personal" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-heading text-lg font-black text-slate-900 uppercase">A. Personal Identification Documents</h3>
                    <p className="text-xs text-slate-400 font-light mt-0.5">Core proof-of-identity documents required for all passport holders.</p>
                  </div>
                  <ul className="space-y-3.5 text-xs text-slate-650 font-semibold">
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-brand-blue flex items-center justify-center flex-shrink-0 font-mono mt-0.5">01</span>
                      <div>
                        <span className="text-slate-900 font-bold block">Current & Old Passports</span>
                        <span className="text-slate-500 font-light">Original current passport valid for at least 7 months from the travel date with at least 2 blank pages, plus all previous physical passport books.</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-brand-blue flex items-center justify-center flex-shrink-0 font-mono mt-0.5">02</span>
                      <div>
                        <span className="text-slate-900 font-bold block">Nepali Citizenship & Certificates</span>
                        <span className="text-slate-500 font-light">Notarized English translation copies of your citizenship certificate, birth certificate, and relation letters.</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-brand-blue flex items-center justify-center flex-shrink-0 font-mono mt-0.5">03</span>
                      <div>
                        <span className="text-slate-900 font-bold block">Accompanying Spouse Registration</span>
                        <span className="text-slate-500 font-light">Notarized copy of official marriage registration certificate if your spouse is traveling with you.</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-brand-blue flex items-center justify-center flex-shrink-0 font-mono mt-0.5">04</span>
                      <div>
                        <span className="text-slate-900 font-bold block">Accompanying Family Details</span>
                        <span className="text-slate-500 font-light">Relationship verification certificates showing names, dates of birth, and relation types.</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-brand-blue flex items-center justify-center flex-shrink-0 font-mono mt-0.5">05</span>
                      <div>
                        <span className="text-slate-900 font-bold block">Prior Travel Records</span>
                        <span className="text-slate-500 font-light">Scanned pages of prior e-visas or letters concerning previous visa refusals (if applicable).</span>
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {/* Tab: Travel & Purpose */}
              {activeTab === "purpose" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-heading text-lg font-black text-slate-900 uppercase">B. Purpose of Travel Documents</h3>
                    <p className="text-xs text-slate-400 font-light mt-0.5">Vetting parameters verifying the legitimacy of your flight itinerary and purpose.</p>
                  </div>
                  <ul className="space-y-3.5 text-xs text-slate-650 font-semibold">
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-brand-blue flex items-center justify-center flex-shrink-0 font-mono mt-0.5">01</span>
                      <div>
                        <span className="text-slate-900 font-bold block">Detailed Travel Plan</span>
                        <span className="text-slate-500 font-light">Day-by-day sightseeing calendar, indicating arrival and departure schedules matching flight bookings.</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-brand-blue flex items-center justify-center flex-shrink-0 font-mono mt-0.5">02</span>
                      <div>
                        <span className="text-slate-900 font-bold block">Host Invitation Letter</span>
                        <span className="text-slate-500 font-light">Official invitation from host organization or individual in Europe, including contact details and address proof.</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-brand-blue flex items-center justify-center flex-shrink-0 font-mono mt-0.5">03</span>
                      <div>
                        <span className="text-slate-900 font-bold block">Conference / Exhibition Proof</span>
                        <span className="text-slate-500 font-light">Valid registration tickets, badges, or payment receipts for events or trade shows being attended in the destination country.</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-brand-blue flex items-center justify-center flex-shrink-0 font-mono mt-0.5">04</span>
                      <div>
                        <span className="text-slate-900 font-bold block">Local Contact Details</span>
                        <span className="text-slate-500 font-light">Addresses and contact numbers of companies or organizations to be visited.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {/* Tab: Employment Status */}
              {activeTab === "employment" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-heading text-lg font-black text-slate-900 uppercase">C. Employment-Status Documentation</h3>
                    <p className="text-xs text-slate-400 font-light mt-0.5">Verify your professional ties in Nepal. Select your category below:</p>
                  </div>

                  {/* Sub Job Tabs */}
                  <div className="flex border-b border-slate-200 overflow-x-auto gap-4 py-1.5 text-xs font-semibold">
                    {(["self-employed", "employed", "student", "retired"] as JobTabType[]).map((job) => (
                      <button
                        key={job}
                        onClick={() => setActiveJobTab(job)}
                        className={`pb-2.5 uppercase tracking-wider relative whitespace-nowrap cursor-pointer ${
                          activeJobTab === job ? "text-brand-blue font-bold border-b-2 border-brand-blue" : "text-slate-400 hover:text-slate-700"
                        }`}
                      >
                        {job.replace("-", " ")}
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 p-5 sm:p-7 rounded-2xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeJobTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Sub Tab: Self Employed */}
                        {activeJobTab === "self-employed" && (
                          <ul className="space-y-3 text-xs text-slate-650">
                            <li className="flex gap-2 items-center font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                              <UserCheck className="w-4.5 h-4.5 text-brand-blue" /> Business Owners Checklist
                            </li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> Cover letter describing company role</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> Company registration certificate/license</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> PAN/VAT registration certificate</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> Share deed documents showing shareholdings</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> 3 Years' business tax clearance certificates</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> 2 Years' personal tax clearance certificates</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> 3 Years' company audit reports</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> 6 Months' business bank statement (Overdraft limits not accepted)</li>
                          </ul>
                        )}

                        {/* Sub Tab: Employed */}
                        {activeJobTab === "employed" && (
                          <ul className="space-y-3 text-xs text-slate-650">
                            <li className="flex gap-2 items-center font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                              <UserCheck className="w-4.5 h-4.5 text-brand-blue" /> Salaried Employees Checklist
                            </li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> Cover letter from applicant</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> Employment verification letter (stating position, salary, joining date)</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> Approved leave approval letter from employer</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> 6 Months' salary pay slips</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> 6 Months' salary bank statements</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> Personal PAN registration certificate</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> 3 Years' personal tax clearance certificates</li>
                          </ul>
                        )}

                        {/* Sub Tab: Student */}
                        {activeJobTab === "student" && (
                          <ul className="space-y-3 text-xs text-slate-650">
                            <li className="flex gap-2 items-center font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                              <GraduationCap className="w-4.5 h-4.5 text-brand-blue" /> School & College Students Checklist
                            </li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> Cover letter stating school/college coordinates</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> Valid Student ID Card</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> No Objection / Leave letter from school principal/college dean (clearly stating registration numbers)</li>
                          </ul>
                        )}

                        {/* Sub Tab: Retired */}
                        {activeJobTab === "retired" && (
                          <ul className="space-y-3 text-xs text-slate-650">
                            <li className="flex gap-2 items-center font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                              <UserCheck className="w-4.5 h-4.5 text-brand-blue" /> Retired Persons Checklist
                            </li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> Cover letter outlining current retirement status</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> Official Pension book / Pension Certificate</li>
                            <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" /> 6 Months' pension account bank statements</li>
                          </ul>
                        )}

                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Tab: Financial Vetting */}
              {activeTab === "financial" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-heading text-lg font-black text-slate-900 uppercase">D. Financial Verification & Photos</h3>
                    <p className="text-xs text-slate-400 font-light mt-0.5">Required financial assets backing visa processing validation.</p>
                  </div>
                  <ul className="space-y-3.5 text-xs text-slate-650 font-semibold">
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-brand-blue flex items-center justify-center flex-shrink-0 font-mono mt-0.5">01</span>
                      <div>
                        <span className="text-slate-900 font-bold block">Personal & Business Bank Statements</span>
                        <span className="text-slate-500 font-light">Original bank statements of last 6 months showing consistent transactions, with a minimum closing balance of 10 to 15 Lakhs NPR per applicant.</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-brand-blue flex items-center justify-center flex-shrink-0 font-mono mt-0.5">02</span>
                      <div>
                        <span className="text-slate-900 font-bold block">Euro Balance Certificate</span>
                        <span className="text-slate-500 font-light">Official bank balance certificate indicating Euro equivalent conversion rates.</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-brand-blue flex items-center justify-center flex-shrink-0 font-mono mt-0.5">03</span>
                      <div>
                        <span className="text-slate-900 font-bold block">Secondary Asset Liquidity</span>
                        <span className="text-slate-500 font-light">Notarized copies of Fixed Deposits (FD), stock holdings certificates, or shares valuation certificates (optional but recommended).</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-brand-blue flex items-center justify-center flex-shrink-0 font-mono mt-0.5">04</span>
                      <div>
                        <span className="text-slate-900 font-bold block">Property Valuation & Lalpurja</span>
                        <span className="text-slate-500 font-light">Certified property valuation reports in English alongside notarized property title deeds (Lalpurja) and lease contracts.</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-brand-blue flex items-center justify-center flex-shrink-0 font-mono mt-0.5">05</span>
                      <div>
                        <span className="text-slate-900 font-bold block">Passport Photo Parameters</span>
                        <span className="text-slate-500 font-light">2 recent color photos (35x45mm) with white background, displaying clear face focus, without borders, glasses, or head coverings.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {/* Tab: Accompanying Minors */}
              {activeTab === "minors" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-heading text-lg font-black text-slate-900 uppercase">E. Children Under 18 Years</h3>
                    <p className="text-xs text-slate-400 font-light mt-0.5">Additional verification files required for applicants under the age of 18.</p>
                  </div>
                  <ul className="space-y-3.5 text-xs text-slate-650 font-semibold">
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-brand-blue flex items-center justify-center flex-shrink-0 font-mono mt-0.5">01</span>
                      <div>
                        <span className="text-slate-900 font-bold block">Notarized Consent (NOC) Letter</span>
                        <span className="text-slate-500 font-light">If the child is traveling alone or with only one parent, a notarized No-Objection Certificate from the non-accompanying parent is required, alongside their passport copy.</span>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 text-brand-blue flex items-center justify-center flex-shrink-0 font-mono mt-0.5">02</span>
                      <div>
                        <span className="text-slate-900 font-bold block">Financial Sponsorship Declaration</span>
                        <span className="text-slate-500 font-light">An official, signed financial declaration and support letter from the sponsoring parent covering all travel costs.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {/* Tab: Vaccine & Advisories */}
              {activeTab === "advisories" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-heading text-lg font-black text-slate-900 uppercase">Embassy Advisories & Notes</h3>
                    <p className="text-xs text-slate-400 font-light mt-0.5">Crucial travel regulations and health requirements.</p>
                  </div>
                  
                  <div className="flex gap-3 bg-brand-gold/10 border border-brand-gold/30 p-5 rounded-xl text-xs text-slate-700 leading-relaxed">
                    <FileCheck className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block uppercase tracking-wider text-[10px] mb-1">Vaccinated QR Certification</span>
                      <p className="font-light">
                        Several European destinations continue to request fully vaccinated QR certificates. If required, compile your certificate via the Nepal Ministry of Health & Population online vaccine portal.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 bg-slate-100 border border-slate-250 p-5 rounded-xl text-xs text-slate-650 leading-relaxed">
                    <ShieldAlert className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block uppercase tracking-wider text-[10px] mb-1 text-slate-800">Direct VFS Vetting & Deadlines</span>
                      <p className="font-light">
                        Europe VFS appointment slots are highly competitive. We recommend compiling your documentation file at least 45 to 60 days before your intended departure date.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
