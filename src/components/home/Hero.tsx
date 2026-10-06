"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, BadgeCheck, CalendarCheck, MessageCircle, ShieldCheck } from "lucide-react";
import { whatsappQuoteUrl } from "@/lib/whatsapp";

// three.js is client-only and heavy: load it after first paint, holding its space meanwhile.
const TransformerViewer = dynamic(() => import("./TransformerViewer"), {
  ssr: false,
  loading: () => (
    <div className="relative">
      <div className="flex aspect-square w-full items-center justify-center sm:aspect-[5/4] lg:aspect-square">
        <div className="h-2/3 w-2/3 animate-pulse rounded-full bg-[radial-gradient(circle,rgba(46,168,240,0.12),transparent_65%)]" />
      </div>
      <div className="mt-4 h-11" />
      <div className="mt-3 min-h-[92px]" />
    </div>
  ),
});

const credentials = [
  { icon: ShieldCheck, label: "Govt. licensed contractor" },
  { icon: BadgeCheck, label: "Authorised HUCEEN dealer" },
  { icon: CalendarCheck, label: "Serving since 2010" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-32 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pt-36">
        <div className="lg:col-span-6">
          {/* Entrance animations are pure CSS (.rise) so they play at first paint, without waiting
              for JavaScript to load and hydrate. */}
          <p className="rise eyebrow flex items-center gap-3">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-green animate-[ping-soft_2s_ease-out_infinite]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
            </span>
            Vapi, Gujarat · Est. 2010
          </p>

          <h1 className="font-display mt-6 text-[clamp(2.5rem,5vw,4.25rem)] font-bold uppercase leading-[0.98] tracking-[-0.01em] text-foreground">
            <span className="rise block" style={{ "--d": "0.06s" } as React.CSSProperties}>
              Electrical Contractor &amp;
            </span>
            <span className="rise block" style={{ "--d": "0.14s" } as React.CSSProperties}>
              <span className="text-gradient">Power Equipment</span>
            </span>
            <span className="rise block" style={{ "--d": "0.22s" } as React.CSSProperties}>
              Solutions
            </span>
          </h1>

          <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-muted" style={{ "--d": "0.3s" } as React.CSSProperties}>
            Recreation is a government licensed electrical contractor and
            supplier of RMU, VCB, Transformer, and Compact Substation
            equipment, and an authorised dealer of HUCEEN. From
            specification to installation and after-sales support, we keep
            your power infrastructure running.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ "--d": "0.38s" } as React.CSSProperties}>
            <Link href="/products" className="btn btn-primary chamfer group">
              Explore products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <a href={whatsappQuoteUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <MessageCircle className="h-4 w-4 text-green" aria-hidden />
              Get a quote on WhatsApp
            </a>
          </div>

          <ul className="rise mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6" style={{ "--d": "0.46s" } as React.CSSProperties}>
            {credentials.map((c) => (
              <li key={c.label} className="flex items-center gap-2 text-sm text-foreground/90">
                <c.icon className="h-4 w-4 text-green" aria-hidden />
                {c.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <TransformerViewer />
        </div>
      </div>
    </section>
  );
}
