import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-xl font-bold text-primary">
              Nous NLP
            </Link>
            <p className="mt-2 text-sm text-text-muted">
              Nurturing Our Unique Speech
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-text mb-3">Navigation</h3>
            <ul className="space-y-2">
              {["Home", "Articles", "Projects", "About"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-text mb-3">Connect</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-surface-alt flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-surface-alt flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-surface-alt flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-text mb-3">Admin</h3>
            <Link
              href="/admin"
              className="text-sm text-text-muted hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-text-muted">
          © {new Date().getFullYear()} Nous NLP. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
