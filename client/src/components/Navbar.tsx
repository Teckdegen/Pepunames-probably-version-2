import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Globe, Wallet, Check, X, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useAccount, useChainId } from 'wagmi';
import { pepuChain } from "@/config/chain";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { toast } = useToast();
  
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
        description: error?.message || "Failed to switch network",
      });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Globe className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
              <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-lg group-hover:bg-purple-300/30 transition-colors" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                PepuNS
              </div>
              <div className="text-xs text-gray-400 -mt-1">
                Name Service
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link 
                to="/search" 
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Search Domains
              </Link>
              <a 
                href="#features" 
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Features
              </a>
              <a 
                href="https://pepuscan.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-1"
              >
                Explorer
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Network Status & Wallet */}
            <div className="flex items-center gap-3">
              {isConnected && (
                <>
                  {!isOnPepuNetwork ? (
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={handleSwitchNetwork}
                      className="bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs"
                    >
                      <Wallet className="mr-2 h-3 w-3" />
                      Switch to Pepu V2
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
                      <Check className="h-3 w-3 text-green-400" />
                      <span className="text-green-300 text-xs font-medium">Pepu Network</span>
                    </div>
                  )}
                </>
              )}
              
              <div className="[&>div]:!bg-white/5 [&>div]:!backdrop-blur-xl [&>div]:!border-white/10">
                <ConnectButton />
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 py-4 space-y-4">
            <div className="space-y-3">
              <Link 
                to="/search"
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Search Domains
              </Link>
              <a 
                href="#features"
                className="block text-gray-300 hover:text-white transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="https://pepuscan.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-300 hover:text-white transition-colors py-2 flex items-center gap-2"
              >
                Explorer
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              {isConnected && (
                <>
                  {!isOnPepuNetwork ? (
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={handleSwitchNetwork}
                      className="w-full bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      Switch to Pepu V2
                    </Button>
                  ) : (
                    <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-green-300 font-medium">Connected to Pepu Network</span>
                    </div>
                  )}
                </>
              )}
              
              <div className="[&>div]:!bg-white/5 [&>div]:!backdrop-blur-xl [&>div]:!border-white/10 flex justify-center">
                <ConnectButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}