
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DomainSearch } from "@/components/DomainSearch";
import { DomainRegister } from "@/components/DomainRegister";
import { SuccessRegistration } from "@/components/SuccessRegistration";
import { TerminalHeader } from "@/components/TerminalHeader";
import { motion } from "framer-motion";

export default function SearchPage() {
  const [step, setStep] = useState<"search" | "register" | "success">("search");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  
  const handleDomainSelect = (domain: string) => {
    setSelectedDomain(domain);
    setStep("register");
  };
  
  const handleRegistrationSuccess = (txHash: string) => {
    setTransactionHash(txHash);
    setStep("success");
  };
  
  const handleReset = () => {
    setSelectedDomain("");
    setTransactionHash("");
    setStep("search");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-mesh-purple bg-fixed">
      <Navbar />
      
      <motion.main 
        className="flex-1 container mx-auto px-4 py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="terminal-window mb-8 shadow-glow-md"
            variants={itemVariants}
          >
            <TerminalHeader title="Pepu Name Service - Domain Registry" />
            <div className="bg-terminal-dark-purple p-6">
              <pre className="font-mono text-green-400 text-sm mb-4 animate-fade-in">
                {`> PEPU Domain Registry v1.0
> Connected to Arbitrum One Network
> Ready to register domains...`}
              </pre>
              
              <div className="mb-4 text-terminal-light-purple font-mono text-sm relative">
                <span className="terminal-prompt">$</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {step === "search" && " Enter domain name to search:"}
                  {step === "register" && ` Preparing to register ${selectedDomain}...`}
                  {step === "success" && ` Domain ${selectedDomain} registered successfully!`}
                </motion.span>
                <span className="terminal-cursor"></span>
              </div>
              
              <motion.div 
                className="bg-black/50 rounded-md p-4 border border-terminal-purple/20 shadow-[0_0_10px_rgba(155,135,245,0.2)]"
                variants={itemVariants}
              >
                {step === "search" && (
                  <DomainSearch onDomainSelect={handleDomainSelect} />
                )}
                
                {step === "register" && selectedDomain && (
                  <DomainRegister 
                    selectedDomain={selectedDomain}
                    onSuccess={handleRegistrationSuccess}
                    onReset={handleReset}
                  />
                )}
                
                {step === "success" && selectedDomain && (
                  <SuccessRegistration 
                    domain={selectedDomain}
                    txHash={transactionHash}
                    onReset={handleReset}
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-md mb-8 border border-terminal-purple/10"
            variants={itemVariants}
          >
            <h2 className="text-xl font-semibold mb-4 text-gradient">About Pepu Domains</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                Register your .pepu domain for just 0.005 ETH on Arbitrum One for the first year 
                during our early access phase. Be part of the first 1,000 registrants to 
                secure this special launch price!
              </p>
              <p>
                Each domain is stored securely on the blockchain, ensuring your 
                digital identity remains protected and verifiable.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={itemVariants}
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-5 shadow-md border border-terminal-purple/10 hover:shadow-glow-sm transition-shadow">
              <div className="rounded-full bg-terminal-purple/10 w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-terminal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Blockchain Security</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Your domain is secured by advanced blockchain technology for maximum protection.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-5 shadow-md border border-terminal-purple/10 hover:shadow-glow-sm transition-shadow">
              <div className="rounded-full bg-terminal-purple/10 w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-terminal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Web3 Integration</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Seamlessly connect with decentralized applications across the Web3 ecosystem.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-5 shadow-md border border-terminal-purple/10 hover:shadow-glow-sm transition-shadow">
              <div className="rounded-full bg-terminal-purple/10 w-12 h-12 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-terminal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Launch Discount</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Special pricing of 0.005 ETH for first 1,000 domains during our early access phase.</p>
            </div>
          </motion.div>
        </div>
      </motion.main>
      
      <Footer />
    </div>
  );
}
