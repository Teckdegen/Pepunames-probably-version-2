
import { checkDomainAvailability as apiCheckDomain, confirmDomainRegistration } from './api';

// Domain related functions
export async function checkDomainAvailability(domainName: string) {
  return apiCheckDomain(domainName);
}

export async function registerDomain(
  domainName: string, 
  walletAddress: string, 
  txHash: string
) {
  return confirmDomainRegistration({
    domainName,
    walletAddress,
    txHash,
    paymentAmount: '5000' // 5000 USDC equivalent
  });
}

// Subscribe to real-time updates on domains (stub for now - can be implemented with WebSockets later)
export function subscribeToDomainsChanges(callback: (payload: any) => void) {
  console.log('Real-time subscriptions not implemented yet');
  return { unsubscribe: () => {} };
}
