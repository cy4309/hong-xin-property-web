import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionTitle({
  title,
  subtitle,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-12", className)}>
      <div className="flex items-start gap-4">
        <div className="w-2 shrink-0 self-stretch rounded-full bg-primary" />
        <div>
          <h2 className="text-2xl font-bold text-deep">{title}</h2>
          {subtitle && <p className="mt-2 text-neutral-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
