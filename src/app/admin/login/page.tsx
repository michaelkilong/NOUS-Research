"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Github } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-alt relative overflow-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 200 + i * 100,
              height: 200 + i * 100,
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
              background: `radial-gradient(circle, rgba(220, 38, 38, 0.06) 0%, transparent 70%)`,
              filter: "blur(40px)",
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 15, 0],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
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
      </motion.div>
    </div>
  );
}
