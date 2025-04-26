
// Arbitrum Chain Configuration
export const arbitrumOne = {
  id: 42161,
  name: 'Arbitrum One',
  network: 'arbitrum',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: { 
      http: ['https://arb1.arbitrum.io/rpc'] 
    },
    public: { 
      http: ['https://arb1.arbitrum.io/rpc'] 
    },
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

// App Configuration
export const appConfig = {
  treasuryWallet: '0x3f446E802A9c8A4cEB8f2A7dd998B44cb4bD9172',
  registrationFee: '0.05', // Changed from wei to ETH for clearer display
  registrationPeriod: 31536000, // 1 year in seconds
  walletConnectProjectId: 'd0b2dab20e3667281d013129f7f38720',
};

