"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, FolderKanban, Sparkles, FileCode } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import ArticleCard from "@/components/ArticleCard";
import ProjectCard from "@/components/ProjectCard";
import { Article, Project } from "@/types";

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, projectsRes] = await Promise.all([
          fetch("/api/articles?status=published&limit=3"),
          fetch("/api/projects?status=published&featured=true&limit=3"),
        ]);

        if (!articlesRes.ok || !projectsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const articlesData = await articlesRes.json();
        const projectsData = await projectsRes.json();
        setArticles(Array.isArray(articlesData) ? articlesData : []);
        setProjects(Array.isArray(projectsData) ? projectsData : []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Unable to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary">
            Nous NLP
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed px-4">
            <span className="font-medium text-text">Nurturing Our Unique Speech</span> — A personal research hub exploring the frontiers of Natural Language Processing and Artificial Intelligence.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors text-sm sm:text-base"
              onClick={() => document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" })}
            >
              <span className="flex items-center justify-center gap-2">
                Explore Articles <ArrowRight size={16} />
              </span>
            </button>
            <Link
              href="/projects"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary hover:text-white transition-colors text-center text-sm sm:text-base"
            >
              View Projects
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {[
              { icon: BookOpen, label: "Articles", value: "10+" },
              { icon: FolderKanban, label: "Projects", value: "5+" },
              { icon: Sparkles, label: "Research", value: "Ongoing" },
              { icon: FileCode, label: "Papers", value: "3+" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-3 sm:p-4 rounded-xl bg-surface-alt border border-border/50">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mx-auto mb-2" />
                <p className="text-xl sm:text-2xl font-bold text-text">{stat.value}</p>
                <p className="text-xs sm:text-sm text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section id="articles" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Latest Articles"
            subtitle="Deep dives into NLP research, tutorials, and insights."
            centered
          />

          {error && (
            <div className="mt-8 text-center text-red-500 bg-red-50 rounded-xl p-4 max-w-lg mx-auto">
              {error}
            </div>
          )}

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-surface-alt rounded-xl h-80" />
              ))
            ) : articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-text-muted">
                <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
                <p>No articles published yet.</p>
                <p className="text-sm mt-1">Check back soon for new content.</p>
              </div>
            )}
          </div>

          {articles.length > 0 && (
            <div className="mt-8 sm:mt-10 text-center">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline text-sm sm:text-base"
              >
                View all articles <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 sm:py-24 bg-surface-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Featured Projects"
            subtitle="Showcasing hands-on work in NLP, AI, and software engineering."
            centered
          />

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-xl h-96" />
              ))
            ) : projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-text-muted">
                <FolderKanban size={48} className="mx-auto mb-4 opacity-30" />
                <p>No projects published yet.</p>
                <p className="text-sm mt-1">Check back soon for new projects.</p>
              </div>
            )}
          </div>

          {projects.length > 0 && (
            <div className="mt-8 sm:mt-10 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline text-sm sm:text-base"
              >
                View all projects <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-4">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-base sm:text-lg text-text-muted mb-8 max-w-xl mx-auto leading-relaxed">
            Interested in collaborating on NLP research or AI projects? Get in touch and let&apos;s create something impactful.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors text-sm sm:text-base"
          >
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
