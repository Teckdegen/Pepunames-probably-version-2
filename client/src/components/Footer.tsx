import { Link } from "react-router-dom";
import { Twitter, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-terminal-dark-purple text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <div className="bg-terminal-purple text-white font-bold text-xl px-3 py-1 rounded mr-2">P</div>
              <span className="text-xl font-bold">
                PNS PEPU NAME SERVICE
              </span>
            </Link>
            <p className="text-gray-400 max-w-xs">
              Secure your .pepu domain on the PEPU network and build your Web3 identity.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-terminal-light-purple">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-terminal-light-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-400 hover:text-terminal-light-purple transition-colors">
                  Search Domains
                </Link>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-terminal-light-purple transition-colors">
                  Features
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-terminal-light-purple">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://x.com/pepudomains/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-terminal-light-purple transition-colors">
                  <Twitter className="mr-2 w-5 h-5" />
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://t.me/pepudomains/" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-400 hover:text-terminal-light-purple transition-colors">
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} PNS PEPU NAME SERVICE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
