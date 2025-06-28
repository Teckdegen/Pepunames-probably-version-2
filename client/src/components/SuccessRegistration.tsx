
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCheck } from "lucide-react";

interface SuccessRegistrationProps {
  domain: string;
  txHash: string;
  onReset: () => void;
}

export function SuccessRegistration({ domain, txHash, onReset }: SuccessRegistrationProps) {
  const explorerUrl = `https://explorer-pepe-unchained-test-ypyaeq1krb.t.conduit.xyz/tx/${txHash}`;
  
  return (
    <Card className="border-green-300 animate-fade-in">
      <CardHeader className="bg-green-50 dark:bg-green-900/30 border-b border-green-100 dark:border-green-900">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
            <CheckCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <CardTitle>Registration Successful!</CardTitle>
            <CardDescription>Your domain has been registered</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div className="bg-terminal-dark-purple text-white p-4 rounded-md font-mono">
          <div className="flex justify-between mb-2">
            <span>Domain:</span>
            <span>{domain}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Status:</span>
            <span className="text-green-400">Registered</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Duration:</span>
            <span>1 year</span>
          </div>
          <div className="border-t border-white/20 pt-2 mt-2">
            <div className="text-xs text-white/70 mb-1">Transaction Hash:</div>
            <div className="text-xs break-all">{txHash}</div>
          </div>
        </div>
        
        <p className="text-center text-muted-foreground">
          Your domain is now secured on the PEPU network.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onReset}>
          Register Another
        </Button>
        <Button 
          className="bg-terminal-purple hover:bg-terminal-deep-purple text-white"
          onClick={() => window.open(explorerUrl, '_blank')}
        >
          View Transaction
        </Button>
      </CardFooter>
    </Card>
  );
}
