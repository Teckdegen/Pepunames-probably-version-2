
import { ArrowDown } from "lucide-react";
import useScrollAppear from "@/hooks/useScrollAppear";

export function Features() {
  const appearRef = useScrollAppear();

  return (
    <section id="features" className="py-16 bg-white dark:bg-gray-900">
      <div ref={appearRef} className="container mx-auto px-4 opacity-0 transition-all duration-700 translate-y-10" data-scroll-appear>
        {/* 1. About Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in">About PEPU Domains</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6 animate-fade-in">
            <span className="font-semibold text-terminal-purple">PEPU Domains</span> is a decentralized domain service that lets you secure your digital identity in the growing PEPU ecosystem.
          </p>
          {/* Highlight Box */}
          <div className="my-8 max-w-xl mx-auto animate-fade-in">
            <div className="rounded-lg border border-terminal-purple bg-terminal-light-purple/25 p-6 flex flex-col items-center gap-2 shadow-glow-md hover:shadow-glow-lg transition-all duration-300">
              <div className="font-semibold text-lg text-terminal-deep-purple tracking-tight">
                🎉 Limited Time Launch Offer
              </div>
              <span className="text-terminal-purple text-2xl font-bold">
                First 1,000 .pepu domains<br />
                <span className="text-base font-semibold">— 50% OFF: 10 USDC for first year</span>
              </span>
              <span className="text-sm text-muted-foreground">• One year registration • Early adopter benefit • All characters  cost the same </span>
            </div>
          </div>
        </div>

        {/* 2. Key Features grouped */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 border border-terminal-purple rounded-lg p-6 shadow-lg animate-fade-in hover:shadow-glow-sm transition-all duration-300">
            <div className="rounded-full bg-terminal-purple/10 w-12 h-12 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-terminal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-terminal-deep-purple">Blockchain Secured</h3>
            <p>Your domain is protected by PEPU's robust blockchain technology, ensuring maximum security and ownership.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-terminal-purple rounded-lg p-6 shadow-lg animate-fade-in hover:shadow-glow-sm transition-all duration-300">
            <div className="rounded-full bg-terminal-purple/10 w-12 h-12 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-terminal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-terminal-deep-purple">Web3 Ready</h3>
            <p>Seamlessly integrate with dApps and enjoy full compatibility across the decentralized ecosystem.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 border border-terminal-purple rounded-lg p-6 shadow-lg animate-fade-in hover:shadow-glow-sm transition-all duration-300">
            <div className="rounded-full bg-terminal-purple/10 w-12 h-12 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-terminal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold mb-2 text-terminal-deep-purple">Early Access Benefits</h3>
            <p>Join early and secure your premium domain name at an exclusive 50% discount for the first year.</p>
          </div>
        </div>

        {/* 4. Roadmap Splitted Sections */}
        <div className="space-y-10">
          <h3 className="text-2xl font-bold text-terminal-deep-purple text-center mb-4 animate-slide-up">PEPU Domains Roadmap</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-terminal-light-purple/60 border border-terminal-purple rounded-2xl p-5 shadow-lg animate-scale-in hover:shadow-glow-sm transition-all duration-300">
              <h4 className="font-semibold mb-2">Early Access Phase <span className="ml-2 text-green-500">LIVE 🔥</span></h4>
              <p className="text-sm">
                <span className="text-green-500 font-bold">✅ Ongoing</span><br />
                First 1,000 .pepu domains at <b>50% discount</b>. Secure your name before public launch. Limited time offer!
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-terminal-purple rounded-2xl p-5 shadow-lg animate-scale-in hover:shadow-glow-sm transition-all duration-300">
              <h4 className="font-semibold mb-2">
                Token Launch <span className="ml-2 text-yellow-500">⏳ In Progress 🟡</span>
              </h4>
              <p className="text-sm">
                $PNS governance token launching soon — enabling domain purchases, rewards, staking, and community governance.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-terminal-purple rounded-2xl p-5 shadow-lg animate-scale-in hover:shadow-glow-sm transition-all duration-300">
              <h4 className="font-semibold mb-2">
                Mainnet Release <span className="ml-2 text-orange-500">🛠️ Coming Soon 🟠</span>
              </h4>
              <p className="text-sm">
                Full decentralized launch on PEPU mainnet with advanced features and seamless domain management.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white dark:bg-gray-800 border border-terminal-purple rounded-2xl p-5 shadow-lg animate-scale-in hover:shadow-glow-sm transition-all duration-300">
              <h4 className="font-semibold mb-2">
                Developer Tools <span className="ml-2 text-purple-500">⚙️ Planned 🟣</span>
              </h4>
              <p className="text-sm">
                Comprehensive SDK and API suite enabling seamless integration for developers and platforms.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-terminal-purple rounded-2xl p-5 shadow-lg animate-scale-in hover:shadow-glow-sm transition-all duration-300">
              <h4 className="font-semibold mb-2">
                NFT Integration <span className="ml-2 text-green-500">🧪 Research Phase 🟢</span>
              </h4>
              <p className="text-sm">
                Transform domains into tradeable NFTs. Buy, sell, or trade your .pepu names on leading marketplaces.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-terminal-purple rounded-2xl p-5 shadow-lg animate-scale-in hover:shadow-glow-sm transition-all duration-300">
              <h4 className="font-semibold mb-2">
                PEPU Wallet <span className="ml-2 text-red-500">🔧 Building Soon 🔴</span>
              </h4>
              <p className="text-sm">
                All-in-one wallet to manage domains, interact with dApps, and customize your .pepu profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
