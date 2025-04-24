
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useScrollAppear from "@/hooks/useScrollAppear";
import { Rocket } from "lucide-react";

export function Hero() {
  const appearRef = useScrollAppear();

  return (
    <div className="relative overflow-hidden min-h-[90vh] flex items-center justify-center bg-gradient-radial from-cyber-purple/20 to-transparent">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-neon-glow opacity-30" />
      <div className="absolute top-20 -right-20 w-96 h-96 bg-cyber-purple opacity-20 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-cyber-neon opacity-20 rounded-full blur-3xl animate-float delay-1000" />
      
      <div
        ref={appearRef}
        className="relative container mx-auto px-6 flex flex-col items-center text-center opacity-0 transition-all duration-1000 translate-y-10 space-y-12"
        data-scroll-appear
      >
        {/* Title Section */}
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-cyber-purple via-cyber-pink to-cyber-neon bg-clip-text text-transparent animate-glow-pulse">
            PEPU NAME SERVICE
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Secure your digital identity on the PEPU network with a <span className="font-bold text-cyber-neon">.pepu</span> domain name
          </p>
        </div>
        
        {/* Domain Search Box */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="glass-card dark:neo-blur p-8 rounded-2xl border border-cyber-purple/30 shadow-cyber space-y-6">
            {/* Domain Input Display */}
            <div className="font-mono text-2xl text-cyber-neon relative bg-black/20 p-4 rounded-xl backdrop-blur-sm">
              <span className="text-cyber-pink mr-2">$</span>
              yourname.pepu
              <span className="animate-pulse ml-1">_</span>
            </div>
            
            {/* Special Offer Box */}
            <div className="bg-cyber-purple/10 backdrop-blur-xl p-6 rounded-xl border border-cyber-purple/20">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Rocket className="text-cyber-pink h-6 w-6 animate-float" />
                <h3 className="text-xl font-semibold text-white">
                  Launch Special: First 1,000 domains
                </h3>
              </div>
              <div className="flex items-center justify-center gap-2 text-lg">
                <span className="text-gray-300">for only</span>
                <span className="text-cyber-neon font-bold text-2xl">5,000 PEPU</span>
                <span className="text-gray-300">tokens</span>
              </div>
              <div className="mt-3 text-sm text-gray-400 flex items-center justify-center gap-2">
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
            className="bg-gradient-to-r from-cyber-purple to-cyber-neon hover:opacity-90 text-white shadow-neon hover:shadow-cyber transition-all duration-300 text-lg min-w-[200px]"
          >
            <Link to="/search">Search Domains</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-cyber-purple text-cyber-neon hover:bg-cyber-purple/10 text-lg min-w-[200px]"
          >
            <a href="#features">Learn More</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
