"use client";

import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, X } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import MediaUploader from "@/components/admin/MediaUploader";

export default function NewProjectPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnail: "",
    gallery: [] as { url: string; type: "image" | "video" }[],
    techStack: [] as string[],
    techInput: "",
    liveUrl: "",
    repoUrl: "",
    featured: false,
    status: "draft" as "draft" | "published",
  });
  const [saving, setSaving] = useState(false);

  const addTech = () => {
    if (!form.techInput.trim()) return;
    setForm({
      ...form,
      techStack: [...form.techStack, form.techInput.trim()],
      techInput: "",
    });
  };

  const removeTech = (index: number) => {
    setForm({
      ...form,
      techStack: form.techStack.filter((_, i) => i !== index),
    });
  };

  const addGalleryItem = (url: string, type: "image" | "video") => {
    setForm({
      ...form,
      gallery: [...form.gallery, { url, type }],
    });
  };

  const removeGalleryItem = (index: number) => {
    setForm({
      ...form,
      gallery: form.gallery.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          thumbnail: form.thumbnail,
          gallery: form.gallery,
          techStack: form.techStack,
          liveUrl: form.liveUrl,
          repoUrl: form.repoUrl,
          featured: form.featured,
          status: form.status,
        }),
      });

      if (res.ok) {
        router.push("/admin/projects");
      } else {
        alert("Failed to create project");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 rounded-lg hover:bg-surface-alt transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text">New Project</h1>
            <p className="text-text-muted">Create a new portfolio project.</p>
          </div>
        </div>
        <Button onClick={() => handleSubmit({ preventDefault: () => {} } as any)} disabled={saving}>
          <Save size={18} className="mr-2" />
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-border p-6 space-y-6">
          <Input
            label="Title"
            placeholder="Project name"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <Textarea
            label="Description"
            placeholder="Describe your project..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-text mb-2">Thumbnail</label>
            {form.thumbnail ? (
              <div className="relative rounded-lg overflow-hidden max-w-md">
                <img src={form.thumbnail} alt="Thumbnail" className="w-full" />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, thumbnail: "" })}
                  className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ) : (
              <MediaUploader
                onUpload={(url) => setForm({ ...form, thumbnail: url })}
                className="max-w-md"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Gallery</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              {form.gallery.map((item, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden aspect-video">
                  {item.type === "video" ? (
                    <video src={item.url} className="w-full h-full object-cover" />
                  ) : (
                    <img src={item.url} alt="" className="w-full h-full object-cover" />
                  )}
                  <button
                    type="button"
                    onClick={() => removeGalleryItem(i)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2 max-w-md">
              <MediaUploader
                onUpload={(url, type) => addGalleryItem(url, type || "image")}
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">Tech Stack</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {form.techStack.map((tech, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tech}
                  <button type="button" onClick={() => removeTech(i)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 max-w-md">
              <Input
                placeholder="Add technology (e.g., React, Python)"
                value={form.techInput}
                onChange={(e) => setForm({ ...form, techInput: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
              />
              <Button type="button" onClick={addTech} variant="outline">
                <Plus size={18} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Live URL"
              placeholder="https://..."
              value={form.liveUrl}
              onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
            />
            <Input
              label="Repository URL"
              placeholder="https://github.com/..."
              value={form.repoUrl}
              onChange={(e) => setForm({ ...form, repoUrl: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="w-4 h-4 text-primary rounded border-border focus:ring-primary"
              />
              <span className="text-sm text-text">Featured project</span>
            </label>
          </div>

          <Select
            label="Status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })}
            options={[
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
            ]}
          />
        </div>
      </form>
    </div>
  );
}
