"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTravelStore } from "@/store/travelStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  BedDouble,
  Palmtree,
  Calendar,
  Users,
  Briefcase,
  PhoneCall,
  Search,
} from "lucide-react";

// Flight form schema
const flightSchema = z.object({
  from: z.string().min(2, "Origin required"),
  to: z.string().min(2, "Destination required"),
  departDate: z.string().min(1, "Departure date required"),
  returnDate: z.string().optional(),
  pax: z.coerce.number().min(1).max(9),
  class: z.string(),
});

// Hotel quick-search schema
const hotelSchema = z.object({
  checkIn: z.string().min(1, "Check-in date required"),
  checkOut: z.string().min(1, "Check-out date required"),
  hotel: z.string().min(1, "Please select a hotel"),
});

// Holiday quick-search schema
const holidaySchema = z.object({
  destinationType: z.string().min(1, "Select destination type"),
  destination: z.string().min(1, "Please select a destination"),
});

type FlightFormData = z.infer<typeof flightSchema>;
type HotelFormData = z.infer<typeof hotelSchema>;
type HolidayFormData = z.infer<typeof holidaySchema>;

type TabType = "flights" | "hotels" | "holiday";

const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels", label: "Hotels", icon: BedDouble },
  { id: "holiday", label: "Holiday", icon: Palmtree },
];

