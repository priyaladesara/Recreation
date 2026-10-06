"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappQuoteUrl } from "@/lib/whatsapp";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

/** Category filter + animated product grid. */
export default function ProductExplorer() {
  const [category, setCategory] = useState("All");
  const shown = category === "All" ? products : products.filter((p) => p.category === category);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {categories.map((c) => {
          const count = c === "All" ? products.length : products.filter((p) => p.category === c).length;
          const active = c === category;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={active}
              className={`chamfer chamfer-sm flex min-h-11 cursor-pointer items-center gap-2 px-4 text-sm font-medium transition-colors ${
                active ? "bg-green text-background" : "bg-surface-2 text-muted hover:bg-border hover:text-foreground"
              }`}
            >
              {c}
              <span className={`font-mono-hud text-[11px] ${active ? "text-background/70" : "text-muted"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((product) => (
            <motion.li
              key={product.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.15 } }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={product} index={products.indexOf(product)} />
            </motion.li>
          ))}
          {/* Completes the 4×2 grid on "All" and catches ratings not listed */}
          {category === "All" && (
            <motion.li key="custom" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <a
                href={whatsappQuoteUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="chamfer group flex h-full min-h-72 flex-col justify-between bg-[linear-gradient(135deg,var(--green),var(--border-strong)_45%,var(--blue))] p-px"
              >
                <span className="chamfer flex h-full flex-col justify-between bg-surface p-6 transition-colors group-hover:bg-surface-2">
                  <span className="font-mono-hud text-[10px] uppercase tracking-[0.16em] text-green">Custom requirement</span>
                  <span>
                    <span className="font-display block text-2xl font-bold uppercase leading-tight text-foreground">
                      Need a rating that isn&apos;t listed?
                    </span>
                    <span className="mt-3 block text-sm leading-relaxed text-muted">
                      Share your load and voltage and we&apos;ll specify the right equipment.
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-sm font-semibold text-green">
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Ask on WhatsApp
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </span>
              </a>
            </motion.li>
          )}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
