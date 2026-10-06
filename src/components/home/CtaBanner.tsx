import Link from "next/link";
import { ArrowRight, Mail, MessageCircle, Phone } from "lucide-react";
import { whatsappQuoteUrl } from "@/lib/whatsapp";

/** `productName` (on product pages) is added to the WhatsApp quote message. */
export default function CtaBanner({ productName }: { productName?: string }) {
  return (
    <section className="relative px-6 py-20 lg:px-10">
      <div className="chamfer mx-auto max-w-7xl bg-[linear-gradient(135deg,var(--green),var(--border-strong)_40%,var(--blue))] p-px">
        <div className="chamfer relative overflow-hidden bg-surface">
          <div aria-hidden className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(46,168,240,0.16),transparent_65%)]" />
          <div aria-hidden className="absolute -bottom-48 -left-32 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(140,198,63,0.12),transparent_65%)]" />

          <div className="relative grid grid-cols-1 gap-10 p-8 sm:p-12 lg:grid-cols-12 lg:items-end lg:p-16">
            <div className="lg:col-span-8">
              <p className="eyebrow">Request a quote</p>
              <h2 className="font-display mt-4 text-[clamp(2.25rem,5vw,4rem)] font-bold uppercase leading-[1] text-foreground">
                Ready to power your <span className="text-gradient">next project?</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg text-muted">
                {productName
                  ? `Tell us your requirement for the ${productName} and our team will come back with a quote.`
                  : "Talk to our team about RMU, VCB, Transformer, Compact Substation, and power quality solutions tailored to your requirement."}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href={whatsappQuoteUrl(productName)} target="_blank" rel="noopener noreferrer" className="btn btn-primary chamfer">
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Request a Quote
                </a>
                <Link href="/products" className="btn btn-secondary group">
                  Browse products
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            </div>

            <ul className="space-y-3 lg:col-span-4">
              <li>
                <a href="tel:+919824444496" className="chamfer chamfer-sm flex min-h-14 items-center gap-3 bg-surface-2 px-4 transition-colors hover:bg-border">
                  <Phone className="h-4 w-4 text-green" aria-hidden />
                  <span className="font-mono-hud text-sm text-foreground">+91 98244 44496</span>
                </a>
              </li>
              <li>
                <a href="mailto:sales@recreationindia.com" className="chamfer chamfer-sm flex min-h-14 items-center gap-3 bg-surface-2 px-4 transition-colors hover:bg-border">
                  <Mail className="h-4 w-4 text-green" aria-hidden />
                  <span className="font-mono-hud break-all text-sm text-foreground">sales@recreationindia.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
