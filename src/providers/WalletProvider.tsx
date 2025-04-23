
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { pepeUnchained, appConfig } from '@/config/chain';
import { ReactNode } from 'react';

// Configure chains for RainbowKit
const { chains, publicClient } = configureChains(
  [pepeUnchained],
  [publicProvider()]
);

// Set up wallet connectors
const { connectors } = getDefaultWallets({
  appName: 'PNS PEPU NAME SERVICE',
  projectId: appConfig.walletConnectProjectId,
  chains
});

// Create the wagmi config
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

const customTheme = lightTheme({
  accentColor: '#9b87f5',
  accentColorForeground: 'white',
  borderRadius: 'medium',
  fontStack: 'system',
});

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={customTheme}
        modalSize="compact"
        chains={chains}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
