import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white shadow-lg shadow-black/5 overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
