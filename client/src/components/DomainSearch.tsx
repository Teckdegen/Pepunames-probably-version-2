import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader, Check, X, AlertTriangle, Search, Globe, Sparkles } from "lucide-react";
import { validateDomainName, formatDomainName, checkDomain } from "@/lib/domains";

interface DomainSearchProps {
  onDomainSelect: (domain: string) => void;
}

export function DomainSearch({ onDomainSelect }: DomainSearchProps) {
  const [domain, setDomain] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    available?: boolean;
    domain?: string;
    error?: string;
  }>({});

  // Validate domain as user types
  const validationResult = domain ? validateDomainName(domain) : { valid: true };
  
  const handleSearch = async () => {
    if (!validationResult.valid) return;
    
    setIsSearching(true);
    setSearchResult({});
    
    try {
      const result = await checkDomain(domain);
      setSearchResult(result);
      if (result.available) {
        onDomainSelect(result.domain);
      }
    } catch (error: any) {
      setSearchResult({ error: error.message });
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && validationResult.valid && !isSearching) {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      
      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Find Your Perfect Domain</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
              Search .pepu Domains
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover available domains on the Pepu network and secure your digital identity
            </p>
          </div>

          {/* Search Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
            <div className="space-y-6">
              {/* Search Input */}
              <div className="relative">
                <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl p-6 focus-within:border-purple-500/50 transition-all group">
                  <Globe className="w-6 h-6 text-purple-400 mr-4" />
                  <div className="flex-1 flex items-center">
                    <Input
                      type="text"
                      placeholder="Enter domain name"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="bg-transparent border-0 text-white placeholder:text-gray-400 text-xl focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
                    />
                    <span className="text-purple-300 text-xl font-mono ml-2">.pepu</span>
                  </div>
                  <Button
                    onClick={handleSearch}
                    disabled={!validationResult.valid || isSearching || !domain.trim()}
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 ml-4"
                  >
                    {isSearching ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        Search
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Validation Error */}
              {domain && !validationResult.valid && (
                <Alert className="bg-red-500/10 border-red-500/30 text-red-300">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{validationResult.message}</AlertDescription>
                </Alert>
              )}

              {/* Search Results */}
              {searchResult.error && (
                <Alert className="bg-red-500/10 border-red-500/30 text-red-300">
                  <X className="h-4 w-4" />
                  <AlertDescription>{searchResult.error}</AlertDescription>
                </Alert>
              )}

              {searchResult.available === true && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {searchResult.domain} is available!
                        </h3>
                        <p className="text-green-300">
                          Secure this domain for just 10 USDC
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => onDomainSelect(searchResult.domain!)}
                      size="lg"
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
                    >
                      Register Now
                    </Button>
                  </div>
                </div>
              )}

              {searchResult.available === false && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                      <X className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {searchResult.domain} is taken
                      </h3>
                      <p className="text-red-300">
                        Try a different name or variation
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Popular Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Popular Extensions</h3>
              <div className="space-y-2">
                {['web3', 'nft', 'defi', 'dao', 'metaverse'].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                    onClick={() => setDomain(suggestion)}
                  >
                    {suggestion}.pepu
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Creative Ideas</h3>
              <div className="space-y-2">
                {['myname', 'portfolio', 'startup', 'blog', 'project'].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                    onClick={() => setDomain(suggestion)}
                  >
                    {suggestion}.pepu
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Business Names</h3>
              <div className="space-y-2">
                {['company', 'brand', 'store', 'app', 'service'].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10"
                    onClick={() => setDomain(suggestion)}
                  >
                    {suggestion}.pepu
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}