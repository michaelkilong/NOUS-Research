"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, FolderKanban, Eye, TrendingUp } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import { Article, Project } from "@/types";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    articles: 0,
    projects: 0,
    published: 0,
    drafts: 0,
  });
  const [recent, setRecent] = useState<(Article | Project)[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articlesRes, projectsRes] = await Promise.all([
          fetch("/api/articles"),
          fetch("/api/projects"),
        ]);
        const articles: Article[] = await articlesRes.json();
        const projects: Project[] = await projectsRes.json();

        setStats({
          articles: articles.length,
          projects: projects.length,
          published: articles.filter((a) => a.status === "published").length +
            projects.filter((p) => p.status === "published").length,
          drafts: articles.filter((a) => a.status === "draft").length +
            projects.filter((p) => p.status === "draft").length,
        });

        const all = [...articles, ...projects]
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 5);
        setRecent(all);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-text mb-2">Dashboard</h1>
        <p className="text-text-muted mb-8">Overview of your content and activity.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Articles"
            value={stats.articles}
            icon={FileText}
          />
          <StatCard
            title="Total Projects"
            value={stats.projects}
            icon={FolderKanban}
          />
          <StatCard
            title="Published"
            value={stats.published}
            icon={Eye}
          />
          <StatCard
            title="Drafts"
            value={stats.drafts}
            icon={TrendingUp}
          />
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text mb-4">Recent Activity</h2>
          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse h-12 bg-surface-alt rounded-lg" />
              ))}
            </div>
          ) : recent.length > 0 ? (
            <div className="space-y-2">
              {recent.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-alt transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      "tags" in item ? "bg-blue-500" : "bg-green-500"
                    }`} />
                    <div>
                      <p className="font-medium text-text text-sm">{item.title}</p>
                      <p className="text-xs text-text-muted">
                        {"tags" in item ? "Article" : "Project"} • {item.status}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-text-muted">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-muted text-center py-8">No activity yet.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
