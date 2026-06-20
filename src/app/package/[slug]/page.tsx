import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getStaticOutboundPackages, getStaticSettings } from "@/lib/db";
import { Clock, Calendar, Check, ShieldAlert, ArrowLeft, PhoneCall, Gift, CheckCircle } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";
import PackageTabs from "@/components/PackageTabs";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const packages = getStaticOutboundPackages();
  return packages.map((pkg) => ({
    slug: pkg.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const packages = getStaticOutboundPackages();
  const pkg = packages.find((p) => p.slug === slug);
  if (!pkg) return {};

  return {
    title: `${pkg.title} Outbound Package | TripLand Travels`,
    description: `Book your seat for the ${pkg.title} tour from Kathmandu. Price: Rs. ${pkg.price.toLocaleString()}. Duration: ${pkg.duration}.`,
  };
}

export default async function PackagePage({ params }: PageProps) {
  const { slug } = await params;
  const packages = getStaticOutboundPackages();
  const pkg = packages.find((p) => p.slug === slug);
  const settings = getStaticSettings();

  if (!pkg) {
    notFound();
  }

  return (
    <div className="bg-[#f8fafc] text-slate-800 font-sans min-h-screen relative pb-20">
      {/* Immersive Destination Hero */}
      <section className="relative h-[60vh] w-full bg-slate-950 overflow-hidden">
        <Image
          src={pkg.heroImage}
          alt={pkg.title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-slate-950"></div>
        
        {/* Back nav & title overlay */}
        <div className="absolute inset-x-0 bottom-28 max-w-7xl mx-auto px-8 text-white space-y-3">
          <Link
            href="/packages"
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tour Packages
          </Link>
          <div className="space-y-1">
            <span className="bg-brand-gold text-slate-900 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded inline-block">
              {pkg.duration}
            </span>
            <h1 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-wide drop-shadow-lg leading-tight">
              {pkg.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Overlapping Content Frame */}
      <div className="max-w-7xl mx-auto px-8 relative z-10 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column (Tour Details in Tabs) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 p-6 sm:p-10 rounded-2xl shadow-xl">
            <PackageTabs pkg={pkg} />
          </div>

          {/* Right Column (Sticky Pricing Card & Leads form) */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            <div className="bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">
                  Private / Group Rate
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-brand-red font-heading">
                    Rs. {pkg.price.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono">
                    NPR / Person
                  </span>
                </div>
              </div>

              {/* Fixed Departure Dates list */}
              <div className="border-t border-b border-slate-100 py-4.5 space-y-3">
                <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">
                  Fixed Departure Dates
                </span>
                <div className="space-y-2">
                  {pkg.fixedDepartureDates.map((dateStr, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg">
                      <Calendar className="w-4 h-4 text-brand-blue flex-shrink-0" strokeWidth={2} />
                      <span>{dateStr}</span>
                      <span className="text-[9px] font-bold uppercase bg-brand-gold/20 text-brand-gold px-1.5 py-0.5 rounded ml-auto">
                        Booking Open
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs text-slate-500 leading-relaxed font-light">
                <ShieldAlert className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" strokeWidth={2} />
                <p>
                  Prices are all-inclusive of flight ticketing and visa coordination support files.
                </p>
              </div>

              <a
                href="#inquiry-box"
                className="w-full text-center py-3.5 bg-brand-red hover:bg-brand-red/90 text-white rounded-lg text-xs font-bold uppercase tracking-widest shadow-md transition-all hover:-translate-y-0.5 duration-300 block cursor-pointer"
              >
                Inquire / Book Seat
              </a>
            </div>

            {/* Lead capture form */}
            <div id="inquiry-box" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xl scroll-mt-28">
              <h3 className="font-heading text-sm font-black text-slate-900 uppercase mb-1">
                Booking Reservation
              </h3>
              <p className="text-xs text-slate-500 mb-6 font-light">
                Provide your passenger parameters. We will direct you to WhatsApp to finalize ticket details.
              </p>
              <InquiryForm targetPackage={pkg.title} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
