import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import Panel from "@/components/ui/Panel";
import Credentials from "@/components/home/Credentials";
import CtaBanner from "@/components/home/CtaBanner";
import PageHeader from "@/components/layout/PageHeader";
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
      <PageHeader
        eyebrow="About Recreation"
        title={
          <>
            A licensed contractor <span className="text-gradient">you can rely on</span>
          </>
        }
        intro="Founded in 2010 by Ritesh Patel, Recreation is a government licensed electrical contractor and supplier of RMU, VCB, Transformer, and Compact Substation equipment — and an authorised dealer of HUCEEN, based in Valsad, Gujarat."
      />

      <Credentials />

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-6 lg:grid-cols-3 lg:px-10">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.06}>
              <Panel interactive className="group h-full" innerClassName="p-8">
                <span className="chamfer chamfer-sm flex h-12 w-12 items-center justify-center bg-surface-2 text-green transition-colors group-hover:bg-green group-hover:text-background">
                  <value.icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                </span>
                <h2 className="font-display mt-6 text-xl font-semibold text-foreground">{value.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{value.desc}</p>
              </Panel>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <p className="eyebrow">What we do</p>
            <h2 className="font-display mt-4 text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold uppercase leading-[1.02] text-foreground">
              Licensed, authorised, and <span className="text-gradient">equipped to deliver</span>
            </h2>
          </div>
          <ol className="relative border-l border-border lg:col-span-7">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.06}>
                <li className="relative pb-10 pl-9 last:pb-0">
                  <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 border-2 border-background bg-green" aria-hidden />
                  <h3 className="font-display text-lg font-semibold text-foreground">{item.year}</h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted">{item.desc}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
