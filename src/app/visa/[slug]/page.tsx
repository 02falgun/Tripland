import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getStaticVisaServices, getStaticSettings } from "@/lib/db";
import { FileText, Clock, ArrowLeft, ShieldAlert, BadgeCheck } from "lucide-react";
import { Metadata } from "next";
import InquiryForm from "@/components/InquiryForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const visas = getStaticVisaServices();
  return visas.map((visa) => ({
    slug: visa.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const visas = getStaticVisaServices();
  const visa = visas.find((v) => v.slug === slug);
  if (!visa) return {};

  return {
    title: `${visa.country} Visa Requirements & Application Support | TripLand`,
    description: `Complete list of documents required to process a tourist visa to ${visa.country} from Nepal. Processing time: ${visa.processingTime}.`,
  };
}

const visaImages: Record<string, string> = {
  "dubai-uae-visa": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
  "hong-kong-visa": "https://images.unsplash.com/photo-1506501139174-099022df5260?q=80&w=1200&auto=format&fit=crop",
  "japan-visa": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
  "schengen-europe-visa": "https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=1200&auto=format&fit=crop",
};

export default async function VisaPage({ params }: PageProps) {
  const { slug } = await params;
  const visas = getStaticVisaServices();
  const visa = visas.find((v) => v.slug === slug);

  if (!visa) {
    notFound();
  }

  const coverImage = visaImages[visa.slug] || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="pt-28 pb-20 bg-[#f8fafc] text-slate-800 font-sans min-h-screen">
      {/* Back navigation */}
      <div className="max-w-7xl mx-auto px-8 pt-6">
        <Link
          href="/visa-services"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-brand-blue transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Visa Catalog
        </Link>
      </div>

      {/* Main Grid Container */}
      <div className="max-w-7xl mx-auto px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Requirements & Images */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Header */}
          <div className="border-b border-slate-200 pb-6">
            <span className="text-[9px] font-bold tracking-widest uppercase text-brand-gold bg-slate-900 px-3 py-1 rounded inline-block text-white mb-3">
              IATA Accredited Service Desk
            </span>
            <h1 className="font-heading text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tight">
              {visa.country} Visa
            </h1>
            <p className="text-xs text-slate-500 font-light mt-1.5 leading-relaxed max-w-xl">
              Complete official requirements checklists. We compile your documents, double-check compliance, and streamline the embassy reservation slots.
            </p>
          </div>

          {/* Cinematic Image Panel */}
          <div className="relative h-64 sm:h-[320px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md group">
            <Image
              src={coverImage}
              alt={`Visa documentation cover representing ${visa.country}`}
              fill
              sizes="(max-w-1024px) 100vw, 55vw"
              priority
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none"></div>
          </div>

          {/* Technical Info Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200/80 p-4 rounded-xl flex items-start gap-3 shadow-sm">
              <Clock className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Embassy Processing Time
                </span>
                <span className="text-xs font-bold text-slate-800">{visa.processingTime}</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200/80 p-4 rounded-xl flex items-start gap-3 shadow-sm">
              <FileText className="w-5 h-5 text-brand-blue mt-0.5 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Available Portfolios
                </span>
                <span className="text-[11px] font-bold text-slate-800 leading-tight block">
                  {visa.visaTypes.join(" / ")}
                </span>
              </div>
            </div>
          </div>

          {/* Document Checklist Details */}
          <div className="bg-white border border-slate-200/85 p-6 sm:p-8 rounded-2xl shadow-sm space-y-5">
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-brand-blue" /> Required Documentation Checklist
            </h3>
            <ul className="space-y-3.5 text-xs text-slate-650 font-medium">
              {visa.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex gap-3 items-start leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="pt-0.5 text-slate-750">{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Advisory Box */}
          <div className="bg-slate-100/70 border border-slate-200 p-5 rounded-xl flex gap-3 text-xs leading-relaxed text-slate-500 font-light shadow-inner">
            <ShieldAlert className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 uppercase text-[9px] tracking-wider">Embassy Disclaimer & Advisory</h4>
              <p>
                TripLand Travels & Tours P. LTD assists clients in formatting documents, compiling checklists, booking visa application center slots, and finalizing files. Final visa approvals are exclusively at the discretion of the embassy officers. All visa center and booking fees are non-refundable once lodged.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Inquiry Form Card */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xl relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="border-b border-slate-100 pb-4 mb-6">
            <h3 className="font-heading text-xs font-bold text-slate-900 uppercase tracking-widest">Submit Visa Inquiry</h3>
            <p className="text-[10px] text-slate-400 font-light mt-1">Our documentation desk will evaluate your eligibility parameters and contact you back.</p>
          </div>

          <InquiryForm targetPackage={`${visa.country} Visa`} />
        </div>

      </div>
    </div>
  );
}
