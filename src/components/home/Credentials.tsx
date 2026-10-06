"use client";

import { motion } from "framer-motion";
import Counter from "@/components/ui/Counter";
import Panel from "@/components/ui/Panel";
import { products } from "@/lib/products";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Credentials() {
  const stats = [
    { value: new Date().getFullYear() - 2010, unit: "+", label: "Years in the field", note: "Since 2010" },
    { value: products.length, unit: "", label: "Product lines", note: "Switchgear to power quality" },
    { value: 145, unit: "kV", label: "HV VCB rating", note: "Up to · IEC 62271-100" },
    { value: 100, unit: "MVA", label: "Transformer range", note: "From 25 kVA" },
  ];

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease }}
            >
              <Panel className="h-full" innerClassName="p-5 sm:p-7">
                <p className="font-mono-hud text-[10px] uppercase tracking-[0.16em] text-muted">{s.note}</p>
                <p className="font-display mt-4 flex items-baseline gap-1.5 text-[clamp(2.5rem,5vw,4rem)] font-bold leading-none text-foreground">
                  <Counter to={s.value} className="tabular-nums" />
                  <span className="text-[0.42em] font-semibold text-green">{s.unit}</span>
                </p>
                <p className="mt-3 text-sm font-medium text-foreground/90">{s.label}</p>
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
