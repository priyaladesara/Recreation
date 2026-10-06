"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Masked word-by-word reveal. Each word slides up from behind its own clip box.
 * `animate` drives it directly (hero); otherwise it plays when scrolled into view.
 */
export default function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  animate,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  animate?: boolean;
}) {
  const words = text.split(" ");
  const trigger =
    animate === undefined
      ? { whileInView: "show", viewport: { once: true, amount: 0.6 } }
      : { animate: animate ? "show" : "hidden" };

  return (
    <motion.span
      className={className}
      initial="hidden"
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom"
        >
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            variants={{
              hidden: { y: "110%", rotate: 6 },
              show: { y: "0%", rotate: 0, transition: { duration: 0.9, ease } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
