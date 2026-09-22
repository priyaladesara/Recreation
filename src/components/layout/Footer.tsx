import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { products } from "@/lib/products";

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-background-alt">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-wordmark-dark.png"
                alt="Recreation"
                width={218}
                height={130}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Government licensed electrical contractor and supplier of RMU,
              VCB, Transformer & Compact Substation equipment — authorised
              dealer of HUCEEN.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Products
            </h4>
            <ul className="mt-4 space-y-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="text-sm text-muted transition-colors hover:text-green"
                  >
                    {p.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-sm text-muted transition-colors hover:text-green">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-muted transition-colors hover:text-green">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted transition-colors hover:text-green">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                Valsad, Gujarat, India
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-blue" />
                +91 98244 44496
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-blue" />
                sales@recreationindia.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted md:flex-row">
          <p>© {new Date().getFullYear()} Recreation. Founded 2010 by Ritesh Patel. All rights reserved.</p>
          <p>Government licensed electrical contractor · Authorised HUCEEN dealer</p>
        </div>
      </div>
    </footer>
  );
}
