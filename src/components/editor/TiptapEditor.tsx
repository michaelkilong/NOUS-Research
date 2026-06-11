"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import { createLowlight, common } from "lowlight";
import EditorToolbar from "./EditorToolbar";
import { useCallback } from "react";

const lowlight = createLowlight(common);

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({ content, onChange, placeholder = "Start writing..." }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-2 hover:text-primary-dark transition-colors",
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "rounded-lg bg-gray-900 text-gray-100 p-4 my-4 overflow-x-auto font-mono text-sm leading-relaxed",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-red max-w-none focus:outline-none min-h-[300px] p-4",
      },
    },
    injectCSS: false,
    immediatelyRender: false,
  });

  const addImage = useCallback(
    (url: string) => {
      if (editor) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    },
    [editor]
  );

  const addVideo = useCallback(
    (url: string) => {
      if (editor) {
        const videoHtml = `<div class="video-wrapper"><iframe src="${url}" frameborder="0" allowfullscreen></iframe></div>`;
        editor.chain().focus().insertContent(videoHtml).run();
      }
    },
    [editor]
  );

  if (!editor) return null;

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white">
      <EditorToolbar editor={editor} onAddImage={addImage} onAddVideo={addVideo} />
      <EditorContent editor={editor} className="min-h-[300px]" />
    </div>
  );
}
