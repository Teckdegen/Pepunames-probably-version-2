
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader, CheckCheck, AlertTriangle, Send } from "lucide-react";
import { useAccount, useChainId, useWaitForTransactionReceipt, useSwitchChain } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { pepuChain, appConfig, usdcConfig } from "@/config/chain";
import { completeDomainRegistration } from "@/lib/domains";
import { useToast } from "@/hooks/use-toast";
import { usdcAbi } from "@/contracts/usdc";
import { ethers } from "ethers";

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
    "idle" | "sending" | "processing" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [usdcBalance, setUsdcBalance] = useState<string>("0");
  
  const { isLoading: isWaitingTx, isSuccess: txConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });
  
  const registrationFeeInUSDC = parseUnits(appConfig.registrationFee, usdcConfig.decimals);
  const hasEnoughBalance = parseUnits(usdcBalance, usdcConfig.decimals) >= registrationFeeInUSDC;
  
  const isCorrectNetwork = chainId === pepuChain.id;

  // Check USDC balance
  const checkUSDCBalance = useCallback(async () => {
    if (!address || !window.ethereum) return;
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const usdcContract = new ethers.Contract(usdcConfig.address, usdcAbi, provider);
      const balance = await usdcContract.balanceOf(address);
      const formattedBalance = formatUnits(balance, usdcConfig.decimals);
      setUsdcBalance(formattedBalance);
    } catch (error) {
      console.error("Failed to check USDC balance:", error);
      setUsdcBalance("0");
    }
  }, [address]);

  // Check balance when address or network changes
  if (address && isCorrectNetwork) {
    checkUSDCBalance();
  }

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
    } catch (error: any) {
      console.error("Failed to add/switch to Pepe Unchained V2 network:", error);
      toast({
        variant: "destructive",
        title: "Network Error",
        description: error?.message || "Unable to switch or add Pepe Unchained V2 in your wallet.",
      });
    }
  };

  const handleRegister = async () => {
    if (!address || !isConnected || !isCorrectNetwork || !hasEnoughBalance) return;
    
    try {
      setRegistrationStatus("sending");
      setErrorMessage("");
      
      // Get the ethereum provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Create USDC contract instance
      const usdcContract = new ethers.Contract(usdcConfig.address, usdcAbi, signer);
      
      // Send USDC transfer transaction
      const tx = await usdcContract.transfer(
        appConfig.treasuryWallet,
        registrationFeeInUSDC
      );
      
      setTxHash(tx.hash);
      setRegistrationStatus("processing");
      
      toast({
        title: "Transaction Sent",
        description: "Your USDC payment is being processed...",
      });
      
      // Wait for transaction confirmation
      await tx.wait();
      
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
  
  const processRegistration = async () => {
    if (!txHash || !address) return;
    
    try {
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
          Secure your .pepu domain for {appConfig.registrationFee} USDC
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
                  <span>Switch to Pepe Unchained V2</span>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={handleSwitchNetwork}
                    className="ml-2 text-xs h-7 px-2 border-amber-500/50 text-amber-300 hover:bg-amber-500/20"
                  >
                    Switch Network
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          
            {!hasEnoughBalance && (
              <Alert variant="destructive" className="bg-red-900/30 border-red-500/30 backdrop-blur-md">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-red-200">
                  Insufficient USDC balance. You need at least {appConfig.registrationFee} USDC.
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
                  <span className="font-mono text-cyber-pink">{appConfig.registrationFee} USDC</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Network:</span>
                  <span className="font-mono text-cyber-yellow">Pepe Unchained V2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Your USDC Balance:</span>
                  <span className="font-mono text-cyber-blue">{parseFloat(usdcBalance).toFixed(2)} USDC</span>
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
