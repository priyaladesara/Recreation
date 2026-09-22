"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/products";
import Reveal from "@/components/ui/Reveal";
import { motion } from "framer-motion";

export default function ProductHighlights() {
  return (
    <section className="relative bg-background py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-green">
                Product Range
              </span>
              <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Built for every point
                <br /> in the power chain
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-green"
            >
              View all products
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={(i % 3) * 0.1}>
              <Link href={`/products/${product.slug}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-surface"
                >
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue">
                      {product.category}
                    </span>
                    <h3 className="font-display mt-2 text-xl font-semibold text-foreground">
                      {product.shortName}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {product.tagline}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-green opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
