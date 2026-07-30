"use client";

import { useState } from "react";
import Image from "next/image";
import { useTravelStore } from "@/store/travelStore";
import { Star, MapPin, PhoneCall, CalendarDays, Mail, User, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";

// Zod schema for hotel booking form
const bookingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(8, "Valid phone number required"),
  email: z.string().email("Valid email required"),
  address: z.string().min(2, "Address is required"),
  checkIn: z.string().min(1, "Check-in date required"),
  checkOut: z.string().min(1, "Check-out date required"),
  hotel: z.string().min(1, "Please select a hotel"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function HotelsPage() {
  const { hotels, siteSettings } = useTravelStore();
  const [enquiryHotel, setEnquiryHotel] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      checkIn: "",
      checkOut: "",
      hotel: "",
    },
  });

  const onSubmit = (data: BookingFormData) => {
    const greeting = `*TRIPLAND HOTEL BOOKING ENQUIRY*\n\n`;
    const details = `*Full Name:* ${data.fullName}\n*Phone:* ${data.phone}\n*Email:* ${data.email}\n*Address:* ${data.address}\n*Hotel:* ${data.hotel}\n*Check-In:* ${data.checkIn}\n*Check-Out:* ${data.checkOut}`;

    const text = encodeURIComponent(`${greeting}${details}`);
    const cleanedNumber = siteSettings.whatsappNumber.replace(/[+\s\-()]/g, "");
    window.open(`https://wa.me/${cleanedNumber}?text=${text}`, "_blank");

    reset();
  };

  const handleEnquire = (hotelName: string) => {
    const greeting = `*TRIPLAND HOTEL ENQUIRY*\n\n`;
    const details = `*Hotel Interested In:* ${hotelName}\n\nPlease contact me with more details about this hotel.`;

    const text = encodeURIComponent(`${greeting}${details}`);
    const cleanedNumber = siteSettings.whatsappNumber.replace(/[+\s\-()]/g, "");
    window.open(`https://wa.me/${cleanedNumber}?text=${text}`, "_blank");
  };

  return (
    <div className="pt-28 pb-20 bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      {/* Hero Banner */}
      <section className="relative py-20 px-8 text-center text-white bg-slate-950 overflow-hidden border-b border-slate-900">
        <Image
          src="https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=1600&auto=format&fit=crop"
          alt="Luxury hotel lobby background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 pointer-events-none"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/55 via-transparent to-slate-950 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 space-y-3">
          <span className="text-[10px] font-extrabold tracking-widest uppercase text-brand-gold bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full inline-block">
            Curated Accommodations
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-black mt-2 mb-4 uppercase tracking-wide">
            Hotels & Resorts
          </h1>
          <p className="text-xs text-slate-300 max-w-lg mx-auto font-light leading-relaxed">
            Discover handpicked hotels and resorts across Nepal. From heritage palaces to modern luxury — we book the finest stays.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
        {/* Left: Hotel Listing Grid */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-slate-900">
              Featured Hotels
            </h2>
            <span className="text-[10px] font-semibold text-slate-400">{hotels.length} Properties</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotels.map((hotel, index) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (index % 6) * 0.05 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-slate-950/60 backdrop-blur-md text-white text-[9px] font-extrabold uppercase tracking-widest px-2 py-1 rounded-lg border border-white/10">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-brand-gold text-brand-gold" strokeWidth={1.5} />
                      {hotel.rating} Star
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col grow text-left">
                  <h3 className="font-heading text-sm font-black text-slate-900 uppercase tracking-wide mb-1">
                    {hotel.name}
                  </h3>
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 mb-3">
                    <MapPin className="w-3 h-3 text-brand-gold" strokeWidth={1.5} />
                    {hotel.location}
                  </span>
                  <div className="flex items-center gap-0.5 mb-3">
                    {Array.from({ length: hotel.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-brand-gold text-brand-gold"
                        strokeWidth={1.5}
                      />
                    ))}
                    {Array.from({ length: 5 - hotel.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 text-slate-300"
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 font-light leading-relaxed mb-4 grow">
                    {hotel.description}
                  </p>
                  <button
                    onClick={() => handleEnquire(hotel.name)}
                    className="w-full py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-brand-blue/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Enquire Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Booking Form Card */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl overflow-hidden sticky top-32">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="border-b border-white/10 pb-4 mb-6">
            <h3 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
              Hotel Booking Request
            </h3>
            <p className="text-[11px] text-slate-400 font-light mt-1">
              Submit your details and we will connect you via WhatsApp to confirm availability.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-xs text-left">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-white/55 uppercase block">
                <User className="w-3 h-3 inline mr-1" strokeWidth={1.5} />
                Full Name
              </label>
              <input
                type="text"
                {...register("fullName")}
                placeholder="E.g. Ram Sharma"
                className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 rounded-none focus:outline-none font-semibold text-white transition-all placeholder-white/30"
              />
              {errors.fullName && (
                <span className="text-[10px] text-brand-red font-semibold">{errors.fullName.message}</span>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-white/55 uppercase block">
                <PhoneCall className="w-3 h-3 inline mr-1" strokeWidth={1.5} />
                Phone / WhatsApp
              </label>
              <input
                type="text"
                {...register("phone")}
                placeholder="E.g. +977 9801126300"
                className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 rounded-none focus:outline-none font-semibold text-white transition-all placeholder-white/30"
              />
              {errors.phone && (
                <span className="text-[10px] text-brand-red font-semibold">{errors.phone.message}</span>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-white/55 uppercase block">
                <Mail className="w-3 h-3 inline mr-1" strokeWidth={1.5} />
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="E.g. ram@example.com"
                className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 rounded-none focus:outline-none font-semibold text-white transition-all placeholder-white/30"
              />
              {errors.email && (
                <span className="text-[10px] text-brand-red font-semibold">{errors.email.message}</span>
              )}
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-white/55 uppercase block">
                <MapPin className="w-3 h-3 inline mr-1" strokeWidth={1.5} />
                Address
              </label>
              <input
                type="text"
                {...register("address")}
                placeholder="E.g. Kathmandu, Nepal"
                className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 rounded-none focus:outline-none font-semibold text-white transition-all placeholder-white/30"
              />
              {errors.address && (
                <span className="text-[10px] text-brand-red font-semibold">{errors.address.message}</span>
              )}
            </div>

            {/* Check-in / Check-out */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-white/55 uppercase block">
                  <CalendarDays className="w-3 h-3 inline mr-1" strokeWidth={1.5} />
                  Check-In
                </label>
                <input
                  type="date"
                  {...register("checkIn")}
                  className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 rounded-none focus:outline-none font-semibold text-white transition-all uppercase"
                />
                {errors.checkIn && (
                  <span className="text-[10px] text-brand-red font-semibold">{errors.checkIn.message}</span>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-white/55 uppercase block">
                  <CalendarDays className="w-3 h-3 inline mr-1" strokeWidth={1.5} />
                  Check-Out
                </label>
                <input
                  type="date"
                  {...register("checkOut")}
                  className="w-full bg-transparent border-b border-white/20 focus:border-white py-2 rounded-none focus:outline-none font-semibold text-white transition-all uppercase"
                />
                {errors.checkOut && (
                  <span className="text-[10px] text-brand-red font-semibold">{errors.checkOut.message}</span>
                )}
              </div>
            </div>

            {/* Select Hotel Dropdown */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-white/55 uppercase block">
                <FileText className="w-3 h-3 inline mr-1" strokeWidth={1.5} />
                Select Hotel
              </label>
              <select
                {...register("hotel")}
                className="w-full bg-slate-900 border-b border-white/20 focus:border-white py-2.5 rounded-none focus:outline-none font-semibold text-white transition-all appearance-none cursor-pointer"
              >
                <option value="" className="bg-slate-900 text-white/50">— Select a Hotel —</option>
                {hotels.map((hotel) => (
                  <option key={hotel.id} value={hotel.name} className="bg-slate-900 text-white">
                    {hotel.name} ({hotel.location})
                  </option>
                ))}
              </select>
              {errors.hotel && (
                <span className="text-[10px] text-brand-red font-semibold">{errors.hotel.message}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-brand-red hover:bg-brand-red/90 text-white rounded-lg text-xs font-bold tracking-widest uppercase shadow-lg shadow-brand-red/20 hover:shadow-brand-red/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <PhoneCall className="w-4 h-4" />
              Send Booking Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

