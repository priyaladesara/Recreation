import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Panel from "@/components/ui/Panel";
import ContactForm from "@/components/contact/ContactForm";
import PageHeader from "@/components/layout/PageHeader";
import { whatsappQuoteUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact | Recreation",
  description:
    "Get in touch with Recreation, a government licensed electrical contractor and supplier of RMU, VCB, Transformer & Compact Substation equipment, and authorised dealer of HUCEEN.",
};

const details = [
  { icon: MapPin, label: "Address", value: "Valsad, Gujarat, India" },
  { icon: Phone, label: "Phone", value: "+91 98244 44496", href: "tel:+919824444496" },
  { icon: Mail, label: "Email", value: "sales@recreationindia.com", href: "mailto:sales@recreationindia.com" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title={
          <>
            Let&apos;s talk about <span className="text-gradient">your power requirement</span>
          </>
        }
        intro="Whether it's a single unit or a full substation package, our team is ready to help specify, supply, and install the right solution."
      />

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 lg:grid-cols-5 lg:px-10">
          <Reveal direction="right" className="space-y-4 lg:col-span-2">
            {details.map((item) => (
              <Panel key={item.label} innerClassName="flex items-start gap-4 p-5">
                <span className="chamfer chamfer-sm flex h-11 w-11 shrink-0 items-center justify-center bg-surface-2 text-green">
                  <item.icon className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                </span>
                <div>
                  <p className="font-mono-hud text-[11px] uppercase tracking-wider text-muted">{item.label}</p>
                  <p className="mt-1 font-medium text-foreground">
                    {item.href ? (
                      <a href={item.href} className="transition-colors hover:text-green">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </p>
                </div>
              </Panel>
            ))}
            <a href={whatsappQuoteUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-primary chamfer w-full">
              <MessageCircle className="h-4 w-4" aria-hidden />
              Chat with us on WhatsApp
            </a>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="lg:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
