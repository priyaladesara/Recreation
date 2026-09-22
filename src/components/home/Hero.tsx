"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden bg-background"
    >
      <div className="grid-overlay absolute inset-0" />

      <motion.div
        style={{ scale }}
        className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-green/25 blur-[120px]"
      />
      <motion.div
        style={{ scale }}
        className="pointer-events-none absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-blue/25 blur-[130px]"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-7xl px-6 pt-24 lg:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-green animate-pulse" />
          Government Licensed Electrical Contractor
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          Powering your grid with
          <span className="text-gradient"> trusted switchgear </span>
          solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          Recreation is a government licensed electrical contractor and
          supplier of RMU, VCB, Transformer, and Compact Substation
          equipment — and an authorised dealer of HUCEEN. From
          specification to installation and after-sales support, we keep
          your power infrastructure running.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green to-blue px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-105"
          >
            Explore Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-green hover:text-green"
          >
            Talk to an Engineer
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-muted"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
