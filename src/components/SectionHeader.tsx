interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({ title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2 className="text-3xl sm:text-4xl font-bold text-text mb-3">{title}</h2>
      {subtitle && (
        <p className="text-lg text-text-muted max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className={`mt-4 h-1 w-16 bg-primary rounded-full ${centered ? "mx-auto" : ""}`} />
    </div>
  );
}
