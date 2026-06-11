"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Code,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  Undo,
  Redo,
  SeparatorHorizontal,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface EditorToolbarProps {
  editor: Editor;
  onAddImage: (url: string) => void;
  onAddVideo: (url: string) => void;
}

export default function EditorToolbar({ editor, onAddImage, onAddVideo }: EditorToolbarProps) {
  const [showImageInput, setShowImageInput] = useState(false);
  const [showVideoInput, setShowVideoInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const toolbarBtn = (active: boolean, onClick: () => void, icon: React.ReactNode, label: string) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-2 rounded-lg transition-colors duration-200",
        active
          ? "bg-primary text-white"
          : "text-text-muted hover:bg-surface-alt hover:text-text"
      )}
      title={label}
    >
      {icon}
    </button>
  );

  return (
    <div className="border-b border-border bg-surface-alt p-2 flex flex-wrap gap-1 items-center">
      <div className="flex gap-1 flex-wrap">
        {toolbarBtn(
          editor.isActive("bold"),
          () => editor.chain().focus().toggleBold().run(),
          <Bold size={18} />,
          "Bold"
        )}
        {toolbarBtn(
          editor.isActive("italic"),
          () => editor.chain().focus().toggleItalic().run(),
          <Italic size={18} />,
          "Italic"
        )}
        <div className="w-px h-6 bg-border mx-1" />
        {toolbarBtn(
          editor.isActive("heading", { level: 1 }),
          () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          <Heading1 size={18} />,
          "Heading 1"
        )}
        {toolbarBtn(
          editor.isActive("heading", { level: 2 }),
          () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          <Heading2 size={18} />,
          "Heading 2"
        )}
        <div className="w-px h-6 bg-border mx-1" />
        {toolbarBtn(
          editor.isActive("bulletList"),
          () => editor.chain().focus().toggleBulletList().run(),
          <List size={18} />,
          "Bullet List"
        )}
        {toolbarBtn(
          editor.isActive("orderedList"),
          () => editor.chain().focus().toggleOrderedList().run(),
          <ListOrdered size={18} />,
          "Ordered List"
        )}
        <div className="w-px h-6 bg-border mx-1" />
        {toolbarBtn(
          editor.isActive("codeBlock"),
          () => editor.chain().focus().toggleCodeBlock().run(),
          <Code size={18} />,
          "Code Block"
        )}
        {toolbarBtn(
          editor.isActive("blockquote"),
          () => editor.chain().focus().toggleBlockquote().run(),
          <Quote size={18} />,
          "Quote"
        )}
        {toolbarBtn(
          editor.isActive("link"),
          () => {
            const url = window.prompt("Enter URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          },
          <LinkIcon size={18} />,
          "Link"
        )}
        <div className="w-px h-6 bg-border mx-1" />
        {toolbarBtn(
          false,
          () => setShowImageInput(!showImageInput),
          <ImageIcon size={18} />,
          "Image"
        )}
        {toolbarBtn(
          false,
          () => setShowVideoInput(!showVideoInput),
          <Video size={18} />,
          "Video"
        )}
        {toolbarBtn(
          false,
          () => editor.chain().focus().setHorizontalRule().run(),
          <SeparatorHorizontal size={18} />,
          "Divider"
        )}
        <div className="w-px h-6 bg-border mx-1" />
        {toolbarBtn(false, () => editor.chain().focus().undo().run(), <Undo size={18} />, "Undo")}
        {toolbarBtn(false, () => editor.chain().focus().redo().run(), <Redo size={18} />, "Redo")}
      </div>

      {showImageInput && (
        <div className="w-full mt-2 flex gap-2">
          <input
            type="text"
            placeholder="Image URL or upload via Media tab"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="flex-1 px-3 py-1.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="button"
            onClick={() => {
              if (imageUrl) {
                onAddImage(imageUrl);
                setImageUrl("");
                setShowImageInput(false);
              }
            }}
            className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Insert
          </button>
        </div>
      )}

      {showVideoInput && (
        <div className="w-full mt-2 flex gap-2">
          <input
            type="text"
            placeholder="Video embed URL (YouTube, Vimeo, etc.)"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="flex-1 px-3 py-1.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="button"
            onClick={() => {
              if (videoUrl) {
                onAddVideo(videoUrl);
                setVideoUrl("");
                setShowVideoInput(false);
              }
            }}
            className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Insert
          </button>
        </div>
      )}
    </div>
  );
}
