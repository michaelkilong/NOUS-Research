import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight } from "lucide-react";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import { formatDate } from "@/lib/utils";
import { Article } from "@/types";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <Card className={featured ? "h-full" : ""}>
        {article.coverImage && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex flex-wrap gap-2 mb-3">
            {article.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-text mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-text-muted line-clamp-2 mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-sm text-text-muted">
              <Calendar size={14} />
              <span>{formatDate(article.publishedAt || article.createdAt)}</span>
            </div>
            <span className="flex items-center gap-1 text-sm text-primary font-medium">
              Read <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
