import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Recreation",
  description:
    "Get in touch with Recreation, a government licensed electrical contractor and supplier of RMU, VCB, Transformer & Compact Substation equipment, and authorised dealer of HUCEEN.",
};

const details = [
  { icon: MapPin, label: "Address", value: "Valsad, Gujarat, India" },
  { icon: Phone, label: "Phone", value: "+91 98244 44496" },
  { icon: Mail, label: "Email", value: "sales@recreationindia.com" },
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden bg-background pb-28 pt-40">
      <div className="grid-overlay absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-green">
            Get in Touch
          </span>
          <h1 className="font-display mt-4 max-w-2xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Let&apos;s talk about
            <span className="text-gradient"> your power requirement</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Whether it&apos;s a single unit or a full substation package, our
            team is ready to help specify, supply, and install the right
            solution.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Reveal direction="right">
              <div className="space-y-6">
                {details.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green/20 to-blue/20">
                      <item.icon className="h-5 w-5 text-blue" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal direction="left" delay={0.1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