export default function HeroSearchWidget() {
  const router = useRouter();
  const { hotels, holidayPackages, siteSettings } = useTravelStore();
  const [activeTab, setActiveTab] = useState<TabType>("flights");
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("roundtrip");

  // Flight form
  const {
    register: flightRegister,
    handleSubmit: handleFlightSubmit,
    formState: { errors: flightErrors },
  } = useForm({
    resolver: zodResolver(flightSchema),
    defaultValues: {
      from: "Kathmandu (KTM)",
      to: "",
      departDate: "",
      returnDate: "",
      pax: 1,
      class: "Economy",
    },
  });

  // Hotel form
  const {
    register: hotelRegister,
    handleSubmit: handleHotelSubmit,
    formState: { errors: hotelErrors },
  } = useForm<HotelFormData>({
    resolver: zodResolver(hotelSchema),
    defaultValues: {
      checkIn: "",
      checkOut: "",
      hotel: "",
    },
  });

  // Holiday form
  const {
    register: holidayRegister,
    handleSubmit: handleHolidaySubmit,
    formState: { errors: holidayErrors },
    watch: holidayWatch,
  } = useForm<HolidayFormData>({
    resolver: zodResolver(holidaySchema),
    defaultValues: {
      destinationType: "",
      destination: "",
    },
  });

  const selectedType = holidayWatch("destinationType");

  // Flight submit → WhatsApp
  const onFlightSubmit = (data: FlightFormData) => {
    const greeting = `*TRIPLAND FLIGHT TICKET INQUIRY*\n`;
    const details = `*Trip Type:* ${tripType === "oneway" ? "One Way" : "Round Trip"}\n*From:* ${data.from}\n*To:* ${data.to}\n*Departure Date:* ${data.departDate}\n${tripType === "roundtrip" ? `*Return Date:* ${data.returnDate}\n` : ""}*Passengers:* ${data.pax} Person(s)\n*Class:* ${data.class}`;
    const text = encodeURIComponent(`${greeting}${details}`);
    const cleanedNumber = siteSettings.whatsappNumber.replace(/[+\s\-()]/g, "");
    window.open(`https://wa.me/${cleanedNumber}?text=${text}`, "_blank");
  };

  // Hotel submit → route to /hotels
  const onHotelSubmit = (data: HotelFormData) => {
    router.push(`/hotels?hotel=${encodeURIComponent(data.hotel)}&checkIn=${data.checkIn}&checkOut=${data.checkOut}`);
  };

  // Holiday submit → route to /holidays with type
  const onHolidaySubmit = (data: HolidayFormData) => {
    const type = data.destinationType === "inbound" ? "inbound" : "outbound";
    router.push(`/holidays?type=${type}`);
  };

  // Build destination options based on selected type
  const destinationOptions =
    selectedType === "inbound"
      ? holidayPackages.inbound.map((p) => ({
          value: p.id,
          label: `${p.title} - ${p.location}`,
        }))
      : selectedType === "outbound"
      ? holidayPackages.outbound.map((p) => ({
          value: p.id,
          label: `${p.title} - ${p.location}`,
        }))
      : [];

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 text-white p-6 sm:p-8 rounded-xl shadow-2xl relative group/widget">
      {/* Handwritten Floating Alert */}
      <div className="absolute -top-12 right-6 rotate-[4deg] font-handwritten text-2xl text-brand-gold hidden lg:flex items-center gap-1 select-none pointer-events-none drop-shadow">
        ✈️ Cheap ticketing agent!
      </div>

      {/* Tab Bar */}
      <div className="flex items-center gap-1.5 mb-6 border-b border-white/10 pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-brand-red text-white shadow-md"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {/* FLIGHTS TAB */}
          {activeTab === "flights" && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setTripType("roundtrip")}
                  className={`text-xs font-bold uppercase tracking-wider pb-3 border-b-2 transition-colors cursor-pointer ${
                    tripType === "roundtrip"
                      ? "border-brand-red text-brand-red"
                      : "border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  Round Trip
                </button>
                <button
                  type="button"
                  onClick={() => setTripType("oneway")}
                  className={`text-xs font-bold uppercase tracking-wider pb-3 border-b-2 transition-colors cursor-pointer ${
                    tripType === "oneway"
                      ? "border-brand-red text-brand-red"
                      : "border-transparent text-white/50 hover:text-white"
                  }`}
                >
                  One Way
                </button>
              </div>

              <form
                onSubmit={handleFlightSubmit(onFlightSubmit)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs text-left"
              >
                {/* Origin */}
                <div>
                  <label className="text-[10px] font-bold text-white/60 uppercase block mb-1">
                    Flying From
                  </label>
                  <div className="relative">
                    <Plane className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      {...flightRegister("from")}
                      className="w-full pl-9 pr-3 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white focus:bg-white/10 font-medium text-white placeholder-white/30"
                    />
                  </div>
                  {flightErrors.from && (
                    <span className="text-[10px] text-brand-red font-semibold">
                      {flightErrors.from.message}
                    </span>
                  )}
                </div>

                {/* Destination */}
                <div>
                  <label className="text-[10px] font-bold text-white/60 uppercase block mb-1">
                    Flying To
                  </label>
                  <div className="relative">
                    <Plane className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2 -rotate-45" />
                    <input
                      type="text"
                      required
                      placeholder="E.g. Dubai, Tokyo, Bangkok"
                      {...flightRegister("to")}
                      className="w-full pl-9 pr-3 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white focus:bg-white/10 font-medium text-white placeholder-white/30"
                    />
                  </div>
                  {flightErrors.to && (
                    <span className="text-[10px] text-brand-red font-semibold">
                      {flightErrors.to.message}
                    </span>
                  )}
                </div>

                {/* Dates */}
                <div>
                  <label className="text-[10px] font-bold text-white/60 uppercase block mb-1">
                    Departure Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      required
                      {...flightRegister("departDate")}
                      className="w-full pl-9 pr-3 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white focus:bg-white/10 font-semibold uppercase text-white placeholder-white/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-white/60 uppercase block mb-1">
                    Return Date {tripType === "oneway" && "(Disabled)"}
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      disabled={tripType === "oneway"}
                      {...flightRegister("returnDate")}
                      className="w-full pl-9 pr-3 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white focus:bg-white/10 font-semibold uppercase text-white disabled:opacity-40 disabled:bg-transparent placeholder-white/30"
                    />
                  </div>
                </div>

                {/* Pax & Class */}
                <div>
                  <label className="text-[10px] font-bold text-white/60 uppercase block mb-1">
                    Passengers
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      min={1}
                      max={9}
                      {...flightRegister("pax")}
                      className="w-full pl-9 pr-3 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white focus:bg-white/10 font-semibold text-white placeholder-white/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-white/60 uppercase block mb-1">
                    Class
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      {...flightRegister("class")}
                      className="w-full pl-9 pr-3 py-3 bg-slate-900 border border-white/10 rounded focus:outline-none focus:border-white font-semibold appearance-none text-white"
                    >
                      <option value="Economy" className="bg-slate-900 text-white">
                        Economy Class
                      </option>
                      <option value="Business" className="bg-slate-900 text-white">
                        Business Class
                      </option>
                      <option value="First" className="bg-slate-900 text-white">
                        First Class
                      </option>
                    </select>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="col-span-2 py-4 bg-brand-red hover:bg-brand-red/90 text-white rounded text-xs font-bold tracking-widest uppercase shadow-lg shadow-brand-red/20 hover:shadow-brand-red/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  Find Cheap Tickets & Get Quote (WhatsApp)
                </button>
              </form>
            </div>
          )}

          {/* HOTELS TAB */}
          {activeTab === "hotels" && (
            <form
              onSubmit={handleHotelSubmit(onHotelSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs text-left"
            >
              <div>
                <label className="text-[10px] font-bold text-white/60 uppercase block mb-1">
                  Check-In Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    {...hotelRegister("checkIn")}
                    className="w-full pl-9 pr-3 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white focus:bg-white/10 font-semibold uppercase text-white"
                  />
                </div>
                {hotelErrors.checkIn && (
                  <span className="text-[10px] text-brand-red font-semibold">
                    {hotelErrors.checkIn.message}
                  </span>
                )}
              </div>

              <div>
                <label className="text-[10px] font-bold text-white/60 uppercase block mb-1">
                  Check-Out Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    {...hotelRegister("checkOut")}
                    className="w-full pl-9 pr-3 py-3 bg-white/5 border border-white/10 rounded focus:outline-none focus:border-white focus:bg-white/10 font-semibold uppercase text-white"
                  />
                </div>
                {hotelErrors.checkOut && (
                  <span className="text-[10px] text-brand-red font-semibold">
                    {hotelErrors.checkOut.message}
                  </span>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold text-white/60 uppercase block mb-1">
                  Select Hotel
                </label>
                <div className="relative">
                  <BedDouble className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    {...hotelRegister("hotel")}
                    className="w-full pl-9 pr-3 py-3 bg-slate-900 border border-white/10 rounded focus:outline-none focus:border-white font-semibold appearance-none text-white cursor-pointer"
                  >
                    <option value="" className="bg-slate-900 text-white/50">
                      — Select a Hotel —
                    </option>
                    {hotels.map((hotel) => (
                      <option key={hotel.id} value={hotel.name} className="bg-slate-900 text-white">
                        {hotel.name} - {hotel.location}
                      </option>
                    ))}
                  </select>
                </div>
                {hotelErrors.hotel && (
                  <span className="text-[10px] text-brand-red font-semibold">
                    {hotelErrors.hotel.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="sm:col-span-2 py-4 bg-brand-red hover:bg-brand-red/90 text-white rounded text-xs font-bold tracking-widest uppercase shadow-lg shadow-brand-red/20 hover:shadow-brand-red/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search Hotels
              </button>
            </form>
          )}

          {/* HOLIDAY TAB */}
          {activeTab === "holiday" && (
            <form
              onSubmit={handleHolidaySubmit(onHolidaySubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs text-left"
            >
              <div>
                <label className="text-[10px] font-bold text-white/60 uppercase block mb-1">
                  Destination Type
                </label>
                <div className="relative">
                  <Palmtree className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    {...holidayRegister("destinationType")}
                    className="w-full pl-9 pr-3 py-3 bg-slate-900 border border-white/10 rounded focus:outline-none focus:border-white font-semibold appearance-none text-white cursor-pointer"
                  >
                    <option value="" className="bg-slate-900 text-white/50">
                      — Select Type —
                    </option>
                    <option value="inbound" className="bg-slate-900 text-white">
                      Inbound (Domestic)
                    </option>
                    <option value="outbound" className="bg-slate-900 text-white">
                      Outbound (International)
                    </option>
                  </select>
                </div>
                {holidayErrors.destinationType && (
                  <span className="text-[10px] text-brand-red font-semibold">
                    {holidayErrors.destinationType.message}
                  </span>
                )}
              </div>

              <div>
                <label className="text-[10px] font-bold text-white/60 uppercase block mb-1">
                  Select Destination
                </label>
                <div className="relative">
                  <Plane className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    {...holidayRegister("destination")}
                    disabled={!selectedType}
                    className="w-full pl-9 pr-3 py-3 bg-slate-900 border border-white/10 rounded focus:outline-none focus:border-white font-semibold appearance-none text-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <option value="" className="bg-slate-900 text-white/50">
                      {selectedType ? "— Select a Destination —" : "Select type first"}
                    </option>
                    {destinationOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                {holidayErrors.destination && (
                  <span className="text-[10px] text-brand-red font-semibold">
                    {holidayErrors.destination.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="sm:col-span-2 py-4 bg-brand-red hover:bg-brand-red/90 text-white rounded text-xs font-bold tracking-widest uppercase shadow-lg shadow-brand-red/20 hover:shadow-brand-red/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Explore Holidays
              </button>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

