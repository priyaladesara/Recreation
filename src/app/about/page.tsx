import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerReveal";
import Credentials from "@/components/home/Credentials";
import CtaBanner from "@/components/home/CtaBanner";
import { Target, Eye, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Recreation",
  description:
    "Founded in 2010 by Ritesh Patel, Recreation is a government licensed electrical contractor and supplier of RMU, VCB, Transformer, and Compact Substation equipment, and an authorised dealer of HUCEEN.",
};

const values = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "To supply and install electrical infrastructure that utilities, industries, and businesses can depend on, without compromise on safety or compliance.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    desc: "To be a trusted electrical contracting partner across every stage — from specification to after-sales support.",
  },
  {
    icon: HeartHandshake,
    title: "Our Commitment",
    desc: "Long-term partnerships built on licensed contracting work, genuine equipment, and responsive service.",
  },
];

const timeline = [
  { year: "2010", desc: "Recreation is founded by Ritesh Patel in Valsad, Gujarat." },
  { year: "Government License", desc: "Recreation holds a government electrical license to carry out contracting work." },
  { year: "HUCEEN Dealership", desc: "Authorised as a dealer for HUCEEN, giving direct access to genuine equipment and manufacturer support." },
  { year: "Product Range", desc: "Supplying RMU, VCB, Transformer, and Compact Substation equipment for industrial and infrastructure projects." },
  { year: "Today", desc: "Based in Valsad, Gujarat, serving customers with supply, installation, and after-sales support." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-background pb-20 pt-40">
        <div className="grid-overlay absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-green">
              About Recreation
            </span>
            <h1 className="font-display mt-4 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              A licensed contractor
              <span className="text-gradient"> you can rely on</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Founded in 2010 by Ritesh Patel, Recreation is a government
              licensed electrical contractor and supplier of RMU, VCB,
              Transformer, and Compact Substation equipment — and an
              authorised dealer of HUCEEN, based in Valsad, Gujarat.
            </p>
          </Reveal>
        </div>
      </section>

      <Credentials />

      <section className="relative bg-background-alt py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <StaggerGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {values.map((value) => (
              <StaggerItem
                key={value.title}
                className="rounded-2xl border border-border bg-background p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green/20 to-blue/20">
                  <value.icon className="h-6 w-6 text-blue" strokeWidth={1.75} />
                </div>
                <h3 className="font-display mt-5 text-xl font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {value.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="relative bg-background py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue">
              What We Do
            </span>
            <h2 className="font-display mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Licensed, authorised, and equipped to deliver
            </h2>
          </Reveal>

          <div className="relative mt-16 space-y-12 border-l border-border pl-10">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.08}>
                <div className="relative">
                  <span className="absolute -left-[45px] top-1 h-3 w-3 rounded-full bg-gradient-to-br from-green to-blue" />
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {item.year}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
