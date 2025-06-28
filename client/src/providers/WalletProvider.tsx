
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import { createConfig, WagmiConfig } from 'wagmi';
import { http } from 'wagmi';
import { pepuChain, appConfig } from '@/config/chain';
import { ReactNode } from 'react';

// Set up connectors using getDefaultWallets (simpler approach)
const { connectors } = getDefaultWallets({
  appName: 'PNS PEPU NAME SERVICE',
  projectId: appConfig.walletConnectProjectId,
});

// Create the wagmi config for v2
const wagmiConfig = createConfig({
  connectors,
  chains: [pepuChain],
  transports: {
    [pepuChain.id]: http(),
  },
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
