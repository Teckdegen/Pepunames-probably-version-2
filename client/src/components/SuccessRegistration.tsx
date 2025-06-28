import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ExternalLink, RotateCcw, Share2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SuccessRegistrationProps {
  domain: string;
  txHash: string;
  onReset: () => void;
}

export function SuccessRegistration({ domain, txHash, onReset }: SuccessRegistrationProps) {
  const { toast } = useToast();

  const handleCopyTxHash = () => {
    navigator.clipboard.writeText(txHash);
    toast({
      title: "Copied!",
      description: "Transaction hash copied to clipboard",
    });
  };

  const handleShare = () => {
    const text = `I just registered ${domain} on PepuNS! 🎉`;
    if (navigator.share) {
      navigator.share({
        title: "Domain Registered!",
        text: text,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(text + ` ${window.location.origin}`);
      toast({
        title: "Shared!",
        description: "Share text copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      
      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-white mb-4">
                🎉 Registration Successful!
              </CardTitle>
              <CardDescription className="text-gray-300 text-xl">
                You are now the proud owner of <span className="text-green-300 font-mono font-bold">{domain}</span>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Success Details */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Registration Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Domain:</span>
                    <span className="font-mono text-green-300 font-bold">{domain}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Status:</span>
                    <span className="text-green-300 font-semibold">✅ Registered</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Valid Until:</span>
                    <span className="text-blue-300">{new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                  </div>
                  <div className="pt-3 border-t border-green-500/20">
                    <div className="flex justify-between items-start">
                      <span className="text-gray-300">Transaction:</span>
                      <div className="flex items-center gap-2 max-w-[200px]">
                        <span className="font-mono text-sm text-gray-400 truncate">{txHash}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-gray-400 hover:text-white"
                          onClick={handleCopyTxHash}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">What's Next?</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">Set up your domain</p>
                      <p className="text-sm">Configure your domain to point to your website, wallet, or social profiles</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">Share your domain</p>
                      <p className="text-sm">Let the world know about your new .pepu domain</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">Manage your domain</p>
                      <p className="text-sm">Access your domain settings and renewal options</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  className="border-white/20 text-gray-300 hover:bg-white/10 backdrop-blur-sm"
                  asChild
                >
                  <a
                    href={`https://arbiscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Transaction
                  </a>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="border-white/20 text-gray-300 hover:bg-white/10 backdrop-blur-sm"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Success
                </Button>
                
                <Button
                  onClick={onReset}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Register Another
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}