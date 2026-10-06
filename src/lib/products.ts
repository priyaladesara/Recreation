export type Product = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  tagline: string;
  description: string;
  /**
   * Product photo shown in a 4:3 frame with object-contain. To use a real photo, drop it in
   * public/products/ (transparent PNG/WebP, ~1200 × 900 works best) and point this path at it.
   */
  image: string;
  specs: { label: string; value: string }[];
  features: string[];
};

export const products: Product[] = [
  {
    slug: "hv-vcb",
    name: "High Voltage Vacuum Circuit Breaker",
    shortName: "HV VCB",
    category: "Switchgear",
    tagline: "Reliable protection for high voltage networks",
    description:
      "We supply and install High Voltage Vacuum Circuit Breakers for transmission and sub-transmission networks, backed by our licensed electrical contracting team for safe, compliant commissioning.",
    image: "/products/hv-vcb.png",
    specs: [
      { label: "Rated Voltage", value: "Up to 145 kV" },
      { label: "Rated Current", value: "630 – 4000 A" },
      { label: "Breaking Capacity", value: "Up to 40 kA" },
      { label: "Mechanism", value: "Spring operated" },
      { label: "Standard", value: "IEC 62271-100" },
    ],
    features: [
      "Vacuum interruption technology for long service life",
      "Low maintenance, high mechanical endurance",
      "Suitable for outdoor and indoor installations",
      "Supplied with installation and commissioning support",
    ],
  },
  {
    slug: "mv-vcb",
    name: "Medium Voltage Vacuum Circuit Breaker",
    shortName: "MV VCB",
    category: "Switchgear",
    tagline: "Reliable switching for distribution networks",
    description:
      "Compact and robust Medium Voltage Vacuum Circuit Breakers supplied and installed for distribution substations that demand safe, fast, and reliable switching across industrial and utility applications.",
    image: "/products/mv-vcb.png",
    specs: [
      { label: "Rated Voltage", value: "3.6 – 36 kV" },
      { label: "Rated Current", value: "630 – 3150 A" },
      { label: "Breaking Capacity", value: "Up to 31.5 kA" },
      { label: "Mechanism", value: "Spring / Motorized" },
      { label: "Standard", value: "IEC 62271-100" },
    ],
    features: [
      "Compact footprint for space-constrained panels",
      "Fast closing and opening operation",
      "Withdrawable and fixed pattern options",
      "Anti-condensation heater compatible",
    ],
  },
  {
    slug: "rmu",
    name: "Ring Main Unit",
    shortName: "RMU",
    category: "Switchgear",
    tagline: "Compact, sealed, and maintenance-free",
    description:
      "SF6 and air-insulated Ring Main Units supplied and installed for safe, reliable, and compact switching on secondary distribution networks, with minimal maintenance requirements.",
    image: "/products/rmu.png",
    specs: [
      { label: "Rated Voltage", value: "12 – 36 kV" },
      { label: "Rated Current", value: "630 – 1250 A" },
      { label: "Insulation", value: "SF6 / Air Insulated" },
      { label: "Configuration", value: "2 to 6 ways" },
      { label: "Standard", value: "IEC 62271-200" },
    ],
    features: [
      "Fully sealed, corrosion resistant enclosure",
      "Modular design for flexible feeder configurations",
      "Integrated protection relay options",
      "Ideal for urban and underground networks",
    ],
  },
  {
    slug: "transformer",
    name: "Power & Distribution Transformer",
    shortName: "Transformer",
    category: "Power Equipment",
    tagline: "Efficient power conversion, supplied and installed",
    description:
      "We supply power and distribution transformers for utility, industrial, and commercial applications, and handle installation and commissioning through our licensed contracting team.",
    image: "/products/transformer.png",
    specs: [
      { label: "Rating", value: "25 kVA – 100 MVA" },
      { label: "Voltage Class", value: "Up to 220 kV" },
      { label: "Cooling", value: "ONAN / ONAF / OFAF" },
      { label: "Vector Group", value: "Dyn11 / Custom" },
      { label: "Standard", value: "IEC 60076" },
    ],
    features: [
      "Ratings matched to your load requirement",
      "Hermetically sealed / conservator type options",
      "Supplied with installation and commissioning support",
      "After-sales service and maintenance available",
    ],
  },
  {
    slug: "compact-substation",
    name: "Compact Substation",
    shortName: "Compact Substation",
    category: "Power Equipment",
    tagline: "Packaged substation solutions, ready to install",
    description:
      "Compact, factory-assembled substation packages combining transformer, switchgear, and protection in a single enclosure, supplied and installed for industrial, commercial, and infrastructure projects where space is limited.",
    image: "/products/compact-substation.png",
    specs: [
      { label: "Rated Voltage", value: "11 – 33 kV" },
      { label: "Transformer Rating", value: "100 kVA – 2500 kVA" },
      { label: "Enclosure", value: "Weatherproof, IP54 / IP55" },
      { label: "Configuration", value: "RMU + Transformer + LT Panel" },
      { label: "Standard", value: "IEC 62271-202" },
    ],
    features: [
      "Reduced installation footprint and time",
      "Pre-wired and factory tested before dispatch",
      "Suitable for indoor and outdoor placement",
      "Ideal for commercial buildings and industrial parks",
    ],
  },
  {
    slug: "stabiliser",
    name: "Automatic Voltage Stabiliser",
    shortName: "Stabiliser",
    category: "Power Quality",
    tagline: "Consistent voltage, uninterrupted operation",
    description:
      "Automatic voltage stabilisers supplied and installed to protect sensitive equipment from voltage fluctuations, delivering precise regulation for industrial, commercial, and critical infrastructure loads.",
    image: "/products/stabiliser.png",
    specs: [
      { label: "Capacity", value: "1 kVA – 5000 kVA" },
      { label: "Input Range", value: "±20% to ±40%" },
      { label: "Output Accuracy", value: "± 1%" },
      { label: "Type", value: "Servo / Static" },
      { label: "Standard", value: "IS 9815" },
    ],
    features: [
      "Fast correction response time",
      "Overload and short circuit protection",
      "Three-phase balanced and unbalanced correction",
      "Digital display with remote monitoring option",
    ],
  },
  {
    slug: "ups",
    name: "Uninterruptible Power Supply",
    shortName: "UPS",
    category: "Power Quality",
    tagline: "Zero-downtime backup power",
    description:
      "UPS systems supplied and installed to provide seamless backup power for mission-critical operations, from commercial buildings to industrial control systems, ensuring continuity during grid disturbances.",
    image: "/products/ups.png",
    specs: [
      { label: "Capacity", value: "1 kVA – 800 kVA" },
      { label: "Topology", value: "Online Double Conversion" },
      { label: "Backup Time", value: "Scalable battery banks" },
      { label: "Efficiency", value: "Up to 97%" },
      { label: "Standard", value: "IEC 62040" },
    ],
    features: [
      "Zero transfer time to battery backup",
      "Parallel redundancy for scalable capacity",
      "Advanced battery management system",
      "Remote monitoring and SNMP connectivity",
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
