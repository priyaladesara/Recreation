import Image from "next/image";

/**
 * Fixed 4:3 product photo slot (reserves space, no layout shift).
 * The supplied photos are studio shots on a light grey backdrop, so the slot is a matching light
 * "studio" panel and the photo uses mix-blend-multiply: its near-white background melts into the
 * panel instead of showing as a pasted rectangle on the dark theme.
 */
export default function ProductImage({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw",
  className,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={`brackets relative aspect-[4/3] w-full overflow-hidden bg-[radial-gradient(ellipse_at_50%_35%,#f6f8fa_0%,#e9edf1_55%,#d3d9e0_100%)] ${className ?? ""}`}
    >
      {/* Soft floor shadow under the equipment */}
      <div aria-hidden className="absolute inset-x-[18%] bottom-[9%] h-[8%] rounded-[50%] bg-[#1b222b]/25 blur-lg" />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-contain p-5 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.05] sm:p-6"
      />
    </div>
  );
}
