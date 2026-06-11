"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, Calendar, AlertCircle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ContentRenderer from "@/components/editor/ContentRenderer";
import { formatDate } from "@/lib/utils";
import { Project } from "@/types";

export default function ProjectPage() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/projects/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Project not found");
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Project not found or unavailable.");
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          <p className="text-sm text-text-muted">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-red-400" />
          <h1 className="text-2xl font-bold text-text mb-2">{error || "Project not found"}</h1>
          <Link href="/projects" className="text-primary hover:underline mt-4 inline-flex items-center gap-1">
            <ArrowLeft size={16} /> Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors mb-6 sm:mb-8"
          >
            <ArrowLeft size={16} /> Back to projects
          </Link>

          {/* Hero Image */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden mb-6 sm:mb-8">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack?.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-text mb-3 sm:mb-4 leading-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-text-muted mb-6">
            <div className="flex items-center gap-1.5">
              <Calendar size={15} />
              <span>{formatDate(project.createdAt)}</span>
            </div>
            {project.featured && (
              <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                Featured
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mb-8 sm:mb-10 pb-8 sm:pb-10 border-b border-border">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors text-sm"
              >
                <ExternalLink size={16} /> View Live
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-border rounded-xl hover:border-primary hover:text-primary transition-colors text-sm"
              >
                <Github size={16} /> Source Code
              </a>
            )}
          </div>

          <div className="prose-red max-w-none">
            <p className="text-base sm:text-lg text-text leading-relaxed mb-8">{project.description}</p>
          </div>

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mt-10 sm:mt-12">
              <h2 className="text-xl sm:text-2xl font-bold text-text mb-4 sm:mb-6">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((item, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden">
                    {item.type === "video" ? (
                      <video
                        src={item.url}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={item.url}
                        alt={`${project.title} gallery ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
