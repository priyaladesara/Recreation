import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-background-alt py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-green/10 to-blue/10 blur-[100px]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Ready to power your next project?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            Talk to our team about RMU, VCB, Transformer, Compact Substation,
            and power quality solutions tailored to your requirement.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green to-blue px-7 py-3.5 text-sm font-semibold text-background transition-transform hover:scale-105"
            >
              Request a Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-blue hover:text-blue"
            >
              Browse Products
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
