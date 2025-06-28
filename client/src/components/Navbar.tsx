
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Wallet, Check, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useAccount, useDisconnect, useSwitchChain, useChainId } from 'wagmi';
import { pepuChain } from "@/config/chain";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const chainId = useChainId();
  const { toast } = useToast();
  
  // Check if user is on Pepu network
  const isOnPepuNetwork = chainId === pepuChain.id;
  
  const handleSwitchNetwork = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: `0x${pepuChain.id.toString(16)}`,
            chainName: pepuChain.name,
            nativeCurrency: pepuChain.nativeCurrency,
            rpcUrls: [pepuChain.rpcUrls.default.http[0]],
            blockExplorerUrls: [pepuChain.blockExplorers.default.url],
          }]
        });
      } else if (switchChain) {
        await switchChain({ chainId: pepuChain.id });
      }
      
      toast({
        title: "Network Changed",
        description: "Successfully connected to Pepe Unchained V2",
      });
    } catch (error: any) {
      console.error("Failed to switch network:", error);
      toast({
        variant: "destructive",
        title: "Network Error",
        description: error?.message || "Unable to switch to     Pepe Unchained V2",
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
    <nav className="border-b border-terminal-purple/20 bg-gradient-to-r from-white/95 to-terminal-light-purple/5 backdrop-blur-lg sticky top-0 z-50 shadow-sm dark:bg-gray-900/95 dark:from-gray-900/95 dark:to-terminal-purple/10 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="bg-gradient-to-r from-terminal-purple to-terminal-deep-purple text-white font-bold text-xl px-3 py-1 rounded-lg shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 mr-2">P</div>
              <span className="text-xl font-bold bg-gradient-to-r from-terminal-purple to-terminal-deep-purple bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">PepuNS</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-terminal-purple dark:text-gray-300 dark:hover:text-terminal-light-purple relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-terminal-purple group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/search" className="text-gray-700 hover:text-terminal-purple dark:text-gray-300 dark:hover:text-terminal-light-purple relative group">
                Search
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-terminal-purple group-hover:w-full transition-all duration-300"></span>
              </Link>
              <a href="#features" className="text-gray-700 hover:text-terminal-purple dark:text-gray-300 dark:hover:text-terminal-light-purple relative group">
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-terminal-purple group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
            
            <div className="flex items-center gap-4">
              {isConnected && (
                <>
                  {!isOnPepuNetwork ? (
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={handleSwitchNetwork}
                      className="bg-amber-500 text-white hover:bg-amber-600 border-amber-400 shadow-md transition-all duration-300"
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      Switch to Pepu V2
                    </Button>
                  ) : (
                    <Button 
                      variant="outline"
                      size="sm"
                      className="bg-green-500 text-white border-green-400 shadow-md cursor-default"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      On Pepu Network
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleDisconnect}
                    className="text-terminal-purple border-terminal-purple hover:bg-terminal-purple/10 shadow-md transition-all duration-300"
                  >
                    Disconnect
                  </Button>
                </>
              )}
              <div className="shadow-md rounded-md overflow-hidden">
                <ConnectButton 
                  showBalance={false}
                  chainStatus="icon"
                />
              </div>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:bg-terminal-purple/10"
            >
              <Menu />
            </Button>
          </div>
        </div>
        
        {/* Mobile menu with improved animation */}
        <div className={`md:hidden border-t border-gray-200 dark:border-gray-800 py-4 space-y-4 ${isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 invisible'} transition-all duration-300 overflow-hidden`}>
          <Link 
            to="/" 
            className="block px-4 py-2 text-gray-700 hover:bg-terminal-purple/10 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/search" 
            className="block px-4 py-2 text-gray-700 hover:bg-terminal-purple/10 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Search
          </Link>
          <a 
            href="#features" 
            className="block px-4 py-2 text-gray-700 hover:bg-terminal-purple/10 dark:text-gray-300 dark:hover:bg-gray-800 rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          
          <div className="px-4 space-y-2">
            {isConnected && (
              <>
                {!isOnPepuNetwork ? (
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleSwitchNetwork}
                    className="w-full bg-amber-500 text-white hover:bg-amber-600 border-amber-400 shadow-md transition-all duration-300"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Switch to Pepu V2
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    size="sm"
                    className="w-full bg-green-500 text-white border-green-400 shadow-md cursor-default"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    On Pepu Network
                  </Button>
                )}
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={handleDisconnect}
                  className="w-full text-terminal-purple border-terminal-purple hover:bg-terminal-purple/10 shadow-md transition-all duration-300"
                >
                  Disconnect
                </Button>
              </>
            )}
            <div className="pt-2 shadow-md rounded-md overflow-hidden">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
