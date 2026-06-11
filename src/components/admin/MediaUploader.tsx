"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaUploaderProps {
  onUpload: (url: string, type: "image" | "video") => void;
  accept?: string;
  className?: string;
}

export default function MediaUploader({ onUpload, accept = "image/*", className }: MediaUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith("video/");
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", isVideo ? "video" : "image");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      onUpload(data.url, isVideo ? "video" : "image");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative rounded-lg overflow-hidden border border-border">
          {preview.includes("video") || accept.includes("video") ? (
            <video src={preview} className="w-full h-48 object-cover" controls />
          ) : (
            <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          )}
          <button
            type="button"
            onClick={clearPreview}
            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-red-50"
          >
            <X size={16} className="text-red-500" />
          </button>
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "w-full h-48 rounded-lg border-2 border-dashed border-border",
            "flex flex-col items-center justify-center gap-2",
            "hover:border-primary hover:bg-primary/5 transition-colors duration-200",
            uploading && "opacity-50 cursor-not-allowed"
          )}
          disabled={uploading}
        >
          {accept.includes("video") ? (
            <Video size={32} className="text-text-muted" />
          ) : (
            <ImageIcon size={32} className="text-text-muted" />
          )}
          <span className="text-sm text-text-muted">
            {uploading ? "Uploading..." : "Click to upload"}
          </span>
        </button>
      )}
    </div>
  );
}
