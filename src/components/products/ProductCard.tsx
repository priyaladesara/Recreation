import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { Product } from "@/lib/products";
import Panel from "@/components/ui/Panel";
import ProductImage from "./ProductImage";
import { whatsappQuoteUrl } from "@/lib/whatsapp";

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Panel as="article" interactive className="group h-full" innerClassName="relative flex flex-col">
      <div className="relative">
        <ProductImage src={product.image} alt={product.name} />
        <span className="font-mono-hud absolute left-4 top-4 bg-background px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-blue">
          {product.category}
        </span>
        <span className="font-mono-hud absolute right-4 top-4 text-[11px] font-semibold text-[#4a5563]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-foreground">
          {/* Stretched link: the whole card opens the product */}
          <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{product.tagline}</p>

        <dl className="font-mono-hud mt-5 grid grid-cols-2 gap-px bg-border text-[11px]">
          {product.specs.slice(0, 2).map((s) => (
            <div key={s.label} className="bg-surface-2 px-3 py-2.5">
              <dt className="uppercase tracking-wider text-muted">{s.label}</dt>
              <dd className="mt-1 text-foreground">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="relative z-10 mt-auto flex items-center justify-between gap-3 pt-6">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-green">
            View details
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </span>
          <a
            href={whatsappQuoteUrl(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Request a quote for ${product.name} on WhatsApp`}
            className="chamfer chamfer-sm flex h-11 w-11 cursor-pointer items-center justify-center bg-surface-2 text-foreground transition-colors hover:bg-green hover:text-background"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>
    </Panel>
  );
}
