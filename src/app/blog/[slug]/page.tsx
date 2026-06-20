import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getStaticBlogs } from "@/lib/db";
import { ArrowLeft, Calendar, User, Clock, ChevronRight } from "lucide-react";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = getStaticBlogs();
  return blogs.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogs = getStaticBlogs();
  const article = blogs.find((b) => b.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} | TripLand Client Journal`,
    description: article.excerpt,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blogs = getStaticBlogs();
  const article = blogs.find((b) => b.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 bg-[#FAF9F5] text-slate-800 font-sans min-h-screen">
      {/* Back nav */}
      <div className="max-w-4xl mx-auto px-8 mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-brand-blue transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Journals
        </Link>
      </div>

      {/* Editorial Container */}
      <article className="max-w-4xl mx-auto px-8 space-y-8">
        
        {/* Title Block */}
        <div className="space-y-4 text-left border-b border-slate-200 pb-8">
          <div className="flex gap-2">
            {article.tags.map((t) => (
              <span key={t} className="text-[9px] font-bold uppercase tracking-widest bg-brand-blue/5 border border-brand-blue/15 px-2.5 py-1 rounded text-brand-blue">
                {t}
              </span>
            ))}
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight leading-[1.1]">
            {article.title}
          </h1>
          
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider pt-2">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-blue" /> By {article.author}
            </span>
            <span className="w-[1px] h-3.5 bg-slate-250"></span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-gold" /> Published {article.date}
            </span>
            <span className="w-[1px] h-3.5 bg-slate-250"></span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" /> 4 Min Read
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-64 sm:h-[450px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover pointer-events-none"
          />
        </div>

        {/* Article Body (Drop-caps & Serif) */}
        <div className="bg-white border border-slate-200/70 p-8 sm:p-12 rounded-2xl shadow-sm text-left">
          <p className="font-serif text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:text-brand-blue">
            {article.fullContent}
          </p>
        </div>

        {/* Author sign-off box */}
        <div className="bg-slate-100/70 border border-slate-200 p-6 rounded-xl flex items-center justify-between gap-6 shadow-inner text-left">
          <div>
            <h4 className="font-heading font-black text-slate-800 text-[10px] uppercase tracking-wider">Client Contributor</h4>
            <p className="text-xs text-slate-500 font-light mt-1">This log was compiled by {article.author} after booking their flights and itinerary files through our accredited services.</p>
          </div>
          <Link
            href="/"
            className="flex-shrink-0 px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow transition-colors"
          >
            Explore Packages <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </article>

    </div>
  );
}
