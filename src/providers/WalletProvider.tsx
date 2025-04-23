import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  connectorsForWallets,
  lightTheme,
  metaMaskWallet
} from '@rainbow-me/rainbowkit';
import { WagmiConfig, createConfig, http } from 'wagmi';
import { pepeUnchained, appConfig } from '@/config/chain';
import { ReactNode } from 'react';

// Only MetaMask is enabled for this project
const connectors = connectorsForWallets([
  {
    groupName: 'Wallets',
    wallets: [
      metaMaskWallet({
        projectId: appConfig.walletConnectProjectId,
      }),
    ],
  },
]);

const wagmiConfig = createConfig({
  connectors,
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
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={customTheme}
        modalSize="compact"
        chains={[pepeUnchained]}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
