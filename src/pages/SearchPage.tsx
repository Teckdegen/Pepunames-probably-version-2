
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DomainSearch } from "@/components/DomainSearch";
import { DomainRegister } from "@/components/DomainRegister";
import { SuccessRegistration } from "@/components/SuccessRegistration";
import { TerminalHeader } from "@/components/TerminalHeader";

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="terminal-window mb-8">
            <TerminalHeader title="Pepu Name Service - Domain Registry" />
            <div className="bg-terminal-dark-purple p-6">
              <pre className="font-mono text-green-400 text-sm mb-4">
                {`> PEPU Domain Registry v1.0
> Connected to Pepu Unchained Network
> Ready to register domains...`}
              </pre>
              
              <div className="mb-4 text-terminal-light-purple font-mono text-sm">
                {step === "search" && "$ Enter domain name to search:"}
                {step === "register" && `$ Preparing to register ${selectedDomain}...`}
                {step === "success" && `$ Domain ${selectedDomain} registered successfully!`}
              </div>
              
              <div className="bg-black/50 rounded-md p-4">
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
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">About Pepu Domains</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                .pepu domains are the standard for digital identity on the PEPU network. 
                Each domain costs 5,000 PEPU tokens and is registered for a period of 1 year.
              </p>
              <p>
                After registration, your domain is stored on the blockchain, ensuring 
                your ownership is secure and verifiable.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
