export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  content: string;
  tags: string[];
  status: "draft" | "published";
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  gallery: { url: string; type: "image" | "video" }[];
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  image?: string;
}
