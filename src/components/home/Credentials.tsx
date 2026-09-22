import { ShieldCheck, BadgeCheck, PackageCheck, Wrench } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const credentials = [
  {
    icon: ShieldCheck,
    label: "Government Licensed",
    desc: "Electrical Contractor",
  },
  {
    icon: BadgeCheck,
    label: "Authorised Dealer",
    desc: "HUCEEN",
  },
  {
    icon: PackageCheck,
    label: "Multi-Product Supply",
    desc: "RMU, VCB, Transformer & Compact Substation",
  },
  {
    icon: Wrench,
    label: "End-to-End Service",
    desc: "Supply, Installation & Support",
  },
];

export default function Credentials() {
  return (
    <section className="relative bg-background py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <div className="flex items-start gap-4 text-left">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green/20 to-blue/20">
                  <item.icon className="h-5 w-5 text-green" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-muted">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
