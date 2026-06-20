import Image from "next/image";
import Link from "next/link";
import { Compass, ShieldCheck, Heart, Award } from "lucide-react";

export const metadata = {
  title: "Our Story & Credentials | TripLand Travels & Tours",
  description: "Learn about TripLand, Nepal's premiere IATA accredited travel agent and outbound tour operator. 18 years of trust and service commitment.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      {/* Header Banner */}
      <div className="bg-brand-blue text-white py-12 px-8 text-center border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-gold">
            About TripLand Travels
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-black mt-2 mb-4 uppercase tracking-wide">
            18 Years of Trust & Excellence
          </h1>
          <p className="text-sm text-slate-300 max-w-md mx-auto font-light leading-relaxed">
            IATA Accredited Agent committed to cheap flight ticketing, all-inclusive tour packages, and visa documentation.
          </p>
        </div>
      </div>

      {/* Main Story Content */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="space-y-6 text-left">
            <span className="text-[11px] font-extrabold tracking-widest uppercase text-brand-blue block">
              Company Biography
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-black text-slate-900 uppercase">
              Accredited Himalayan Ticketing Agency
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed font-light font-sans">
              Founded with the commitment to simplify travel and ticketing, TripLand Travels & Tours P. LTD has grown to become a premier travel company in Kathmandu. Over the past 18 years, we have served thousands of travelers, corporate entities, and adventurers.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed font-light font-sans">
              As an accredited IATA Agent, we have direct booking queues with global airlines, giving us first-hand access to the cheapest air tickets. In addition, our experienced visa desk helps prepare tourist application visa files for Dubai, Japan, Schengen Europe, and Hong Kong, maintaining high approval success ratios.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 text-xs font-semibold text-slate-700">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" strokeWidth={1.8} />
                <div>
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900">
                    IATA Accredited
                  </h4>
                  <p className="text-[10px] text-slate-400 font-light mt-0.5 leading-snug">
                    Licensed to issue airline tickets on the spot.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Award className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" strokeWidth={1.8} />
                <div>
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-900">
                    18-Year Legacy
                  </h4>
                  <p className="text-[10px] text-slate-400 font-light mt-0.5 leading-snug">
                    Respected business reputation in Ratopul, Kathmandu.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative h-[400px] rounded overflow-hidden border border-slate-200 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop"
              alt="Himalayan range peaks flight view"
              fill
              sizes="(max-w-768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-16 px-8 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[11px] font-extrabold tracking-widest text-brand-blue uppercase mb-12 block">
            Our Service Foundations
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center p-4 space-y-3">
              <div className="w-12 h-12 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-blue shadow-sm">
                <Compass className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <h3 className="font-heading text-sm font-bold text-slate-900 uppercase tracking-wider">
                Cheap Ticketing
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs font-light">
                We utilize direct reservation software queries to find the cheapest flights and optimal routing timings.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 space-y-3">
              <div className="w-12 h-12 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-blue shadow-sm">
                <ShieldCheck className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <h3 className="font-heading text-sm font-bold text-slate-900 uppercase tracking-wider">
                Elite Customer Care
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs font-light">
                Our helpdesk supports you through date modifications, flight cancellations, and luggage re-routes.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 space-y-3">
              <div className="w-12 h-12 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-blue shadow-sm">
                <Heart className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <h3 className="font-heading text-sm font-bold text-slate-900 uppercase tracking-wider">
                Accurate Visas files
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs font-light">
                We review passport details and checklists before slot submission to ensure maximal embassy success.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
