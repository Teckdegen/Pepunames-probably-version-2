
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useScrollAppear from "@/hooks/useScrollAppear";
import { Rocket } from "lucide-react";

export function Hero() {
  const appearRef = useScrollAppear();

  return (
    <div className="relative overflow-hidden min-h-[90vh] flex items-center justify-center bg-[#f5f3ff]">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f3ff] via-[#e9d5ff] to-[#f5f3ff] opacity-80" />
      <div className="absolute top-20 -right-20 w-96 h-96 bg-[#c4b5fd] opacity-20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-[#a78bfa] opacity-20 rounded-full blur-3xl" />
      
      <div
        ref={appearRef}
        className="relative container mx-auto px-6 flex flex-col items-center text-center opacity-0 transition-all duration-1000 translate-y-10 space-y-12"
        data-scroll-appear
      >
        {/* Title Section */}
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[#6d28d9] animate-fade-in">
            PEPU NAME SERVICE
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Secure your digital identity on the PEPU network with a <span className="font-bold text-[#7c3aed]">.pepu</span> domain name
          </p>
        </div>
        
        {/* Domain Search Box */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-[#e9d5ff] shadow-lg space-y-6">
            {/* Domain Input Display */}
            <div className="font-mono text-2xl text-[#6d28d9] relative bg-[#f5f3ff] p-4 rounded-xl">
              <span className="text-[#7c3aed] mr-2">$</span>
              yourname.pepu
              <span className="animate-pulse ml-1">|</span>
            </div>
            
            {/* Special Offer Box */}
            <div className="bg-[#f5f3ff] p-6 rounded-xl border border-[#e9d5ff]">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Rocket className="text-[#7c3aed] h-6 w-6 animate-bounce" />
                <h3 className="text-xl font-semibold text-[#6d28d9]">
                  Launch Special: First 1,000 domains
                </h3>
              </div>
              <div className="flex items-center justify-center gap-2 text-lg">
                <span className="text-gray-600">for only</span>
                <span className="text-[#7c3aed] font-bold text-2xl">5,000 PEPU</span>
                <span className="text-gray-600">tokens</span>
              </div>
              <div className="mt-3 text-sm text-gray-500 flex items-center justify-center gap-2">
                <span>50% off first year</span>
                <span>•</span>
                <span>Limited time offer</span>
                <span>•</span>
                <span>Early adopter benefit</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <Button
            asChild
            size="lg"
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white shadow-md hover:shadow-lg transition-all duration-300 text-lg min-w-[200px]"
          >
            <Link to="/search">Search Domains</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/10 text-lg min-w-[200px]"
          >
            <a href="#features">Learn More</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
