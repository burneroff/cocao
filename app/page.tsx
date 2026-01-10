import Footer from "./components/Footer";
import Hero from "./components/Hero";
import NavigationSection from "./components/NavigationSection";
import { FloatingNav } from "./components/ui/floating-navbar";

export default function Home() {
  return (
    <>
      <FloatingNav />
      <Hero />
      <NavigationSection />
      <Footer />
    </>
  );
}
