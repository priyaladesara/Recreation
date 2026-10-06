import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductExplorer from "@/components/products/ProductExplorer";

export default function ProductHighlights() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Product range</p>
            <h2 className="font-display mt-4 max-w-2xl text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold uppercase leading-[1.02] text-foreground">
              Built for every point in the <span className="text-gradient">power chain</span>
            </h2>
          </div>
          <Link href="/products" className="btn btn-secondary group w-fit shrink-0">
            View all products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
        <div className="mt-10">
          <ProductExplorer />
        </div>
      </div>
    </section>
  );
}
