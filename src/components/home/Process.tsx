import Reveal from "@/components/ui/Reveal";

const steps = [
  { n: "01", title: "Consultation & Specification", desc: "We understand your requirement and recommend the right RMU, VCB, Transformer, or Compact Substation solution." },
  { n: "02", title: "Supply & Sourcing", desc: "Genuine equipment sourced and supplied, including authorised HUCEEN products." },
  { n: "03", title: "Installation", desc: "Our licensed electrical contracting team handles safe, compliant installation." },
  { n: "04", title: "After-Sales Support", desc: "Ongoing maintenance and service support after handover." },
];

export default function Process() {
  return (
    <section className="relative bg-background py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-green">
            Our Process
          </span>
          <h2 className="font-display mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            From specification to commissioned asset
          </h2>
        </Reveal>

        <div className="relative mt-20">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-border lg:block" />
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.12}>
                <div className="relative">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface font-display text-sm font-semibold text-green">
                    {step.n}
                  </div>
                  <h3 className="font-display mt-6 text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
