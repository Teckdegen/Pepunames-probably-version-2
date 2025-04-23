
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader, Check, X, AlertTriangle } from "lucide-react";
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

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="text-left">
        <h2 className="text-xl font-semibold mb-2">Search for your .pepu domain</h2>
        <p className="text-muted-foreground">Enter a name to check availability</p>
      </div>
      
      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="yourname"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="domain-input pr-16"
              autoComplete="off"
              spellCheck="false"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-terminal-purple font-mono">.pepu</div>
          </div>
          <Button 
            onClick={handleSearch}
            disabled={isSearching || !domain || !validationResult.valid}
            className="bg-terminal-purple hover:bg-terminal-deep-purple text-white"
          >
            {isSearching ? <Loader className="h-4 w-4 animate-spin" /> : "Search"}
          </Button>
        </div>
        
        {!validationResult.valid && domain && (
          <p className="text-red-500 text-sm mt-1">{validationResult.message}</p>
        )}
      </div>
      
      {searchResult.error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{searchResult.error}</AlertDescription>
        </Alert>
      )}
      
      {searchResult.domain && (
        <div className={`p-4 rounded-md flex items-center gap-3 ${
          searchResult.available 
            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
        }`}>
          {searchResult.available ? (
            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
          ) : (
            <X className="h-5 w-5 text-red-600 dark:text-red-400" />
          )}
          <div>
            <p className="font-mono font-medium">{searchResult.domain}</p>
            <p className="text-sm">
              {searchResult.available 
                ? "is available for registration!" 
                : "is already taken. Try another name."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
