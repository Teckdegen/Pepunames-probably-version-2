
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useScrollAppear from "@/hooks/useScrollAppear";

export function Hero() {
  const appearRef = useScrollAppear();

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-terminal-purple/20 to-transparent opacity-70 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-terminal-purple opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-terminal-deep-purple opacity-30 rounded-full blur-3xl animate-pulse" />
      
      <div
        ref={appearRef}
        className="relative container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center opacity-0 transition-all duration-700 translate-y-10 will-change-transform"
        data-scroll-appear
      >
        <div className="bg-gradient-to-r from-terminal-purple to-terminal-deep-purple bg-clip-text">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-transparent">
            PEPU NAME SERVICE
          </h1>
        </div>
        <p className="text-xl md:text-2xl mb-4 max-w-3xl text-muted-foreground">
          Secure your digital identity on the PEPU network with a <b>.pepu</b> domain name
        </p>
        <div className="mb-6 w-full max-w-lg glass-card p-6 rounded-lg border-terminal-purple border flex flex-col items-center gap-3">
          <div className="font-mono text-lg">
              <span className="terminal-prompt">$</span>
              yourname.pepu
              <span className="terminal-cursor"></span>
          </div>
          <div className="bg-terminal-purple/10 w-fit px-6 py-3 rounded-lg text-terminal-deep-purple font-semibold text-base flex flex-col items-center animate-pulse shadow-glow-sm">
            <span className="flex items-center gap-2">
              🚀 <b>Launch Special:</b> First 1,000 domains for only <span className="text-terminal-purple font-bold">5,000 PEPU</span> tokens
            </span>
            <span className="text-sm text-muted-foreground mt-1">50% off first year • Limited time offer • Early adopter benefit</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <Button
            asChild
            size="lg"
            className="bg-terminal-purple hover:bg-terminal-deep-purple text-white text-lg shadow-glow-sm hover:shadow-glow-md transition-all duration-300"
          >
            <Link to="/search">Search Domains</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-terminal-purple text-terminal-purple hover:bg-terminal-purple/10 text-lg"
          >
            <a href="#features">Learn More</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
