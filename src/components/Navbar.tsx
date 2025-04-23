
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="border-b border-terminal-purple/20 bg-white/80 backdrop-blur-md sticky top-0 z-50 dark:bg-gray-900/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-terminal-purple text-white font-bold text-xl px-3 py-1 rounded mr-2">P</div>
              <span className="text-xl font-bold">PepuNS</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-terminal-purple dark:text-gray-300 dark:hover:text-terminal-light-purple">
                Home
              </Link>
              <Link to="/search" className="text-gray-700 hover:text-terminal-purple dark:text-gray-300 dark:hover:text-terminal-light-purple">
                Search
              </Link>
              <a href="#features" className="text-gray-700 hover:text-terminal-purple dark:text-gray-300 dark:hover:text-terminal-light-purple">
                Features
              </a>
            </div>
            
            <ConnectButton 
              showBalance={false}
              chainStatus="icon"
            />
          </div>
          
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300"
            >
              <Menu />
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-4 space-y-4 animate-slide-up">
            <Link 
              to="/" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Search
            </Link>
            <a 
              href="#features" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            
            <div className="px-4 pt-2">
              <ConnectButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
