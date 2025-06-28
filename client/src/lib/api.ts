// API client for domain operations
export interface DomainAvailabilityResponse {
  available: boolean;
  domain: string;
}

export interface ReserveDomainRequest {
  domainName: string;
  walletAddress: string;
  expiresAt: string;
  txHash?: string;
}

export interface ConfirmDomainRequest {
  domainName: string;
  walletAddress: string;
  txHash: string;
  paymentAmount: string;
}

export interface TransactionLogRequest {
  domainName: string;
  walletAddress: string;
  txHash?: string;
  amount: string;
  status: string;
  message?: string;
}

export async function checkDomainAvailability(domainName: string): Promise<DomainAvailabilityResponse> {
  const response = await fetch(`/api/domains/check/${encodeURIComponent(domainName)}`);
  if (!response.ok) {
    throw new Error('Failed to check domain availability');
  }
  return response.json();
}

export async function reserveDomain(data: ReserveDomainRequest) {
  const response = await fetch('/api/domains/reserve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to reserve domain');
  }
  
  return response.json();
}

export async function confirmDomainRegistration(data: ConfirmDomainRequest) {
  const response = await fetch('/api/domains/confirm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to confirm domain registration');
  }
  
  return response.json();
}

export async function logTransaction(data: TransactionLogRequest) {
  const response = await fetch('/api/transactions/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to log transaction');
  }
  
  return response.json();
}

export async function getDomainByName(domainName: string) {
  const response = await fetch(`/api/domains/${encodeURIComponent(domainName)}`);
  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Failed to get domain');
  }
  return response.json();
}