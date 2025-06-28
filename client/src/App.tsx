
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { WalletProvider } from "@/providers/WalletProvider";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

// Page transition wrapper component
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Loading screen component
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-terminal-purple/20 to-terminal-deep-purple/20 backdrop-blur-md flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-20 h-20 mb-4 mx-auto relative">
          <div className="absolute inset-0 rounded-full border-t-2 border-terminal-purple animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-terminal-purple text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded-lg animate-pulse">P</div>
          </div>
        </div>
        <h2 className="text-xl font-bold text-gradient mb-2">PepuNS</h2>
        <p className="text-gray-600 dark:text-gray-400">Loading your domain experience...</p>
      </div>
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {loading ? (
            <LoadingScreen />
          ) : (
            <BrowserRouter>
              <PageTransition>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </BrowserRouter>
          )}
        </TooltipProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
};

export default App;
