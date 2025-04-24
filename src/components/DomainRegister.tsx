
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader, CheckCheck, AlertTriangle, Send } from "lucide-react";
import { useAccount, useBalance, useSwitchChain, useChainId, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
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
  
  // State for transaction flow
  const [registrationStatus, setRegistrationStatus] = useState<
    "idle" | "sending" | "processing" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [txHash, setTxHash] = useState("");
  
  // Get user balance
  const { data: balance } = useBalance({
    address,
  });
  
  // Transaction hooks
  const { sendTransaction, isPending: isSendingTx } = useSendTransaction();
  const { isLoading: isWaitingTx, isSuccess: txConfirmed } = useWaitForTransactionReceipt({
    hash: txHash ? `0x${txHash.replace(/^0x/, '')}` : undefined,
    enabled: !!txHash,
  });
  
  // Calculate if user has enough balance
  const registrationFeeInPepu = parseFloat(formatEther(BigInt(appConfig.registrationFee)));
  const hasEnoughBalance = balance && 
    parseFloat(balance.formatted) >= registrationFeeInPepu;
  
  const isCorrectNetwork = chainId === pepeUnchained.id;

  // Handle network switching
  const handleSwitchNetwork = async () => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: "0xD51",  // 3409 in hex
            chainName: "PEPU Mainnet",
            nativeCurrency: {
              name: "PEPU",
              symbol: "PEPU",
              decimals: 18
            },
            rpcUrls: [
              "https://rpc-pepe-unchained-gupg0lo9wf.t.conduit.xyz",
              "https://3409.rpc.thirdweb.com"
            ],
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

  // Handle domain registration
  const handleRegister = async () => {
    if (!address || !isConnected || !isCorrectNetwork || !hasEnoughBalance) return;
    
    try {
      setRegistrationStatus("sending");
      setErrorMessage("");
      
      // Send actual transaction to treasury wallet
      sendTransaction({
        to: appConfig.treasuryWallet,
        value: BigInt(appConfig.registrationFee),
      }, {
        onSuccess: (data) => {
          // Store transaction hash
          setTxHash(data.hash);
          setRegistrationStatus("processing");
          toast({
            title: "Transaction Sent",
            description: "Your payment is being processed...",
          });
        },
        onError: (error) => {
          console.error("Transaction error:", error);
          setRegistrationStatus("error");
          setErrorMessage(error.message || "Failed to send transaction");
          toast({
            variant: "destructive",
            title: "Transaction Failed",
            description: error.message || "Failed to send transaction",
          });
        }
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
  
  // Process domain registration after transaction confirms
  const processRegistration = async () => {
    if (!txHash || !address) return;
    
    try {
      // Complete domain registration process
      const provider = window.ethereum;
      await completeDomainRegistration(
        selectedDomain.replace('.pepu', ''),
        address,
        txHash,
        provider
      );
      
      setRegistrationStatus("success");
      onSuccess(txHash);
      
      toast({
        title: "Domain Registered!",
        description: `You are now the owner of ${selectedDomain}`,
      });
    } catch (error: any) {
      console.error("Registration processing error:", error);
      setRegistrationStatus("error");
      setErrorMessage(error.message || "Failed to process registration");
      
      toast({
        variant: "destructive",
        title: "Registration Processing Failed",
        description: error.message || "Your payment was successful, but there was an issue finalizing your registration.",
      });
    }
  };
  
  // Watch for transaction confirmation and process registration
  if (txConfirmed && registrationStatus === "processing") {
    processRegistration();
  }

  return (
    <Card className="bg-black/40 backdrop-blur-xl border-cyber-purple/30 shadow-cyber relative overflow-hidden">
      <div className="absolute inset-0 bg-neon-glow opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-glass-shine animate-shine pointer-events-none" />
      
      <CardHeader className="relative z-10">
        <CardTitle className="text-xl flex items-center gap-2">
          <span className="bg-gradient-to-r from-cyber-neon to-cyber-purple bg-clip-text text-transparent">
            Register
          </span> 
          <span className="font-mono">{selectedDomain}</span>
        </CardTitle>
        <CardDescription className="text-gray-300">
          Secure your .pepu domain for {registrationFeeInPepu} PEPU tokens
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 relative z-10">
        {!isConnected ? (
          <div className="bg-glass-dark backdrop-blur-md rounded-lg p-6 text-center border border-white/10">
            <p className="mb-4 text-gray-300">Connect your wallet to register this domain</p>
            <div className="inline-block animate-float">
              <ConnectButton />
            </div>
          </div>
        ) : (
          <>
            {!isCorrectNetwork && (
              <Alert className="bg-amber-900/30 border-amber-500/30 backdrop-blur-md">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <AlertDescription className="flex items-center justify-between text-amber-200">
                  <span>Switch to PEPU Mainnet (Chain ID: 3409)</span>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleSwitchNetwork}
                    disabled={isSwitchingChain}
                    className="ml-2 text-xs h-7 px-2 border-amber-500/50 text-amber-300 hover:bg-amber-500/20"
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
              <Alert variant="destructive" className="bg-red-900/30 border-red-500/30 backdrop-blur-md">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-200">
                  Insufficient PEPU balance. You need at least {registrationFeeInPepu} PEPU.
                </AlertDescription>
              </Alert>
            )}
          
            <div className="bg-terminal-dark-purple/80 backdrop-blur-md text-white p-6 rounded-lg border border-cyber-purple/20 shadow-neon">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Domain:</span>
                  <span className="font-mono text-cyber-neon">{selectedDomain}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Price:</span>
                  <span className="font-mono text-cyber-pink">{registrationFeeInPepu} PEPU</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Duration:</span>
                  <span className="font-mono text-cyber-yellow">1 year</span>
                </div>
                <div className="pt-3 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Your wallet:</span>
                    <span className="font-mono text-cyber-blue truncate max-w-[180px]">{address}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {registrationStatus === "error" && (
              <Alert variant="destructive" className="bg-red-900/30 border-red-500/30 backdrop-blur-md">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-200">{errorMessage}</AlertDescription>
              </Alert>
            )}
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between relative z-10">
        <Button 
          variant="outline"
          onClick={onReset}
          disabled={registrationStatus === "sending" || registrationStatus === "processing"}
          className="border-cyber-purple/30 text-gray-300 hover:bg-cyber-purple/10"
        >
          Cancel
        </Button>
        <Button 
          className="bg-gradient-to-r from-cyber-purple to-cyber-neon text-white shadow-neon hover:shadow-cyber transition-all duration-300"
          disabled={
            !isConnected || 
            !isCorrectNetwork || 
            !hasEnoughBalance || 
            registrationStatus === "sending" || 
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
          {registrationStatus === "sending" && (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Sending Transaction...
            </>
          )}
          {registrationStatus === "processing" && (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Confirming Payment...
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
