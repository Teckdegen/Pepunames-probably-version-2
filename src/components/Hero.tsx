
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useScrollAppear from "@/hooks/useScrollAppear";
import { Rocket } from "lucide-react";

export function Hero() {
  const appearRef = useScrollAppear();

  return (
    <div className="relative overflow-hidden min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#f5f3ff] via-[#e9d5ff] to-[#f5f3ff]">
      {/* Background Effects - More subtle gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f3ff]/80 via-[#e9d5ff]/90 to-[#f5f3ff]/80" />
      <div className="absolute top-20 -right-20 w-72 h-72 bg-[#c4b5fd] opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -left-20 w-72 h-72 bg-[#a78bfa] opacity-20 rounded-full blur-3xl animate-pulse" />
      
      <div
        ref={appearRef}
        className="relative container mx-auto px-6 flex flex-col items-center text-center opacity-0 transition-all duration-1000 translate-y-10 space-y-8"
        data-scroll-appear
      >
        {/* Title Section - Reduced size */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#6d28d9] via-[#7c3aed] to-[#8b5cf6] bg-clip-text text-transparent animate-fade-in">
            PEPU NAME SERVICE
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Secure your digital identity on the PEPU network with a <span className="font-bold text-[#7c3aed]">.pepu</span> domain name
          </p>
        </div>
        
        {/* Domain Search Box - More compact */}
        <div className="w-full max-w-xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-xl border border-[#e9d5ff] shadow-lg space-y-4">
            {/* Domain Input Display */}
            <div className="font-mono text-xl text-[#6d28d9] relative bg-[#f5f3ff] p-3 rounded-lg">
              <span className="text-[#7c3aed] mr-2">$</span>
              yourname.pepu
              <span className="animate-pulse ml-1">|</span>
            </div>
            
            {/* Special Offer Box */}
            <div className="bg-gradient-to-r from-[#f5f3ff] to-[#e9d5ff] p-4 rounded-lg border border-[#e9d5ff]">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Rocket className="text-[#7c3aed] h-5 w-5 animate-bounce" />
                <h3 className="text-lg font-semibold text-[#6d28d9]">
                  Launch Special: First 1,000 domains
                </h3>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-gray-600">for only</span>
                <span className="text-[#7c3aed] font-bold text-xl">5,000 PEPU</span>
                <span className="text-gray-600">tokens</span>
              </div>
              <div className="mt-2 text-sm text-gray-500 flex items-center justify-center gap-2">
                <span>50% off first year</span>
                <span>•</span>
                <span>Limited time offer</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] hover:from-[#6d28d9] hover:to-[#5b21b6] text-white shadow-md hover:shadow-lg transition-all duration-300 text-base min-w-[180px]"
          >
            <Link to="/search">Search Domains</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-[#7c3aed] text-[#7c3aed] hover:bg-[#7c3aed]/10 text-base min-w-[180px]"
          >
            <a href="#features">Learn More</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
