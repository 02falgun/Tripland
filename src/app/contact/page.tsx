import { Mail, Phone, MapPin, Globe } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";
import settings from "../../../data/siteSettings.json";

export const metadata = {
  title: "Contact & Location | TripLand Travels & Tours",
  description: "Get in touch with TripLand Travels in Kathmandu. Ask for flight booking, domestic or international ticketing, visa services, and outbound packages.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      {/* Header Banner */}
      <div className="bg-brand-blue text-white py-12 px-8 text-center border-b border-slate-200">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-gold">
            Support Desk
          </span>
          <h1 className="font-heading text-3xl md:text-5xl font-black mt-2 mb-4 uppercase tracking-wide">
            Get In Touch
          </h1>
          <p className="text-sm text-slate-305 max-w-md mx-auto font-light leading-relaxed">
            Reach out to our Ticketing, Tour, or Visa departments. Our typical response time is under 2 hours during operations.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <section className="py-16 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Coordinates Details (Left Column) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded shadow-sm space-y-6">
              <h3 className="font-heading text-sm font-bold text-slate-900 uppercase border-b border-slate-100 pb-2">
                TripLand HQ Office
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-blue flex-shrink-0">
                    <MapPin className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Mailing Address
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                      {settings.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-blue flex-shrink-0">
                    <Mail className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Email Queries
                    </span>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="text-xs font-bold text-brand-blue hover:underline"
                    >
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-blue flex-shrink-0">
                    <Phone className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Office Hotlines
                    </span>
                    <div className="space-y-1">
                      {settings.phoneNumbers.map((ph, idx) => (
                        <a
                          key={idx}
                          href={`tel:${ph}`}
                          className="text-xs font-bold text-slate-700 block hover:text-brand-blue"
                        >
                          {ph}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-blue flex-shrink-0">
                    <Globe className="w-4 h-4" strokeWidth={1.8} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      WhatsApp Operations
                    </span>
                    <a
                      href={`https://wa.me/${settings.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-600 block hover:underline"
                    >
                      +{settings.whatsappNumber}
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Assistance Notice */}
            <div className="bg-white border border-slate-200 rounded p-6 sm:p-8 shadow-sm">
              <h4 className="font-heading text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide">
                Corporate Ticketing & Group Bookings
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed font-light font-sans">
                For corporate flight ticketing, group charters, or complex multi-destination itineraries, send us a copy of passenger names directly via email or call our direct office hotline at 01-4599802.
              </p>
            </div>
          </div>

          {/* Form (Right Column) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 p-6 sm:p-8 md:p-10 rounded shadow-sm">
            <h3 className="font-heading text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider border-b border-slate-100 pb-2">
              Send Online Inquiry
            </h3>
            <p className="text-xs text-slate-500 mb-8 leading-relaxed font-light font-sans">
              Provide your trip requirements and contact details. We will direct you to our ticketing team or visa desks via WhatsApp.
            </p>
            <InquiryForm />
          </div>

        </div>
      </section>
    </div>
  );
}

