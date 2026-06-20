import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Calendar, User } from "lucide-react";
import { getStaticBlogs } from "@/lib/db";

export const metadata = {
  title: "Traveler Journals & Stories | TripLand Travels",
  description: "Read real stories, reviews, and detailed travel logs from our corporate and leisure clients who explored Japan, Schengen, and Bali.",
};

export default function BlogListPage() {
  const blogs = getStaticBlogs();

  return (
    <div className="pt-28 pb-24 bg-[#FAF9F5] text-slate-800 font-sans min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-brand-blue transition-colors group mb-6"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Portal
        </Link>
        <div className="space-y-2">
          <span className="text-[10px] font-extrabold tracking-widest text-brand-blue uppercase block">
            Condé Nast Styled Journal
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tight">
            Traveler Journals
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed max-w-lg">
            A repository of unfiltered diaries, alpine guides, and cultural experiences published directly by our booking coordinators and esteemed travel clients.
          </p>
        </div>
      </div>

      {/* Editorial List */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        {blogs.map((article) => (
          <article
            key={article.id}
            className="flex flex-col bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
          >
            {/* Cover Image */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                sizes="(max-w-768px) 100vw, 30vw"
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700 pointer-events-none"
              />
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-6">
              <div className="space-y-3">
                {/* Meta tags */}
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold" /> {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-brand-blue" /> By {article.author.split(" ")[0]}
                  </span>
                </div>

                <h3 className="font-heading font-black text-lg text-slate-900 uppercase leading-snug group-hover:text-brand-blue transition-colors text-left line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light text-left line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {/* Tags */}
                <div className="flex gap-1.5 flex-wrap">
                  {article.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[8px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-150 px-2 py-0.5 rounded text-slate-500">
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-brand-red hover:underline"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Read Story
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
