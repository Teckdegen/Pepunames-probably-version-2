
import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme
} from '@rainbow-me/rainbowkit';
import { WagmiConfig, http, createConfig } from 'wagmi';
import { pepeUnchained, appConfig } from '@/config/chain';
import { ReactNode } from 'react';

const { wallets } = getDefaultWallets({
  appName: 'PNS PEPU NAME SERVICE',
  projectId: appConfig.walletConnectProjectId,
  chains: [pepeUnchained],
});

const config = createConfig({
  connectors: wallets,
  transports: {
    [pepeUnchained.id]: http(),
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
