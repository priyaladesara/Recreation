import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { products } from "@/lib/products";
import { ADDRESS_LINES, MAPS_URL } from "@/lib/company";

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-background-alt">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image src="/logo-wordmark-dark.png" alt="Recreation" width={872} height={130} className="h-9 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Government licensed electrical contractor and supplier of RMU,
              VCB, Transformer & Compact Substation equipment. Authorised
              dealer of HUCEEN.
            </p>
          </div>

          <nav aria-label="Products">
            <h2 className="eyebrow">Products</h2>
            <ul className="mt-5 space-y-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="text-sm text-muted transition-colors hover:text-green">
                    {p.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="eyebrow">Company</h2>
            <ul className="mt-5 space-y-3">
              {[
                ["/about", "About Us"],
                ["/products", "Products"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted transition-colors hover:text-green">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow">Contact</h2>
            <ul className="mt-5 space-y-4 text-sm text-muted">
              <li>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition-colors hover:text-green">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue" aria-hidden />
                  <address className="not-italic leading-relaxed">
                    {ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </a>
              </li>
              <li>
                <a href="tel:+919824444496" className="flex items-center gap-3 transition-colors hover:text-green">
                  <Phone className="h-4 w-4 shrink-0 text-blue" aria-hidden />
                  +91 98244 44496
                </a>
              </li>
              <li>
                <a href="mailto:sales@recreationindia.com" className="flex items-center gap-3 transition-colors hover:text-green">
                  <Mail className="h-4 w-4 shrink-0 text-blue" aria-hidden />
                  sales@recreationindia.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="font-mono-hud mt-16 flex flex-col justify-between gap-3 border-t border-border pt-8 text-[11px] text-muted md:flex-row">
          <p>© {new Date().getFullYear()} Recreation. Founded 2010 by Ritesh Patel.</p>
          <p>Govt. licensed electrical contractor · Authorised HUCEEN dealer</p>
        </div>
      </div>
    </footer>
  );
}
