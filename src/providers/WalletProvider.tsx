
import '@rainbow-me/rainbowkit/styles.css';
import { 
  RainbowKitProvider, 
  getDefaultWallets,
  createConfig,
  lightTheme
} from '@rainbow-me/rainbowkit';
import {
  http,
  createConfig as wagmiCreateConfig,
  WagmiConfig
} from 'wagmi';
import { pepeUnchained, appConfig } from '@/config/chain';
import { ReactNode } from 'react';

// Create wagmi config using the new API
const config = createConfig({
  appName: 'Pepu Name Service',
  projectId: appConfig.walletConnectProjectId,
  chains: [pepeUnchained],
  transports: {
    [pepeUnchained.id]: http(),
  },
});

// Custom theme for RainbowKit
const customTheme = lightTheme({
  accentColor: '#9b87f5',
  accentColorForeground: 'white',
  borderRadius: 'medium',
  fontStack: 'system',
});

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider 
        theme={customTheme}
        modalSize="compact"
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
