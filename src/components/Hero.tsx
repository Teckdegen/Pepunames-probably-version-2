
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import useScrollAppear from "@/hooks/useScrollAppear";

export function Hero() {
  const appearRef = useScrollAppear();

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-radial from-terminal-purple/20 to-transparent opacity-70 pointer-events-none" />
      <div
        ref={appearRef}
        className="relative container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center opacity-0 transition-all duration-700 translate-y-10 will-change-transform"
        data-scroll-appear
      >
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          <span className="text-terminal-purple">PNS</span>{" "}
          <span className="text-terminal-deep-purple">PEPU NAME SERVICE</span>
        </h1>
        <p className="text-xl md:text-2xl mb-4 max-w-3xl text-muted-foreground">
          Secure your digital identity on the PEPU network with a <b>.pepu</b> domain name
        </p>
        <div className="mb-6 w-full max-w-lg glass-card p-4 rounded-lg border-terminal-purple border flex flex-col items-center gap-2">
          <div className="font-mono">
              <span className="terminal-prompt">$</span>
              yourname.pepu
              <span className="terminal-cursor"></span>
          </div>
          <div className="bg-terminal-purple/10 w-fit px-4 py-2 rounded text-terminal-deep-purple font-semibold text-base flex flex-col items-center animate-pulse shadow ring-1 ring-terminal-purple ring-opacity-15">
            <span>
              🚀 <b>Launch Promo:</b> First 1,000 domains for only <span className="text-terminal-purple">5,000 PEPU</span> tokens (50% off)!<br />
              <span className="text-xs text-muted-foreground">One year registration • Discount ends after 1,000 names!</span>
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <Button
            asChild
            size="lg"
            className="bg-terminal-purple hover:bg-terminal-deep-purple text-white text-lg"
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
