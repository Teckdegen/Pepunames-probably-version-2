import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader, CheckCheck, AlertTriangle, Send, Shield, Zap, Globe } from "lucide-react";
import { useAccount, useChainId, useWaitForTransactionReceipt } from "wagmi";
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
  useEffect(() => {
    if (address && isCorrectNetwork) {
      checkUSDCBalance();
    }
  }, [address, isCorrectNetwork, checkUSDCBalance]);

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
      // Only proceed to database operations after transaction is confirmed
      const provider = new ethers.BrowserProvider(window.ethereum);
      const receipt = await provider.getTransactionReceipt(txHash);
      
      // Verify transaction was successful
      if (receipt && receipt.status === 1) {
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
      } else {
        throw new Error("Transaction failed or reverted");
      }
    } catch (error: any) {
      console.error("Registration processing error:", error);
      setRegistrationStatus("error");
      setErrorMessage(error.message || "Failed to process registration");
      
      toast({
        variant: "destructive",
        title: "Registration Processing Failed",
        description: "Transaction failed. Domain was not registered.",
      });
    }
  };
  
  // Process registration only when transaction is confirmed
  useEffect(() => {
    if (txConfirmed && registrationStatus === "processing") {
      processRegistration();
    }
  }, [txConfirmed, registrationStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      
      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-white mb-2">
                Register Your Domain
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Secure <span className="text-purple-300 font-mono">{selectedDomain}</span> for {appConfig.registrationFee} USDC
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {!isConnected ? (
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10">
                  <Shield className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Connect Your Wallet</h3>
                  <p className="text-gray-300 mb-6">Connect your wallet to register this domain securely</p>
                  <div className="[&>div]:!bg-white/10 [&>div]:!backdrop-blur-xl [&>div]:!border-white/20">
                    <ConnectButton />
                  </div>
                </div>
              ) : (
                <>
                  {!isCorrectNetwork && (
                    <Alert className="bg-amber-500/10 border-amber-500/30 text-amber-300">
                      <AlertTriangle className="h-5 w-5" />
                      <AlertDescription className="flex items-center justify-between">
                        <span>Switch to Pepe Unchained V2 network</span>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={handleSwitchNetwork}
                          className="ml-4 border-amber-500/50 text-amber-300 hover:bg-amber-500/20"
                        >
                          Switch Network
                        </Button>
                      </AlertDescription>
                    </Alert>
                  )}
                
                  {!hasEnoughBalance && (
                    <Alert className="bg-red-500/10 border-red-500/30 text-red-300">
                      <AlertTriangle className="h-5 w-5" />
                      <AlertDescription>
                        Insufficient USDC balance. You need at least {appConfig.registrationFee} USDC.
                        <br />
                        Your current balance: {parseFloat(usdcBalance).toFixed(2)} USDC
                      </AlertDescription>
                    </Alert>
                  )}
                
                  {/* Domain Details */}
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Registration Details</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Domain:</span>
                        <span className="font-mono text-purple-300">{selectedDomain}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Price:</span>
                        <span className="font-semibold text-white">{appConfig.registrationFee} USDC</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Network:</span>
                        <span className="text-blue-300">Pepe Unchained V2</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Duration:</span>
                        <span className="text-green-300">1 Year</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Your USDC Balance:</span>
                        <span className="font-mono text-blue-300">{parseFloat(usdcBalance).toFixed(2)} USDC</span>
                      </div>
                      <div className="pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Wallet:</span>
                          <span className="font-mono text-sm text-gray-400 truncate max-w-[200px]">{address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <Shield className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-300">Secure</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-300">Instant</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <Globe className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-300">Decentralized</div>
                    </div>
                  </div>
                  
                  {registrationStatus === "error" && (
                    <Alert className="bg-red-500/10 border-red-500/30 text-red-300">
                      <AlertTriangle className="h-5 w-5" />
                      <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                  )}
                </>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between pt-6">
              <Button 
                variant="outline"
                onClick={onReset}
                disabled={registrationStatus === "sending" || registrationStatus === "processing"}
                className="border-white/20 text-gray-300 hover:bg-white/10 backdrop-blur-sm"
              >
                Back
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
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
        </div>
      </div>
    </div>
  );
}