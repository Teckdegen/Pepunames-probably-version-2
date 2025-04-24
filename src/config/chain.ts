
// PEPU Chain Configuration
export const pepeUnchained = {
  id: 3409,
  name: 'Pepe Unchained',
  network: 'PEPU',
  nativeCurrency: {
    name: 'Pepe Unchained',
    symbol: 'PEPU',
    decimals: 18,
  },
  rpcUrls: {
    default: { 
      http: [
        'https://rpc-pepe-unchained-gupg0lo9wf.t.conduit.xyz',
        'https://3409.rpc.thirdweb.com'
      ] 
    },
    public: { 
      http: [
        'https://rpc-pepe-unchained-test-ypyaeq1krb.t.conduit.xyz',
        'https://3409.rpc.thirdweb.com'
      ] 
    },
  },
  blockExplorers: {
    default: {
      name: 'PEPU Explorer',
      url: 'https://explorer-pepe-unchained-gupg0lo9wf.t.conduit.xyz',
    },
  },
  // Using PEPU logo or a default one if not available
  iconUrl: 'https://raw.githubusercontent.com/base-org/brand-kit/001c0e9b40a67799ebe0418671ac4e02a0c683ce/logo/in-use/icon/base-logo.svg',
  iconBackground: '#000000',
};

// App Configuration
export const appConfig = {
  // Replace with your actual treasury wallet address
  treasuryWallet: '0x3f446E802A9c8A4cEB8f2A7dd998B44cb4bD9172',
  registrationFee: '5000000000000000000000', // 5000 PEPU with 18 decimals
  registrationPeriod: 31536000, // 1 year in seconds
  walletConnectProjectId: 'd0b2dab20e3667281d013129f7f38720',
};
