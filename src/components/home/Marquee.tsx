const items = [
  "RMU",
  "HV VCB",
  "MV VCB",
  "Power & distribution transformers",
  "Compact substations",
  "Voltage stabilisers",
  "UPS systems",
  "Supply · Installation · Support",
];

/** Range ticker. Pure CSS animation (compositor-only); pauses on hover, static for reduced motion. */
export default function Marquee() {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="font-display whitespace-nowrap px-7 text-2xl font-semibold uppercase text-foreground/85 sm:text-3xl">
            {item}
          </span>
          <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-green" aria-hidden>
            <path fill="currentColor" d="M13 2 4 14h7l-1 8 9-12h-7z" />
          </svg>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label="Our range"
      className="group overflow-hidden border-y border-border bg-background-alt py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div className="flex w-max animate-[marquee_45s_linear_infinite] group-hover:[animation-play-state:paused]">
        {row()}
        {row(true)}
      </div>
    </section>
  );
}
