import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
};

export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const base = "rounded-2xl px-6 py-3 font-medium transition-colors";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    outline: "border-2 border-primary text-primary hover:bg-primary/10",
  };
  return (
    <button
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
