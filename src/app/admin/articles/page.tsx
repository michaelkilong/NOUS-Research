"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Article } from "@/types";

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filtered, setFiltered] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!search) {
      setFiltered(articles);
      return;
    }
    const q = search.toLowerCase();
    setFiltered(
      articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      )
    );
  }, [search, articles]);

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    try {
      const res = await fetch(`/api/articles/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.slug !== slug));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text">Articles</h1>
          <p className="text-text-muted">Manage your blog articles.</p>
        </div>
        <Link href="/admin/articles/new">
          <Button>
            <Plus size={18} className="mr-2" /> New Article
          </Button>
        </Link>
      </div>

      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <Input
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <DataTable
        columns={[
          { key: "title", label: "Title" },
          {
            key: "status",
            label: "Status",
            render: (value) => <StatusBadge status={value} />,
          },
          {
            key: "publishedAt",
            label: "Date",
            render: (value, row) =>
              value
                ? new Date(value).toLocaleDateString()
                : new Date(row.createdAt).toLocaleDateString(),
          },
        ]}
        data={filtered}
        onRowClick={(row) => router.push(`/admin/articles/${row.slug}/edit`)}
        actions={(row) => (
          <>
            <button
              onClick={() => router.push(`/admin/articles/${row.slug}/edit`)}
              className="p-2 text-text-muted hover:text-primary transition-colors"
              title="Edit"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => handleDelete(row.slug)}
              className="p-2 text-text-muted hover:text-red-500 transition-colors"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </>
        )}
      />
    </div>
  );
}
