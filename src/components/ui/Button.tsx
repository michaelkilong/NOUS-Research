"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "active:scale-95",
        variant === "primary" && "bg-primary text-white hover:bg-primary-dark",
        variant === "outline" && "border-2 border-primary text-primary hover:bg-primary hover:text-white",
        variant === "ghost" && "text-text hover:bg-surface-alt",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-5 py-2.5 text-base",
        size === "lg" && "px-8 py-3 text-lg",
        className
      )}
    >
      {children}
    </button>
  );
}
