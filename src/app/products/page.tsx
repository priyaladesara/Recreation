import type { Metadata } from "next";
import CtaBanner from "@/components/home/CtaBanner";
import PageHeader from "@/components/layout/PageHeader";
import ProductExplorer from "@/components/products/ProductExplorer";

export const metadata: Metadata = {
  title: "Products | Recreation",
  description:
    "Explore the range of RMU, VCB, Transformer, Compact Substation, Voltage Stabiliser, and UPS equipment supplied and installed by Recreation.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product range"
        title={
          <>
            Equipment built for <span className="text-gradient">every voltage level</span>
          </>
        }
        intro="From high voltage switchgear to power quality systems — supplied, installed, and supported by a licensed electrical contracting team."
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ProductExplorer />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
