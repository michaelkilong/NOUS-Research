"use client";

import { signIn } from "next-auth/react";
import { Github } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-alt">
      <div className="w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl border border-border p-8 sm:p-10 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">Nous NLP</h1>
            <p className="text-text-muted">Admin Dashboard</p>
          </div>

          <button
            onClick={() => signIn("github", { callbackUrl: "/admin" })}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            <Github size={20} />
            Sign in with GitHub
          </button>

          <p className="mt-6 text-center text-sm text-text-muted">
            Only authorized users can access the admin dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
