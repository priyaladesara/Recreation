import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/products";
import Reveal from "@/components/ui/Reveal";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "Products | Recreation",
  description:
    "Explore the range of RMU, VCB, Transformer, Compact Substation, Voltage Stabiliser, and UPS equipment supplied and installed by Recreation.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-background pb-16 pt-40">
        <div className="grid-overlay absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-green">
              Product Range
            </span>
            <h1 className="font-display mt-4 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Equipment built for
              <span className="text-gradient"> every voltage level</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              From high voltage switchgear to power quality systems —
              supplied, installed, and supported by a licensed electrical
              contracting team.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative bg-background pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 3) * 0.1}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-green/50"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue">
                      {product.category}
                    </span>
                    <h2 className="font-display mt-2 text-xl font-semibold text-foreground">
                      {product.name}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {product.tagline}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-green">
                      View specifications
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
