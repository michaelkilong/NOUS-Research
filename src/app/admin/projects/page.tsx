"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Project } from "@/types";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
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
      setFiltered(projects);
      return;
    }
    const q = search.toLowerCase();
    setFiltered(
      projects.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    );
  }, [search, projects]);

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${slug}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.slug !== slug));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text">Projects</h1>
          <p className="text-text-muted">Manage your portfolio projects.</p>
        </div>
        <Link href="/admin/projects/new">
          <Button>
            <Plus size={18} className="mr-2" /> New Project
          </Button>
        </Link>
      </div>

      <div className="mb-6 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <Input
            placeholder="Search projects..."
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
            key: "featured",
            label: "Featured",
            render: (value) => (
              <span className={value ? "text-primary font-medium" : "text-text-muted"}>
                {value ? "Yes" : "No"}
              </span>
            ),
          },
          {
            key: "createdAt",
            label: "Date",
            render: (value) => new Date(value).toLocaleDateString(),
          },
        ]}
        data={filtered}
        onRowClick={(row) => router.push(`/admin/projects/${row.slug}/edit`)}
        actions={(row) => (
          <>
            <button
              onClick={() => router.push(`/admin/projects/${row.slug}/edit`)}
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
