"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useTravelStore } from "@/store/travelStore";
import { Plane, Calendar, Users, Briefcase, ShieldCheck, PhoneCall, Star, Ticket } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Zod validation
const flightSchema = z.object({
  from: z.string().min(2, "Origin required"),
  to: z.string().min(2, "Destination required"),
  departDate: z.string().min(1, "Departure date required"),
  returnDate: z.string().optional(),
  pax: z.coerce.number().min(1).max(9),
  class: z.string(),
  phone: z.string().min(8, "Contact number required"),
});

type FlightFormData = z.infer<typeof flightSchema>;

function FlightsContent() {
  const { flightDeals, siteSettings } = useTravelStore();
  const searchParams = useSearchParams();
  const initialRoute = searchParams ? searchParams.get("route") : null;

  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("roundtrip");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(flightSchema),
    defaultValues: {
      from: "Kathmandu (KTM)",
      to: initialRoute ? initialRoute.split(" to ")[1] || "" : "",
      departDate: "",
      returnDate: "",
      pax: 1,
      class: "Economy",
      phone: "",
    }
  });

  const onSubmitQuote = (data: FlightFormData) => {
    const greeting = `*TRIPLAND FLIGHT QUOTATION REQUEST*\n`;
    const details = `*Trip Type:* ${tripType === "oneway" ? "One Way" : "Round Trip"}\n*From:* ${data.from}\n*To:* ${data.to}\n*Departure:* ${data.departDate}\n${tripType === "roundtrip" ? `*Return:* ${data.returnDate}\n` : "" }*Passengers:* ${data.pax}\n*Class:* ${data.class}\n*Client Contact:* ${data.phone}`;
    
    const text = encodeURIComponent(`${greeting}${details}`);
    const cleanedNumber = siteSettings.whatsappNumber.replace(/[+\s\-()]/g, "");
    window.open(`https://wa.me/${cleanedNumber}?text=${text}`, "_blank");
  };

  const domestic = flightDeals.filter(f => f.type === "Domestic");
  const international = flightDeals.filter(f => f.type === "International");

  return (
    <div className="pt-28 pb-20 bg-[#f8fafc] text-slate-800 font-sans">
      {/* Title Header */}
      <div className="bg-slate-950 text-white py-12 px-8 text-center border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/30 via-slate-900/50 to-brand-red/20 opacity-80"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-gold">
            Accredited Ticketing Desk
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-black mt-2 mb-4 uppercase tracking-wide">
            Global Flight Ticketing
          </h1>
          <p className="text-sm text-slate-350 max-w-md mx-auto font-light leading-relaxed">
            Direct airline queues for the cheapest fares. Rescheduling support and group discounts.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
        {/* Left Column: High-energy Bouncing Typography & Massive Image */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold tracking-widest text-brand-blue uppercase block">Fly Anywhere</span>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-slate-950 uppercase leading-none tracking-tight">
              We Lock Fares <br />
              <span className="text-brand-red font-extrabold">Instantly</span>
            </h2>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Skip search engines. Our ticketing agents verify direct wholesale GDS queues to find unpublished flight deals for domestic and global travel routes.
            </p>
          </div>
          
          {/* Massive Thematic Image */}
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
            <Image
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop"
              alt="Passenger aircraft flying high above clouds"
              fill
              sizes="(max-w-768px) 100vw, 40vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Right Column: Glassmorphic Flight Form Widget */}
        <div className="lg:col-span-7 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="border-b border-white/10 pb-4 mb-6">
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">Flight Quote Request</h3>
            <p className="text-[11px] text-slate-400 font-light mt-1">Submit your travel parameters. We will direct you to WhatsApp to finalize pricing details.</p>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <button
              type="button"
              onClick={() => setTripType("roundtrip")}
              className={`text-[10px] font-bold uppercase tracking-wider pb-2 border-b-2 transition-colors cursor-pointer ${
                tripType === "roundtrip" ? "border-brand-red text-brand-red font-black" : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              Round Trip
            </button>
            <button
              type="button"
              onClick={() => setTripType("oneway")}
              className={`text-[10px] font-bold uppercase tracking-wider pb-2 border-b-2 transition-colors cursor-pointer ${
                tripType === "oneway" ? "border-brand-red text-brand-red font-black" : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              One Way
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmitQuote)} className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-left">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-white/55 uppercase block">Flying From</label>
              <input
                type="text"
                {...register("from")}
                className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 rounded-none focus:outline-none font-semibold text-white transition-all placeholder-white/30"
              />
              {errors.from && <span className="text-[10px] text-brand-red font-semibold">{errors.from.message}</span>}
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-white/55 uppercase block">Flying To</label>
              <input
                type="text"
                required
                placeholder="E.g. Dubai, Doha, Delhi"
                {...register("to")}
                className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 rounded-none focus:outline-none font-semibold text-white transition-all placeholder-white/30"
              />
              {errors.to && <span className="text-[10px] text-brand-red font-semibold">{errors.to.message}</span>}
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-white/55 uppercase block">Departure Date</label>
              <input
                type="date"
                required
                {...register("departDate")}
                className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 rounded-none focus:outline-none font-semibold text-white transition-all uppercase"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-white/55 uppercase block">Return Date</label>
              <input
                type="date"
                disabled={tripType === "oneway"}
                {...register("returnDate")}
                className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 rounded-none focus:outline-none font-semibold text-white transition-all uppercase disabled:opacity-30 disabled:border-white/10"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-white/55 uppercase block">Passengers</label>
              <input
                type="number"
                min={1}
                max={9}
                {...register("pax")}
                className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 rounded-none focus:outline-none font-semibold text-white transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-bold text-white/55 uppercase block">Travel Class</label>
              <select
                {...register("class")}
                className="w-full bg-slate-900 border-b border-white/20 focus:border-white py-2.5 rounded-none focus:outline-none font-semibold text-white transition-all appearance-none"
              >
                <option value="Economy" className="bg-slate-900 text-white">Economy</option>
                <option value="Business" className="bg-slate-900 text-white">Business</option>
                <option value="First" className="bg-slate-900 text-white">First Class</option>
              </select>
            </div>

            <div className="col-span-2 space-y-1">
              <label className="text-[9px] font-bold text-white/55 uppercase block">Your WhatsApp Number</label>
              <input
                type="text"
                required
                placeholder="E.g. +977 9801126300"
                {...register("phone")}
                className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 rounded-none focus:outline-none font-semibold text-white transition-all placeholder-white/30"
              />
              {errors.phone && <span className="text-[10px] text-brand-red font-semibold">{errors.phone.message}</span>}
            </div>

            <button
              type="submit"
              className="col-span-2 py-4 bg-brand-red hover:bg-brand-red/90 text-white rounded-lg text-xs font-bold tracking-widest uppercase shadow-lg shadow-brand-red/20 hover:shadow-brand-red/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <PhoneCall className="w-4 h-4" />
              Connect via WhatsApp
            </button>
          </form>
        </div>
      </div>

      {/* Flight deals grid displayed beautifully below the main split layout */}
      <section className="max-w-7xl mx-auto px-8 mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* International Deals */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-100 pb-2">
            International Ticket Deals
          </h3>
          <div className="divide-y divide-slate-100">
            {international.map((deal) => (
              <div key={deal.id} className="py-3.5 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-slate-900 block uppercase">{deal.route}</span>
                  <span className="text-[10px] text-slate-450 uppercase mt-0.5 block">{deal.airline} | {deal.baggageAllowance}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">From</span>
                  <span className="font-extrabold text-brand-blue text-sm">Rs. {deal.startingPrice.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Domestic Deals */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-950 border-b border-slate-100 pb-2">
            Domestic Ticket Deals
          </h3>
          <div className="divide-y divide-slate-100">
            {domestic.map((deal) => (
              <div key={deal.id} className="py-3.5 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-slate-900 block uppercase">{deal.route}</span>
                  <span className="text-[10px] text-slate-450 uppercase mt-0.5 block">{deal.airline} | {deal.baggageAllowance}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 block font-semibold uppercase">From</span>
                  <span className="font-extrabold text-brand-blue text-sm">Rs. {deal.startingPrice.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function FlightsPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-xs text-slate-500 uppercase">Loading Ticketing Hub...</div>}>
      <FlightsContent />
    </Suspense>
  );
}
