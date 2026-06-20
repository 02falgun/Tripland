"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, MessageSquareCode, MailCheck } from "lucide-react";
import settings from "../../data/siteSettings.json";

// Validation Schema
const schema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(6, "Please enter a valid WhatsApp/Phone number."),
  travelers: z.coerce.number().min(1, "At least 1 traveler required.").max(50, "For groups over 50, please email us directly."),
  date: z.string().min(1, "Please choose a target date."),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  targetPackage?: string;
}

export default function InquiryForm({ targetPackage }: Props) {
  const [success, setSuccess] = useState(false);
  const [method, setMethod] = useState<"whatsapp" | "email">("whatsapp");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      travelers: 1,
      date: "",
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    // Generate text formatting
    const greeting = `*TRIPLAND LUXURY INQUIRY*\n`;
    const tripDetails = targetPackage ? `*Selected Expedition:* ${targetPackage}\n` : `*Selected Expedition:* Custom Private Tour\n`;
    const body = `*Name:* ${data.fullName}\n*Email:* ${data.email}\n*WhatsApp/Phone:* ${data.phone}\n*Travelers:* ${data.travelers}\n*Desired Date:* ${data.date}\n*Preferences/Message:* ${data.message || "None specified"}`;
    
    const fullText = `${greeting}${tripDetails}${body}`;

    if (method === "whatsapp") {
      const cleanedNumber = settings.whatsappNumber.replace(/[+\s\-()]/g, "");
      const waUrl = `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(fullText)}`;
      window.open(waUrl, "_blank");
    } else {
      const emailSubject = encodeURIComponent(targetPackage ? `Luxury Inquiry: ${targetPackage}` : "Custom Himalayan Luxury Inquiry");
      const mailtoUrl = `mailto:${settings.contactEmail}?subject=${emailSubject}&body=${encodeURIComponent(fullText)}`;
      window.open(mailtoUrl, "_blank");
    }

    setSuccess(true);
    reset();
  };

  if (success) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="flex justify-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-pulse" strokeWidth={1.2} />
        </div>
        <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          Inquiry Redirected
        </h4>
        <p className="text-[11px] text-slate-500 leading-relaxed max-w-sm mx-auto font-light">
          We have compiled your custom itinerary proposal. If the tab did not open, click the button below to retry.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="px-6 py-2.5 border border-[#e2dfd8] dark:border-slate-800 rounded-none text-[9px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-350 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          New Proposal
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
      {/* Selection Mode tabs */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-slate-50 border border-slate-200 rounded-lg">
        <button
          type="button"
          onClick={() => setMethod("whatsapp")}
          className={`flex items-center justify-center gap-1.5 py-2 text-[9px] font-extrabold uppercase tracking-widest rounded transition-all cursor-pointer ${
            method === "whatsapp" ? "bg-white shadow text-slate-950 font-black" : "text-slate-500"
          }`}
        >
          <MessageSquareCode className="w-4 h-4 text-emerald-600" strokeWidth={2} />
          WhatsApp
        </button>
        <button
          type="button"
          onClick={() => setMethod("email")}
          className={`flex items-center justify-center gap-1.5 py-2 text-[9px] font-extrabold uppercase tracking-widest rounded transition-all cursor-pointer ${
            method === "email" ? "bg-white shadow text-slate-950 font-black" : "text-slate-500"
          }`}
        >
          <MailCheck className="w-4 h-4 text-blue-500" strokeWidth={2} />
          Secure Email
        </button>
      </div>

      {/* Name */}
      <div className="space-y-1">
        <label className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block">
          Full Name
        </label>
        <input
          type="text"
          {...register("fullName")}
          placeholder="E.g. Lord Alexander"
          className="w-full px-0 py-2 bg-transparent border-b border-slate-200 text-xs focus:outline-none focus:border-brand-blue text-slate-800 rounded-none transition-all placeholder-slate-350"
        />
        {errors.fullName && (
          <span className="text-[9px] text-brand-red mt-1 block font-semibold">{errors.fullName.message}</span>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block">
          Email Address
        </label>
        <input
          type="email"
          {...register("email")}
          placeholder="E.g. alex@example.com"
          className="w-full px-0 py-2 bg-transparent border-b border-slate-200 text-xs focus:outline-none focus:border-brand-blue text-slate-800 rounded-none transition-all placeholder-slate-350"
        />
        {errors.email && (
          <span className="text-[9px] text-brand-red mt-1 block font-semibold">{errors.email.message}</span>
        )}
      </div>

      {/* Phone/Whatsapp */}
      <div className="space-y-1">
        <label className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block">
          WhatsApp / Phone
        </label>
        <input
          type="text"
          {...register("phone")}
          placeholder="E.g. +977 9801126300"
          className="w-full px-0 py-2 bg-transparent border-b border-slate-200 text-xs focus:outline-none focus:border-brand-blue text-slate-800 rounded-none transition-all placeholder-slate-350"
        />
        {errors.phone && (
          <span className="text-[9px] text-brand-red mt-1 block font-semibold">{errors.phone.message}</span>
        )}
      </div>

      {/* Travelers & Date */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block">
            Travelers
          </label>
          <input
            type="number"
            {...register("travelers")}
            className="w-full px-0 py-2 bg-transparent border-b border-slate-200 text-xs focus:outline-none focus:border-brand-blue text-slate-800 rounded-none transition-all"
          />
          {errors.travelers && (
            <span className="text-[9px] text-brand-red mt-1 block font-semibold">{errors.travelers.message}</span>
          )}
        </div>
        <div className="space-y-1">
          <label className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block">
            Target Date
          </label>
          <input
            type="date"
            {...register("date")}
            className="w-full px-0 py-2 bg-transparent border-b border-slate-200 text-xs focus:outline-none focus:border-brand-blue text-slate-800 rounded-none transition-all uppercase"
          />
          {errors.date && (
            <span className="text-[9px] text-brand-red mt-1 block font-semibold">{errors.date.message}</span>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1">
        <label className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block">
          Special Preferences
        </label>
        <textarea
          rows={2}
          {...register("message")}
          placeholder="E.g. Flight preference, extra luggage, tourist guide requirements..."
          className="w-full px-0 py-2 bg-transparent border-b border-slate-200 text-xs focus:outline-none focus:border-brand-blue text-slate-800 rounded-none resize-none leading-relaxed transition-all placeholder-slate-350"
        ></textarea>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 text-[10px] font-bold uppercase tracking-widest text-white bg-brand-red hover:bg-brand-red/90 rounded-lg shadow-lg hover:shadow-brand-red/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-2"
      >
        <Send className="w-3.5 h-3.5" strokeWidth={2} />
        {method === "whatsapp" ? "Connect via WhatsApp" : "Compile Secure Email"}
      </button>
    </form>
  );
}
