"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Headset, Layers, ShieldCheck } from "lucide-react";
import Panel from "@/components/ui/Panel";

const ease = [0.16, 1, 0.3, 1] as const;

const points = [
  {
    icon: ShieldCheck,
    title: "Government licensed contractor",
    desc: "Licensed electrical contracting, with compliance and safety on every project.",
  },
  {
    icon: BadgeCheck,
    title: "Authorised HUCEEN dealer",
    desc: "Genuine HUCEEN equipment, backed by manufacturer support.",
  },
  {
    icon: Layers,
    title: "Multi-product expertise",
    desc: "RMU, VCB, Transformer and Compact Substation under one roof.",
  },
  {
    icon: Headset,
    title: "End-to-end support",
    desc: "Specification, supply, installation and after-sales service.",
  },
];

export default function WhyUs() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Why Recreation</p>
            <h2 className="font-display mt-4 max-w-2xl text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold uppercase leading-[1.02] text-foreground">
              Standards we don&apos;t <span className="text-gradient">compromise on</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted">One licensed team, genuine equipment, and support that stays after handover.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease }}
            >
              <Panel interactive className="group h-full" innerClassName="p-6">
                <div className="flex items-center justify-between">
                  <span className="chamfer chamfer-sm flex h-12 w-12 items-center justify-center bg-surface-2 text-green transition-colors group-hover:bg-green group-hover:text-background">
                    <p.icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="font-mono-hud text-xs text-muted">0{i + 1}</span>
                </div>
                <h3 className="font-display mt-6 text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.desc}</p>
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
