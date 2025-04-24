
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useScrollAppear from "@/hooks/useScrollAppear";

export function Hero() {
  const appearRef = useScrollAppear();

  return (
    <div className="relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 bg-neon-glow opacity-50" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyber-purple opacity-30 rounded-full blur-3xl animate-glow-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyber-neon opacity-30 rounded-full blur-3xl animate-glow-pulse" />
      
      <div
        ref={appearRef}
        className="relative container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center opacity-0 transition-all duration-700 translate-y-10"
        data-scroll-appear
      >
        <div className="bg-gradient-to-r from-cyber-purple via-cyber-pink to-cyber-neon bg-clip-text">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-transparent animate-glow-pulse">
            PEPU NAME SERVICE
          </h1>
        </div>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl text-gray-300">
          Secure your digital identity on the PEPU network with a <b>.pepu</b> domain name
        </p>
        
        <div className="mb-8 w-full max-w-lg bg-black/40 backdrop-blur-xl p-8 rounded-lg border border-cyber-purple/30 shadow-cyber">
          <div className="font-mono text-2xl text-cyber-neon mb-4 relative">
            <span className="terminal-prompt text-cyber-pink">$</span>
            yourname.pepu
            <span className="animate-pulse">_</span>
          </div>
          
          <div className="bg-cyber-purple/10 backdrop-blur-md px-6 py-4 rounded-lg text-cyber-neon font-semibold flex flex-col items-center shadow-neon animate-float">
            <span className="flex items-center gap-2">
              🚀 <b>Launch Special:</b> First 1,000 domains for only <span className="text-cyber-pink font-bold">5,000 PEPU</span>
            </span>
            <span className="text-sm text-gray-400 mt-2">50% off for first year • Limited time offer • Early adopter benefit</span>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-cyber-purple to-cyber-neon text-white shadow-neon hover:shadow-cyber transition-all duration-300 text-lg"
          >
            <Link to="/search">Search Domains</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-cyber-purple text-cyber-neon hover:bg-cyber-purple/10 text-lg"
          >
            <a href="#features">Learn More</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
