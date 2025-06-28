
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Globe, Shield, Zap, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      
      <div className="relative container mx-auto px-6 py-20 flex flex-col items-center text-center space-y-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm">
          <Zap className="w-4 h-4" />
          <span>Powered by Pepe Unchained V2</span>
        </div>
        
        {/* Main heading */}
        <div className="space-y-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
            Own Your Digital
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Identity
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Secure decentralized domains on the Pepu network. 
            <br />
            <span className="text-purple-300 font-semibold">.pepu</span> domains starting at just 10 USDC
          </p>
        </div>
        
        {/* Search section */}
        <div className="w-full max-w-2xl space-y-6">
          {/* Search bar */}
          <div className="relative">
            <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group hover:border-purple-500/30 transition-all duration-300">
              <Globe className="w-6 h-6 text-purple-400 mr-4" />
              <div className="flex-1">
                <div className="text-left">
                  <div className="text-gray-400 text-sm mb-1">Search for your perfect domain</div>
                  <div className="text-white text-xl font-mono">
                    <span className="text-purple-400">yourname</span>
                    <span className="text-gray-500">.pepu</span>
                    <span className="animate-pulse ml-1 text-purple-400">|</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300" asChild>
                <Link to="/search" className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-300 bg-white/5 rounded-lg p-3">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Secure & Decentralized</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 bg-white/5 rounded-lg p-3">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Instant Registration</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 bg-white/5 rounded-lg p-3">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Global Access</span>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
            asChild
          >
            <Link to="/search" className="flex items-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
            asChild
          >
            <a href="#features">Learn More</a>
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 w-full max-w-4xl">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">10</div>
            <div className="text-gray-400 text-sm">USDC Price</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">1 Year</div>
            <div className="text-gray-400 text-sm">Registration</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">Instant</div>
            <div className="text-gray-400 text-sm">Activation</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="text-gray-400 text-sm">Decentralized</div>
          </div>
        </div>
      </div>
    </div>
  );
}
