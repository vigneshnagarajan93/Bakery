import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { SlideOverCart } from "../components/cart/SlideOverCart";
import { Hero } from "../components/sections/Hero";
import { WeeklyDrops } from "../components/sections/WeeklyDrops";
import { ProductShowcase } from "../components/sections/ProductShowcase";
import { OurStory } from "../components/sections/OurStory";

export default function Home() {
  return (
    <>
      <Header />
      <SlideOverCart />

      <main>
        <Hero />
        <WeeklyDrops />
        <ProductShowcase />
        <OurStory />
      </main>

      <Footer />
    </>
  );
}
