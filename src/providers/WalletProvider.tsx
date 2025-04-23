
import '@rainbow-me/rainbowkit/styles.css';
import { 
  RainbowKitProvider, 
  getDefaultWallets,
  connectorsForWallets,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  trustWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { pepeUnchained, appConfig } from '@/config/chain';
import { ReactNode } from 'react';

// Configure chains
const { chains, publicClient } = configureChains(
  [pepeUnchained],
  [publicProvider()]
);

// Configure wallets
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId: appConfig.walletConnectProjectId, chains }),
      coinbaseWallet({ appName: 'Pepu Name Service', chains }),
      walletConnectWallet({ projectId: appConfig.walletConnectProjectId, chains }),
      trustWallet({ projectId: appConfig.walletConnectProjectId, chains }),
    ],
  },
]);

// Create wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

// Custom theme for RainbowKit
const customTheme = darkTheme({
  accentColor: '#9b87f5',
  accentColorForeground: 'white',
  borderRadius: 'medium',
  fontStack: 'system',
});

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider 
        chains={chains} 
        theme={customTheme}
        modalSize="compact"
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
