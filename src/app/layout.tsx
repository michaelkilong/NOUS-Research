import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nous NLP - Nurturing Our Unique Speech",
  description: "Personal portfolio and research hub documenting works, articles, and projects in NLP and AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen pt-16 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
