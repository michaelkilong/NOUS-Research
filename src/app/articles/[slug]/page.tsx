"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Calendar, Tag, Clock, AlertCircle } from "lucide-react";
import ContentRenderer from "@/components/editor/ContentRenderer";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { Article } from "@/types";

export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/articles/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Article not found");
        return res.json();
      })
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Article not found or unavailable.");
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          <p className="text-sm text-text-muted">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-red-400" />
          <h1 className="text-2xl font-bold text-text mb-2">{error || "Article not found"}</h1>
          <Link href="/articles" className="text-primary hover:underline mt-4 inline-flex items-center gap-1">
            <ArrowLeft size={16} /> Back to articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft size={16} /> Back to articles
          </Link>

          {article.coverImage && (
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden mb-6 sm:mb-8">
              <Image
                src={article.coverImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags?.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-text mb-4 sm:mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-text-muted mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-border">
            <div className="flex items-center gap-1.5">
              <Calendar size={15} />
              <span>{formatDate(article.publishedAt || article.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={15} />
              <span>{Math.max(1, Math.ceil(article.content.length / 1000))} min read</span>
            </div>
          </div>

          <ContentRenderer
            content={article.content}
            className="prose-red"
          />
        </motion.div>
      </article>
    </div>
  );
}
