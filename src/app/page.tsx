import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Credentials from "@/components/home/Credentials";
import ProductHighlights from "@/components/home/ProductHighlights";
import WhyUs from "@/components/home/WhyUs";
import Process from "@/components/home/Process";
import CtaBanner from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Credentials />
      <ProductHighlights />
      <WhyUs />
      <Process />
      <CtaBanner />
    </>
  );
}
