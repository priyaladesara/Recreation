const items = [
  "SERVING SINCE 2010",
  "GOVERNMENT LICENSED CONTRACTOR",
  "AUTHORISED HUCEEN DEALER",
  "RMU SUPPLY & INSTALLATION",
  "VCB SUPPLY & INSTALLATION",
  "TRANSFORMER SUPPLY",
  "COMPACT SUBSTATION SOLUTIONS",
];

export default function Marquee() {
  const loop = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-border bg-background-alt py-6">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-16">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-4 whitespace-nowrap text-sm font-semibold tracking-widest text-muted"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-green to-blue" />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
