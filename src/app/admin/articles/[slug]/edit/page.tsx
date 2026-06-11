"use client";

import React from "react";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, Save } from "lucide-react";
import TiptapEditor from "@/components/editor/TiptapEditor";
import ContentRenderer from "@/components/editor/ContentRenderer";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import MediaUploader from "@/components/admin/MediaUploader";
import { Article } from "@/types";

export default function EditArticlePage() {
  const router = useRouter();
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "<p></p>",
    coverImage: "",
    tags: "",
    status: "draft" as "draft" | "published",
  });
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/articles/${slug}`)
      .then((res) => res.json())
      .then((data: Article) => {
        setArticle(data);
        setForm({
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          coverImage: data.coverImage || "",
          tags: data.tags?.join(", ") || "",
          status: data.status,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/articles/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });

      if (res.ok) {
        router.push("/admin/articles");
      } else {
        alert("Failed to update article");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">Article not found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="p-2 rounded-lg hover:bg-surface-alt transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-text">Edit Article</h1>
            <p className="text-text-muted">Update article content and settings.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPreview(!preview)}
          >
            <Eye size={18} className="mr-2" />
            {preview ? "Edit" : "Preview"}
          </Button>
          <Button onClick={() => handleSubmit({ preventDefault: () => {} } as any)} disabled={saving}>
            <Save size={18} className="mr-2" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      {preview ? (
        <div className="bg-white rounded-xl border border-border p-8">
          <h1 className="text-3xl font-bold text-text mb-4">{form.title || "Untitled"}</h1>
          {form.coverImage && (
            <img src={form.coverImage} alt="Cover" className="w-full rounded-xl mb-6" />
          )}
          <ContentRenderer content={form.content} className="prose-red" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl border border-border p-6 space-y-6">
            <Input
              label="Title"
              placeholder="Article title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <Textarea
              label="Excerpt"
              placeholder="Short description of the article"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-text mb-2">Cover Image</label>
              {form.coverImage ? (
                <div className="relative rounded-lg overflow-hidden max-w-md">
                  <img src={form.coverImage} alt="Cover" className="w-full" />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, coverImage: "" })}
                    className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <MediaUploader
                  onUpload={(url) => setForm({ ...form, coverImage: url })}
                  className="max-w-md"
                />
              )}
            </div>

            <Input
              label="Tags"
              placeholder="nlp, transformers, tutorial (comma separated)"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />

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

          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="px-6 py-3 border-b border-border bg-surface-alt">
              <label className="text-sm font-medium text-text">Content</label>
            </div>
            <TiptapEditor
              content={form.content}
              onChange={(content) => setForm({ ...form, content })}
            />
          </div>
        </form>
      )}
    </div>
  );
}
