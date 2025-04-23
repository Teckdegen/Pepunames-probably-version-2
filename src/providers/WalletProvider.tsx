
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { createConfig, http, WagmiConfig } from 'wagmi';
import { pepeUnchained, appConfig } from '@/config/chain';
import { ReactNode } from 'react';
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { createStorage } from '@wagmi/core';

// Use only MetaMask wallet for this project
const projectId = appConfig.walletConnectProjectId;
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ projectId }),
    ],
  },
]);

// Create the wagmi config for v2
const wagmiConfig = createConfig({
  connectors,
  chains: [pepeUnchained],
  transports: {
    [pepeUnchained.id]: http(),
  },
  ssr: true,
  storage: createStorage({ storage: window.localStorage }),
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
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
