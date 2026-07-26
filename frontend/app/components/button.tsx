import Link from "next/link";

type Variant = "primary" | "outline" | "light" | "ghost-dark";

const base =
  "inline-flex h-11 items-center justify-center rounded-full px-6 text-base font-semibold " +
  "transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] " +
  "focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-ring-focus " +
  "disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-deep active:bg-primary-deep",
  outline: "border border-hairline-strong bg-surface-card text-ink hover:bg-surface-bone",
  light: "bg-on-dark text-primary hover:bg-surface-bone",
  "ghost-dark": "border border-divider-dark text-on-dark hover:bg-on-dark/10",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`${base} ${variants[variant]}${className ? ` ${className}` : ""}`}
    />
  );
}

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
}

export function ButtonLink({ href, variant = "primary", children }: ButtonLinkProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]}`}>
      {children}
    </Link>
  );
}
