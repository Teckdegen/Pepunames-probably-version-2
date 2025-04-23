
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
          {/* By the Numbers/Highlight */}
          <div className="my-8 max-w-xl mx-auto animate-fade-in">
            <div className="rounded-lg border border-terminal-purple bg-terminal-light-purple/25 p-6 flex flex-col items-center gap-2 shadow">
              <div className="font-semibold text-lg text-terminal-deep-purple tracking-tight">
                🎉 Limited Discount Offer
              </div>
              <span className="text-terminal-purple text-2xl font-bold">
                First 1,000 .pepu domains<br />
                <span className="text-base font-semibold">— 50% OFF: 5,000 PEPU tokens each</span>
              </span>
              <span className="text-sm text-muted-foreground">• One year registration • Yours on the blockchain •</span>
            </div>
          </div>
        </div>

        {/* 2. Key Features grouped */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 border border-terminal-purple rounded-lg p-6 shadow-lg animate-fade-in">
            <h3 className="font-bold mb-2 text-terminal-deep-purple">Secure &amp; Decentralized</h3>
            <p>
              Your domain is secured on the blockchain, giving you true ownership without central authority interference.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-terminal-purple rounded-lg p-6 shadow-lg animate-fade-in">
            <h3 className="font-bold mb-2 text-terminal-deep-purple">Simple &amp; Fast</h3>
            <p>
              Reserve your domain in seconds with a seamless process. Connect your wallet and secure your name instantly.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-terminal-purple rounded-lg p-6 shadow-lg animate-fade-in">
            <h3 className="font-bold mb-2 text-terminal-deep-purple">Affordable &amp; Renewable</h3>
            <p>
              Just 5,000 PEPU tokens secures a domain for a full year—with easy renewal options to maintain your digital identity.
            </p>
          </div>
        </div>

        {/* 3. What You Can Do With Your .pepu Domain */}
        <div className="mb-16">
          <div className="bg-terminal-light-purple/40 border border-terminal-purple rounded-lg p-6 w-full max-w-3xl text-left text-gray-800 dark:text-gray-200 mx-auto animate-fade-in">
            <h3 className="font-bold mb-4 text-terminal-deep-purple text-xl">What You Can Do With Your .pepu Domain</h3>
            <ul className="list-decimal pl-8 mb-4 space-y-2">
              <li><span className="font-semibold">Create Your Digital Identity:</span> Use your domain as your ID across the PEPU network and Web3 world.</li>
              <li><span className="font-semibold">Connect With Web3 Services:</span> Access dApps, DeFi platforms, and blockchain services using your domain.</li>
              <li><span className="font-semibold">Simplify Transactions:</span> Replace complex wallet addresses with your memorable <b>.pepu</b> domain for sending and receiving crypto.</li>
              <li><span className="font-semibold">Join the PEPU Community:</span> Become an early adopter in a rapidly growing ecosystem.</li>
            </ul>
            <ArrowDown className="my-2 mx-auto text-terminal-purple animate-bounce" />
          </div>
        </div>

        {/* 4. Roadmap Splitted Sections */}
        <div className="space-y-10">
          <h3 className="text-2xl font-bold text-terminal-deep-purple text-center mb-4 animate-slide-up">PEPU Domains Roadmap</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-terminal-light-purple/60 border border-terminal-purple rounded-2xl p-5 shadow-lg animate-scale-in">
              <h4 className="font-semibold mb-2">Reservation Stage <span className="ml-2 text-green-500">LIVE 🔥</span></h4>
              <p className="text-sm">
                <span className="text-green-500 font-bold">✅ Ongoing</span><br />
                First 1,000 .pepu domains at <b>50% discount</b>. Early adopters claim names before public sale. Sale ends after 1,000 names!
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-terminal-purple rounded-2xl p-5 shadow-lg animate-scale-in">
              <h4 className="font-semibold mb-2">
                Token Launch <span className="ml-2 text-yellow-500">⏳ In Progress 🟡</span>
              </h4>
              <p className="text-sm">
                $PNS token coming soon — used for domain purchases, rewards, staking, and platform governance.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-terminal-purple rounded-2xl p-5 shadow-lg animate-scale-in">
              <h4 className="font-semibold mb-2">
                Mainnet Release <span className="ml-2 text-orange-500">🛠️ Coming Soon 🟠</span>
              </h4>
              <p className="text-sm">
                PepuNS will deploy on mainnet: register, manage, and renew domains onchain—fully decentralized.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white dark:bg-gray-800 border border-terminal-purple rounded-2xl p-5 shadow-lg animate-scale-in">
              <h4 className="font-semibold mb-2">
                Developer SDKs <span className="ml-2 text-purple-500">⚙️ Planned 🟣</span>
              </h4>
              <p className="text-sm">
                Official SDKs and APIs will enable integration into apps and platforms for identity, wallet linking, and beyond.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-terminal-purple rounded-2xl p-5 shadow-lg animate-scale-in">
              <h4 className="font-semibold mb-2">
                NFT Integration &amp; Domain Marketplace <span className="ml-2 text-green-500">🧪 Research Phase 🟢</span>
              </h4>
              <p className="text-sm">
                Domains become tradable NFTs. Buy, sell, or trade your .pepu names on NFT marketplaces.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-terminal-purple rounded-2xl p-5 shadow-lg animate-scale-in">
              <h4 className="font-semibold mb-2">
                PNS Wallet Launch <span className="ml-2 text-red-500">🔧 Building Soon 🔴</span>
              </h4>
              <p className="text-sm">
                All-in-one Pepu Wallet to manage domains, interact with dApps, and customize your .pepu profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
