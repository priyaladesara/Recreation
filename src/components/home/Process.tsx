"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Panel from "@/components/ui/Panel";

const steps = [
  { n: "01", title: "Consultation & specification", desc: "We understand your requirement and recommend the right RMU, VCB, Transformer, or Compact Substation solution." },
  { n: "02", title: "Supply & sourcing", desc: "Genuine equipment sourced and supplied, including authorised HUCEEN products." },
  { n: "03", title: "Installation", desc: "Our licensed electrical contracting team handles safe, compliant installation." },
  { n: "04", title: "After-sales support", desc: "Ongoing maintenance and service support after handover." },
];

/** Four-step process; a current line runs through the steps once the section is in view. */
export default function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const total = reduce ? 0 : 1.4;

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="eyebrow">Our process</p>
        <h2 className="font-display mt-4 max-w-3xl text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold uppercase leading-[1.02] text-foreground">
          From specification to <span className="text-gradient">commissioned asset</span>
        </h2>

        <ol ref={ref} className="relative mt-14 grid grid-cols-1 gap-5 lg:grid-cols-4">
          {/* Current line (desktop: across the top of the steps) */}
          <span aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-border lg:block" />
          <motion.span
            aria-hidden
            className="absolute left-0 right-0 top-[27px] hidden h-px origin-left bg-gradient-to-r from-green to-blue shadow-[0_0_10px_rgba(140,198,63,0.7)] lg:block"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: total, ease: "easeInOut" }}
          />
          {steps.map((step, i) => {
            const delay = (total * (i + 0.4)) / steps.length;
            return (
              <li key={step.n} className="relative flex flex-col">
                <motion.span
                  className="font-mono-hud relative z-10 flex h-14 w-14 items-center justify-center border text-sm font-semibold"
                  initial={{ borderColor: "var(--border-strong)", color: "var(--muted)", backgroundColor: "var(--background)" }}
                  animate={inView ? { borderColor: "var(--green)", color: "var(--background)", backgroundColor: "var(--green)" } : {}}
                  transition={{ duration: 0.3, delay }}
                >
                  {step.n}
                </motion.span>
                <Panel className="mt-5 flex-1" innerClassName="p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
                </Panel>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
