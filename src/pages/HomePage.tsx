
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
