import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getProduct, products } from "@/lib/products";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerReveal";
import CtaBanner from "@/components/home/CtaBanner";

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
      <section className="relative overflow-hidden bg-background pb-20 pt-32">
        <div className="grid-overlay absolute inset-0 opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-green"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal direction="right">
              <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-border sm:h-96 lg:h-[440px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <span className="text-xs font-semibold uppercase tracking-widest text-green">
                {product.category}
              </span>
              <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-3 text-lg text-blue">{product.tagline}</p>
              <p className="mt-6 text-base leading-relaxed text-muted">
                {product.description}
              </p>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green to-blue px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-105"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative bg-background-alt py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Technical Specifications
            </h2>
            <dl className="mt-8 divide-y divide-border">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between py-4"
                >
                  <dt className="text-sm text-muted">{spec.label}</dt>
                  <dd className="text-sm font-semibold text-foreground">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Key Features
            </h2>
            <StaggerGroup className="mt-8 space-y-4">
              {product.features.map((feature) => (
                <StaggerItem key={feature} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green/20 to-blue/20">
                    <Check className="h-3.5 w-3.5 text-green" />
                  </span>
                  <p className="text-sm leading-relaxed text-muted">
                    {feature}
                  </p>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Reveal>
        </div>
      </section>

      <section className="relative border-t border-border bg-background py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <Link
              href={`/products/${next.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-blue/50"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Next Product
                </span>
                <p className="font-display mt-1 text-xl font-semibold text-foreground">
                  {next.name}
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-blue transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
