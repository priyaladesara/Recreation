import { ReactNode } from "react";

/**
 * Chamfered panel with a 1px border. clip-path cuts CSS borders at the angled corners, so the
 * border is an outer layer showing through a 1px gap around the inner surface.
 * `interactive` turns the border lime on hover/focus-within.
 */
export default function Panel({
  children,
  className,
  innerClassName,
  interactive = false,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  interactive?: boolean;
  as?: "div" | "article" | "li" | "section";
}) {
  return (
    <Tag
      className={`chamfer p-px transition-colors duration-300 ${
        interactive
          ? "bg-border hover:bg-[linear-gradient(135deg,var(--green),var(--border-strong)_60%)] focus-within:bg-green"
          : "bg-border"
      } ${className ?? ""}`}
    >
      <div className={`chamfer h-full bg-surface ${innerClassName ?? ""}`}>{children}</div>
    </Tag>
  );
}
