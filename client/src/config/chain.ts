
// Pepe Unchained V2 Chain Configuration
export const pepuChain = {
  id: 97741,
  name: 'Pepe Unchained V2',
  network: 'pepu',
  nativeCurrency: {
    name: 'PEPU',
    symbol: 'PEPU',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://arb1.arbitrum.io/rpc'] },
  },
  blockExplorers: {
    default: {
      name: 'Arbiscan',
      url: 'https://arbiscan.io',
    },
  },
  iconUrl: 'https://raw.githubusercontent.com/base-org/brand-kit/001c0e9b40a67799ebe0418671ac4e02a0c683ce/logo/in-use/icon/base-logo.svg',
  iconBackground: '#000000',
};

// USDC Contract Configuration
export const usdcConfig = {
  address: '0xC565AE272c15D1aCaFc25C3A92a56D33Fa280f01',
  decimals: 6,
  symbol: 'USDC',
  name: 'USD Coin',
};

// App Configuration
export const appConfig = {
  treasuryWallet: '0x3af0382fF31F4C5965a48E5B42092Be03C8e6e9B',
  registrationFee: '10', // 10 USDC
  registrationPeriod: 31536000, // 1 year in seconds
  walletConnectProjectId: 'd0b2dab20e3667281d013129f7f38720',
};

