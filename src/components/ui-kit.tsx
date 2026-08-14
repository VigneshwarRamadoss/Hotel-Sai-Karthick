import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-bold uppercase tracking-[0.14em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

export const buttonStyles = {
  primary: `${base} bg-gold text-accent-foreground hover:bg-gold-soft`,
  outline: `${base} border border-maroon/30 bg-transparent text-maroon hover:bg-maroon hover:text-maroon-foreground`,
  onDark: `${base} border border-gold/50 bg-transparent text-gold hover:bg-gold hover:text-accent-foreground`,
  quiet: `${base} bg-secondary text-secondary-foreground hover:bg-muted`,
} as const;

type Variant = keyof typeof buttonStyles;

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link {...props} className={`${buttonStyles[variant]} ${className}`} />;
}

export function ActionButton({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button {...props} className={`${buttonStyles[variant]} ${className}`} />;
}

/**
 * An external action (call, directions, ordering). When the underlying detail is
 * not yet confirmed by the client, renders as a clearly-marked disabled state
 * instead of a fake link.
 */
export function ExternalAction({
  href,
  children,
  variant = "primary",
  pendingLabel,
  className = "",
}: {
  href: string | null;
  children: ReactNode;
  variant?: Variant;
  pendingLabel: string;
  className?: string;
}) {
  if (!href) {
    return (
      <span
        className={`${buttonStyles[variant]} pointer-events-none opacity-55 ${className}`}
        title={pendingLabel}
      >
        {children}
        <span className="sr-only"> — {pendingLabel}</span>
      </span>
    );
  }
  return (
    <a href={href} className={`${buttonStyles[variant]} ${className}`}>
      {children}
    </a>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm border border-dashed border-gold bg-gold/10 px-2 py-0.5 text-xs font-semibold tracking-wide text-maroon">
      <span aria-hidden="true">◇</span>
      {children}
    </span>
  );
}

export function VegMark({ label = "Vegetarian" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-leaf">
      <span
        aria-hidden="true"
        className="grid size-3.5 place-items-center border border-leaf"
      >
        <span className="size-1.5 rounded-full bg-leaf" />
      </span>
      {label}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <header className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2
        className={`mt-3 text-3xl md:text-4xl ${tone === "dark" ? "text-maroon-foreground" : "text-maroon"}`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-base leading-relaxed ${tone === "dark" ? "text-maroon-foreground/80" : "text-muted-foreground"}`}
        >
          {intro}
        </p>
      ) : null}
    </header>
  );
}

/** Navy-equivalent "Premium Card" — deep maroon block, max once per page. */
export function PremiumCard({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-sm bg-maroon px-6 py-12 text-maroon-foreground shadow-elegant md:px-14 md:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-gold/10 blur-3xl steam-drift"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
