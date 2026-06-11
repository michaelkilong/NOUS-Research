"use client";

import { motion } from "framer-motion";
import { Mail, Github, Twitter, Linkedin, MapPin } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeader from "@/components/SectionHeader";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <SectionHeader
          title="About"
          subtitle="The story behind Nous NLP and the research that drives it."
          centered
        />

        <div className="mt-16 space-y-16">
          {/* Bio */}
          <ScrollReveal>
            <div className="bg-white rounded-2xl border border-border p-8 sm:p-12">
              <h2 className="text-2xl font-bold text-text mb-6">Who I Am</h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  Welcome to <strong className="text-text">Nous NLP</strong> — a personal research hub
                  dedicated to exploring the frontiers of Natural Language Processing and Artificial Intelligence.
                </p>
                <p>
                  The name <em>Nous</em> stands for <strong className="text-text">Nurturing Our Unique Speech</strong>,
                  reflecting a commitment to understanding, preserving, and advancing the way humans communicate through language.
                </p>
                <p>
                  This space documents research, experiments, and projects spanning transformer architectures,
                  large language models, sentiment analysis, named entity recognition, and multimodal AI systems.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Research Focus */}
          <ScrollReveal>
            <div className="bg-white rounded-2xl border border-border p-8 sm:p-12">
              <h2 className="text-2xl font-bold text-text mb-6">Research Focus</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Large Language Models", desc: "Fine-tuning, prompt engineering, and evaluation of LLMs for domain-specific applications." },
                  { title: "Sentiment Analysis", desc: "Multilingual emotion detection and opinion mining across social and clinical text." },
                  { title: "Named Entity Recognition", desc: "Building robust NER pipelines for low-resource languages and specialized domains." },
                  { title: "Multimodal AI", desc: "Integrating vision and language models for richer understanding and generation." },
                  { title: "Text Summarization", desc: "Abstractive and extractive summarization techniques for long-form documents." },
                  { title: "Speech Processing", desc: "ASR, TTS, and speech-to-text systems for diverse accents and dialects." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-xl bg-surface-alt border border-border hover:border-primary/30 transition-colors"
                  >
                    <h3 className="font-semibold text-text mb-1">{item.title}</h3>
                    <p className="text-sm text-text-muted">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Tech Stack */}
          <ScrollReveal>
            <div className="bg-white rounded-2xl border border-border p-8 sm:p-12">
              <h2 className="text-2xl font-bold text-text mb-6">Tools & Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python", "PyTorch", "TensorFlow", "Hugging Face", "spaCy", "NLTK",
                  "OpenAI API", "LangChain", "FastAPI", "Next.js", "MongoDB",
                  "Docker", "AWS", "Google Cloud", "Git", "Linux"
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal>
            <div className="bg-white rounded-2xl border border-border p-8 sm:p-12">
              <h2 className="text-2xl font-bold text-text mb-6">Get in Touch</h2>
              <p className="text-text-muted mb-8">
                Interested in collaborating on research, discussing NLP ideas, or just saying hello? Reach out through any of the channels below.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:hello@nousnlp.com"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                >
                  <Mail size={18} /> hello@nousnlp.com
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-5 py-3 border-2 border-border rounded-xl hover:border-primary hover:text-primary transition-colors"
                >
                  <Github size={18} /> GitHub
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-5 py-3 border-2 border-border rounded-xl hover:border-primary hover:text-primary transition-colors"
                >
                  <Twitter size={18} /> Twitter
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-5 py-3 border-2 border-border rounded-xl hover:border-primary hover:text-primary transition-colors"
                >
                  <Linkedin size={18} /> LinkedIn
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
