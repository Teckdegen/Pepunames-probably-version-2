import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Wallet } from "lucide-react";
import { useState } from "react";
import { useAccount, useDisconnect, useSwitchChain } from 'wagmi';
import { pepeUnchained } from "@/config/chain";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { toast } = useToast();
  
  const handleSwitchNetwork = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: "0xD51",
            chainName: "PEPU Mainnet",
            nativeCurrency: {
              name: "PEPU",
              symbol: "PEPU",
              decimals: 18
            },
            rpcUrls: ["https://3409.rpc.thirdweb.com"],
            blockExplorerUrls: ["https://explorer-pepe-unchained-gupg0lo9wf.t.conduit.xyz/"],
          }]
        });
      } else if (switchChain) {
        await switchChain({ chainId: pepeUnchained.id });
      }
    } catch (error: any) {
      console.error("Failed to switch network:", error);
      toast({
        variant: "destructive",
        title: "Network Error",
        description: error?.message || "Unable to switch to PEPU Mainnet",
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected successfully",
    });
  };
  
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
            
            <div className="flex items-center gap-4">
              {isConnected && (
                <>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleSwitchNetwork}
                    className="bg-terminal-purple text-white hover:bg-terminal-deep-purple"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Switch to PEPU
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleDisconnect}
                    className="text-terminal-purple border-terminal-purple hover:bg-terminal-purple/10"
                  >
                    Disconnect
                  </Button>
                </>
              )}
              <ConnectButton 
                showBalance={false}
                chainStatus="icon"
              />
            </div>
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
            
            <div className="px-4 space-y-2">
              {isConnected && (
                <>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleSwitchNetwork}
                    className="w-full bg-terminal-purple text-white hover:bg-terminal-deep-purple"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Switch to PEPU
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleDisconnect}
                    className="w-full text-terminal-purple border-terminal-purple hover:bg-terminal-purple/10"
                  >
                    Disconnect
                  </Button>
                </>
              )}
              <div className="pt-2">
                <ConnectButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
