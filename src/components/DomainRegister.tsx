import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader, CheckCheck, AlertTriangle, Send } from "lucide-react";
import { useAccount, useBalance, useSwitchChain, useChainId } from "wagmi";
import { formatEther, parseEther } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { pepeUnchained, appConfig } from "@/config/chain";
import { completeDomainRegistration } from "@/lib/domains";
import { useToast } from "@/hooks/use-toast";

interface DomainRegisterProps {
  selectedDomain: string;
  onSuccess: (txHash: string) => void;
  onReset: () => void;
}

export function DomainRegister({ selectedDomain, onSuccess, onReset }: DomainRegisterProps) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitchingChain } = useSwitchChain();
  const { toast } = useToast();
  
  const [registrationStatus, setRegistrationStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const { data: balance } = useBalance({
    address,
  });
  
  const hasEnoughBalance = balance && 
    parseFloat(balance.formatted) >= parseFloat(formatEther(BigInt(appConfig.registrationFee)));
  
  const isCorrectNetwork = chainId === pepeUnchained.id;

  const handleSwitchNetwork = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: "0x4F1A",
            chainName: "PEPU Mainnet",
            nativeCurrency: {
              name: "PEPU",
              symbol: "PEPU",
              decimals: 18
            },
            rpcUrls: ["https://explorer-pepe-unchained-gupg0lo9wf.t.conduit.xyz"],
            blockExplorerUrls: ["https://explorer-pepe-unchained-gupg0lo9wf.t.conduit.xyz/"],
          }]
        });
      } else if (switchChain) {
        switchChain({ chainId: pepeUnchained.id });
      }
    } catch (error: any) {
      console.error("Failed to add/switch to PEPU network:", error);
      toast({
        variant: "destructive",
        title: "Network Error",
        description: error?.message || "Unable to switch or add PEPU Mainnet in your wallet.",
      });
    }
  };

  const handleRegister = async () => {
    if (!address || !isConnected) return;
    
    setRegistrationStatus("processing");
    setErrorMessage("");
    
    try {
      const mockTxHash = `0x${Array.from({ length: 64 }, () => 
        Math.floor(Math.random() * 16).toString(16)).join('')}`;
        
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await completeDomainRegistration(
        selectedDomain.replace('.pepu', ''),
        address,
        mockTxHash,
        null
      );
      
      setRegistrationStatus("success");
      onSuccess(mockTxHash);
      
      toast({
        title: "Domain Registered!",
        description: `You are now the owner of ${selectedDomain}`,
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      setRegistrationStatus("error");
      setErrorMessage(error.message || "Failed to register domain");
      
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Something went wrong during registration",
      });
    }
  };

  return (
    <Card className="w-full border border-terminal-purple/30 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <span className="text-terminal-purple">Register</span> {selectedDomain}
        </CardTitle>
        <CardDescription>
          Secure your .pepu domain for 5,000 PEPU tokens
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <div className="bg-secondary/50 p-4 rounded-lg text-center">
            <p className="mb-3">Connect your wallet to register this domain</p>
            <ConnectButton />
          </div>
        ) : (
          <>
            {!isCorrectNetwork && (
              <Alert className="bg-amber-100 dark:bg-amber-900 border-amber-200 dark:border-amber-800">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertDescription className="flex items-center justify-between">
                  <span>You need to switch to PEPU Mainnet (Chain ID: 20314)</span>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleSwitchNetwork}
                    disabled={isSwitchingChain}
                    className="ml-2 text-xs h-7 px-2"
                  >
                    {isSwitchingChain ? (
                      <>
                        <Loader className="mr-1 h-3 w-3 animate-spin" />
                        Switching...
                      </>
                    ) : (
                      "Add & Switch"
                    )}
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          
            {!hasEnoughBalance && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Insufficient PEPU balance. You need at least 5,000 PEPU.
                </AlertDescription>
              </Alert>
            )}
          
            <div className="bg-terminal-dark-purple text-white p-4 rounded-md font-mono">
              <div className="flex justify-between mb-2">
                <span>Domain:</span>
                <span>{selectedDomain}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Price:</span>
                <span>5,000 PEPU</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Duration:</span>
                <span>1 year</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/20">
                <span>Your wallet:</span>
                <span className="truncate max-w-[180px]">{address}</span>
              </div>
            </div>
            
            {registrationStatus === "error" && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onReset}
          disabled={registrationStatus === "processing"}
        >
          Cancel
        </Button>
        <Button 
          className="bg-terminal-purple hover:bg-terminal-deep-purple text-white"
          disabled={
            !isConnected || 
            !isCorrectNetwork || 
            !hasEnoughBalance || 
            registrationStatus === "processing" || 
            registrationStatus === "success"
          }
          onClick={handleRegister}
        >
          {registrationStatus === "idle" && (
            <>
              <Send className="mr-2 h-4 w-4" />
              Register Domain
            </>
          )}
          {registrationStatus === "processing" && (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          )}
          {registrationStatus === "success" && (
            <>
              <CheckCheck className="mr-2 h-4 w-4" />
              Registered!
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
