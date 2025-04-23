
import { ArrowDown } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">About PEPU Domains</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            PEPU Domains is a decentralized domain service that allows you to secure your digital identity in the growing PEPU ecosystem.
          </p>
          <div className="flex flex-col items-center mb-8">
            <div className="bg-terminal-light-purple/40 border border-terminal-purple rounded-lg p-6 w-full max-w-3xl text-left text-gray-800 dark:text-gray-200 mb-4">
              <h3 className="font-bold mb-2 text-terminal-deep-purple">Secure &amp; Decentralized</h3>
              <p className="mb-3">
                Your domain is secured on the blockchain, giving you true ownership without central authority interference.
              </p>
              <h3 className="font-bold mb-2 text-terminal-deep-purple">Simple &amp; Fast</h3>
              <p className="mb-3">
                Reserve your domain in seconds with a seamless process. Connect your wallet and secure your name instantly.
              </p>
              <h3 className="font-bold mb-2 text-terminal-deep-purple">Affordable &amp; Renewable</h3>
              <p>
                Just $5 in PEPU tokens for a full year of domain ownership, with easy renewal options to maintain your digital identity.
              </p>
            </div>
            <ArrowDown className="my-2 text-terminal-purple" />
            <div className="bg-terminal-light-purple/40 border border-terminal-purple rounded-lg p-6 w-full max-w-3xl text-left text-gray-800 dark:text-gray-200">
              <h3 className="font-bold mb-2 text-terminal-deep-purple">What You Can Do With Your .pepu Domain</h3>
              <ol className="list-decimal pl-8 mb-4 space-y-2">
                <li>
                  <span className="font-semibold">Create Your Digital Identity:</span> Use your domain as a unique identifier across the PEPU ecosystem and beyond.
                </li>
                <li>
                  <span className="font-semibold">Connect With Web3 Services:</span> Access dApps, DeFi platforms, and other blockchain services with your domain.
                </li>
                <li>
                  <span className="font-semibold">Simplify Transactions:</span> Replace complex wallet addresses with your memorable .pepu domain for sending and receiving crypto.
                </li>
                <li>
                  <span className="font-semibold">Join the PEPU Community:</span> Be part of an exclusive network of early adopters in the rapidly growing PEPU ecosystem.
                </li>
              </ol>
              <h3 className="font-bold mb-2 text-terminal-deep-purple">PEPU Domains Roadmap</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold mb-1">Reservation Stage <span className="ml-2">LIVE 🔥</span></div>
                  <div>
                    <span className="text-green-400">✅ Ongoing<br /></span>
                    We're kicking things off by offering the first 1,000 .pepu domains at an exclusive 50% discount. Early adopters get to claim their preferred names before public minting begins. Once the 1,000 names are gone — this phase closes.
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">Token Launch <span className="ml-2">⏳ In Progress 🟡</span></div>
                  <div>
                    Launching the native $PNS token — powering domain purchases, rewards, staking, and platform governance. The token will serve as the economic core of the Pepu ecosystem.
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">Mainnet Release <span className="ml-2">🛠️ Coming Soon 🟠</span></div>
                  <div>
                    PNS will deploy on the Pepu mainnet, allowing users to register, manage, and renew .pepu domains in a fully decentralized way — backed by smart contracts.
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">
                    Developer SDKs <span className="ml-2">⚙️ Planned 🟣</span>
                  </div>
                  <div>
                    Official SDKs and APIs will be released, enabling developers to integrate .pepu domains into apps and platforms — for identity, wallet linking, and more.
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">NFT Integration &amp; Domain Marketplace <span className="ml-2">🧪 Research Phase 🟢</span></div>
                  <div>
                    Domains become tradable NFTs. Users will be able to buy, sell, or trade .pepu domains on NFT marketplaces, adding liquidity and utility to their names.
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-1">PNS Wallet Launch <span className="ml-2">🔧 Building Soon 🔴</span></div>
                  <div>
                    The Pepu Wallet will give users an all-in-one place to manage domains, interact with dApps, store tokens, and customize profiles tied to their .pepu identity.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
