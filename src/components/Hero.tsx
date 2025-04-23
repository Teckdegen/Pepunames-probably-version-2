
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-radial from-terminal-purple/20 to-transparent opacity-70 pointer-events-none" />
      <div className="relative container mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          <span className="text-terminal-purple">PNS</span>{" "}
          <span className="text-terminal-deep-purple">PEPU NAME SERVICE</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl text-muted-foreground">
          Secure your digital identity on the PEPU network with a .pepu domain name
        </p>
        <div className="mb-12 font-mono p-4 bg-terminal-dark-purple text-terminal-light-purple rounded-md inline-flex items-center">
          <span className="terminal-prompt">$</span> yourname.pepu
          <span className="terminal-cursor"></span>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
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
