"use client";

import { useState } from "react";
import { Upload, Copy, Check, Image as ImageIcon, Video } from "lucide-react";
import MediaUploader from "@/components/admin/MediaUploader";
import Button from "@/components/ui/Button";

interface MediaItem {
  url: string;
  type: "image" | "video";
  uploadedAt: string;
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [copiedUrl, setCopiedUrl] = useState("");

  const handleUpload = (url: string, type: "image" | "video") => {
    setMedia((prev) => [
      { url, type, uploadedAt: new Date().toISOString() },
      ...prev,
    ]);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(""), 2000);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text">Media Library</h1>
          <p className="text-text-muted">Upload and manage images and videos.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-border p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-text mb-4">Upload Image</h3>
              <MediaUploader
                onUpload={(url, type) => handleUpload(url, type || "image")}
              />
            </div>
            <div>
              <h3 className="font-semibold text-text mb-4">Upload Video</h3>
              <MediaUploader
                onUpload={(url, type) => handleUpload(url, type || "video")}
                accept="video/*"
              />
            </div>
          </div>
        </div>

        {/* Media Grid */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-border p-6">
            <h3 className="font-semibold text-text mb-4">
              Uploaded Media ({media.length})
            </h3>
            {media.length === 0 ? (
              <div className="text-center py-12 text-text-muted">
                <ImageIcon size={48} className="mx-auto mb-4 opacity-30" />
                <p>No media uploaded yet.</p>
                <p className="text-sm mt-1">Upload images or videos to see them here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {media.map((item, i) => (
                  <div key={i} className="group relative rounded-lg overflow-hidden border border-border">
                    {item.type === "video" ? (
                      <video
                        src={item.url}
                        className="w-full aspect-video object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={item.url}
                        alt=""
                        className="w-full aspect-video object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyUrl(item.url)}
                        className="bg-white border-white text-text"
                      >
                        {copiedUrl === item.url ? (
                          <>
                            <Check size={14} className="mr-1" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={14} className="mr-1" /> Copy URL
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <span className="px-2 py-0.5 bg-black/50 text-white text-xs rounded">
                        {item.type === "video" ? (
                          <Video size={12} className="inline mr-1" />
                        ) : (
                          <ImageIcon size={12} className="inline mr-1" />
                        )}
                        {item.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
