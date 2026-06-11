"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Tag, AlertCircle } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import SectionHeader from "@/components/SectionHeader";
import Input from "@/components/ui/Input";
import { Article } from "@/types";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filtered, setFiltered] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/articles?status=published")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setArticles(Array.isArray(data) ? data : []);
        setFiltered(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load articles. Please try again later.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = articles;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (selectedTag) {
      result = result.filter((a) => a.tags?.includes(selectedTag));
    }
    setFiltered(result);
  }, [search, selectedTag, articles]);

  const allTags = Array.from(
    new Set(articles.flatMap((a) => a.tags || []))
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <SectionHeader
          title="Articles"
          subtitle="Thoughts, tutorials, and research on NLP and AI."
          centered
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex items-center gap-2 text-red-600 bg-red-50 rounded-xl p-4 max-w-lg mx-auto"
          >
            <AlertCircle size={18} />
            <span className="text-sm">{error}</span>
          </motion.div>
        )}

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mt-10 max-w-2xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <Input
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Tags */}
        {allTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-5 flex flex-wrap justify-center gap-2"
          >
            <button
              onClick={() => setSelectedTag("")}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedTag === ""
                  ? "bg-primary text-white"
                  : "bg-surface-alt text-text-muted hover:bg-primary/10 hover:text-primary"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? "" : tag)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors flex items-center gap-1 ${
                  selectedTag === tag
                    ? "bg-primary text-white"
                    : "bg-surface-alt text-text-muted hover:bg-primary/10 hover:text-primary"
                }`}
              >
                <Tag size={12} /> {tag}
              </button>
            ))}
          </motion.div>
        )}

        {/* Articles Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-surface-alt rounded-xl h-80" />
            ))
          ) : filtered.length > 0 ? (
            filtered.map((article, i) => (
              <motion.div
                key={article._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <ArticleCard article={article} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-text-muted">
              <Search size={48} className="mx-auto mb-4 opacity-30" />
              <p>No articles found.</p>
              {search && <p className="text-sm mt-1">Try adjusting your search.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
