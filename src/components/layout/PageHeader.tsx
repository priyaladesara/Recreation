import { ReactNode } from "react";

/** Shared inner-page header (clears the fixed navbar). */
export default function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: string }) {
  return (
    <section className="relative border-b border-border">
      <div className="mx-auto max-w-7xl px-6 pb-14 pt-36 lg:px-10 lg:pb-20 lg:pt-40">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="font-display mt-5 max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)] font-bold uppercase leading-[1] text-foreground">
          {title}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
      </div>
    </section>
  );
}
