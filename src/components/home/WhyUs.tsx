import { ShieldCheck, BadgeCheck, Layers, Headset } from "lucide-react";
import { StaggerGroup, StaggerItem } from "@/components/ui/StaggerReveal";
import Reveal from "@/components/ui/Reveal";

const points = [
  {
    icon: ShieldCheck,
    title: "Government Licensed Contractor",
    desc: "Licensed to carry out electrical contracting work, ensuring compliance and safety on every project.",
  },
  {
    icon: BadgeCheck,
    title: "Authorised HUCEEN Dealer",
    desc: "Direct access to genuine HUCEEN equipment, backed by manufacturer support.",
  },
  {
    icon: Layers,
    title: "Multi-Product Expertise",
    desc: "RMU, VCB, Transformer, and Compact Substation solutions supplied under one roof.",
  },
  {
    icon: Headset,
    title: "End-to-End Support",
    desc: "From specification and supply through installation and after-sales service.",
  },
];

export default function WhyUs() {
  return (
    <section className="relative bg-background-alt py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-blue">
            Why Recreation
          </span>
          <h2 className="font-display mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Standards we don&apos;t compromise on
          </h2>
        </Reveal>

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <StaggerItem key={point.title} className="bg-background-alt p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green/20 to-blue/20">
                <point.icon className="h-6 w-6 text-green" strokeWidth={1.75} />
              </div>
              <h3 className="font-display mt-5 text-lg font-semibold text-foreground">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.desc}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
