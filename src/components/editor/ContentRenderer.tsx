"use client";

import { useEffect, useRef } from "react";

interface ContentRendererProps {
  content: string;
  className?: string;
}

export default function ContentRenderer({ content, className }: ContentRendererProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Add copy buttons to code blocks
    const codeBlocks = ref.current.querySelectorAll("pre");
    codeBlocks.forEach((block) => {
      if (block.querySelector(".copy-btn")) return;

      const btn = document.createElement("button");
      btn.className = "copy-btn absolute top-3 right-3 px-3 py-1.5 text-xs font-medium bg-white/10 text-white/80 rounded-md hover:bg-white/20 hover:text-white transition-all duration-200 backdrop-blur-sm";
      btn.textContent = "Copy";
      btn.onclick = () => {
        const code = block.querySelector("code")?.textContent || "";
        navigator.clipboard.writeText(code);
        btn.textContent = "Copied!";
        btn.classList.add("bg-green-500/20", "text-green-300");
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("bg-green-500/20", "text-green-300");
        }, 2000);
      };

      block.style.position = "relative";
      block.appendChild(btn);
    });

    // Make external links open in new tab
    const links = ref.current.querySelectorAll("a[href^='http']");
    links.forEach((link) => {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });

    // Make images responsive
    const images = ref.current.querySelectorAll("img");
    images.forEach((img) => {
      img.classList.add("max-w-full", "h-auto", "rounded-lg");
    });
  }, [content]);

  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
