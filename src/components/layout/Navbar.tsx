"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
import { getProduct } from "@/lib/products";
import { whatsappQuoteUrl } from "@/lib/whatsapp";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  // On a product page, the quote message names that product.
  const currentProduct = pathname.startsWith("/products/")
    ? getProduct(pathname.split("/")[2])
    : undefined;
  const quoteUrl = whatsappQuoteUrl(currentProduct?.name);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? "border-border bg-background/90 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-10" aria-label="Main">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Image
            src="/logo-wordmark-dark.png"
            alt="Recreation"
            width={872}
            height={130}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex min-h-11 items-center px-4 text-sm font-medium transition-colors ${
                    active ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span layoutId="nav-active" className="absolute inset-x-4 bottom-1.5 h-[2px] bg-green" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <a
          href={quoteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary chamfer chamfer-sm hidden min-h-11 lg:inline-flex"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Get a Quote
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-11 w-11 cursor-pointer items-center justify-center text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <ul className="px-6 py-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    className={`flex min-h-12 items-center text-base font-medium ${
                      isActive(pathname, link.href) ? "text-green" : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-5">
              <a href={quoteUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary chamfer w-full">
                <MessageCircle className="h-4 w-4" aria-hidden />
                Get a Quote on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
