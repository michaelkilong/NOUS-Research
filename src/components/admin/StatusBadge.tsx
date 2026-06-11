import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "draft" | "published";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        status === "published"
          ? "bg-green-100 text-green-800"
          : "bg-amber-100 text-amber-800"
      )}
    >
      {status === "published" ? "Published" : "Draft"}
    </span>
  );
}
