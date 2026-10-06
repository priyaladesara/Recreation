import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import Reveal from "@/components/ui/Reveal";
import Panel from "@/components/ui/Panel";
import CtaBanner from "@/components/home/CtaBanner";
import ProductImage from "@/components/products/ProductImage";
import { whatsappQuoteUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Recreation`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const currentIndex = products.findIndex((p) => p.slug === slug);
  const next = products[(currentIndex + 1) % products.length];

  return (
    <>
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-32 lg:px-10">
          <Link
            href="/products"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-green"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All products
          </Link>

          <div className="mt-6 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal direction="right">
              <Panel>
                <ProductImage src={product.image} alt={product.name} priority sizes="(min-width: 1024px) 600px, 100vw" />
              </Panel>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <p className="eyebrow">{product.category}</p>
              <h1 className="font-display mt-4 text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold uppercase leading-[1.02] text-foreground">
                {product.name}
              </h1>
              <p className="mt-4 text-lg font-medium text-blue">{product.tagline}</p>
              <p className="mt-5 max-w-xl leading-relaxed text-muted">{product.description}</p>

              <dl className="font-mono-hud mt-7 grid grid-cols-2 gap-px bg-border text-xs">
                {product.specs.slice(0, 4).map((s) => (
                  <div key={s.label} className="bg-surface px-4 py-3">
                    <dt className="uppercase tracking-wider text-muted">{s.label}</dt>
                    <dd className="mt-1 text-sm text-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={whatsappQuoteUrl(product.name)} target="_blank" rel="noopener noreferrer" className="btn btn-primary chamfer">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Request a Quote
                </a>
                <Link href="/contact" className="btn btn-secondary">
                  Send an enquiry
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background-alt py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <Panel innerClassName="p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold uppercase text-foreground">Technical specifications</h2>
              <dl className="font-mono-hud mt-6 text-sm">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex items-baseline justify-between gap-4 border-b border-border py-3.5 last:border-b-0">
                    <dt className="uppercase tracking-wider text-muted">{spec.label}</dt>
                    <dd className="text-right text-foreground">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
          </Reveal>

          <Reveal delay={0.1}>
            <Panel className="h-full" innerClassName="p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold uppercase text-foreground">Key features</h2>
              <ul className="mt-6 space-y-4">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="chamfer chamfer-sm mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-green">
                      <Check className="h-3.5 w-3.5 text-background" strokeWidth={3} aria-hidden />
                    </span>
                    <p className="leading-relaxed text-foreground/90">{feature}</p>
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link href={`/products/${next.slug}`} className="group block">
            <Panel interactive innerClassName="flex items-center justify-between gap-6 p-6">
              <div>
                <span className="eyebrow text-[10px]">Next product</span>
                <p className="font-display mt-1 text-xl font-semibold text-foreground">{next.name}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-green transition-transform group-hover:translate-x-1" aria-hidden />
            </Panel>
          </Link>
        </div>
      </section>

      <CtaBanner productName={product.name} />
    </>
  );
}
