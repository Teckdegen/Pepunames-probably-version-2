import { Shield, Zap, Globe, Users, Lock, Rocket } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <div className="relative container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6">
            <Rocket className="w-4 h-4" />
            <span>Why Choose PepuNS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6">
            Built for the Future of Web3
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of domain management with advanced security, 
            lightning-fast performance, and seamless Web3 integration.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Military-Grade Security</h3>
            <p className="text-gray-300 leading-relaxed">
              Your domains are protected by advanced blockchain cryptography and 
              decentralized infrastructure, ensuring maximum security and uptime.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Lightning Fast</h3>
            <p className="text-gray-300 leading-relaxed">
              Instant domain registration and resolution with sub-second response times 
              powered by the high-performance Pepu network.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Global Network</h3>
            <p className="text-gray-300 leading-relaxed">
              Access your domains from anywhere in the world with our distributed 
              network ensuring 99.9% uptime and global accessibility.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Community Driven</h3>
            <p className="text-gray-300 leading-relaxed">
              Join a thriving community of Web3 innovators and domain enthusiasts 
              building the decentralized internet together.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">True Ownership</h3>
            <p className="text-gray-300 leading-relaxed">
              You own your domain completely. No intermediaries, no censorship, 
              no third-party control. Your domain, your rules.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Rocket className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Future Ready</h3>
            <p className="text-gray-300 leading-relaxed">
              Built for tomorrow's internet with support for emerging technologies 
              and seamless integration with Web3 applications.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">USDC Price</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">1</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Year Duration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">∞</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">Possibilities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}