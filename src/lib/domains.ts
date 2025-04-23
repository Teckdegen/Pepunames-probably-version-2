
import { checkDomainAvailability, registerDomain } from './supabase';
import { appConfig } from '@/config/chain';
import { ethers } from 'ethers';

// Domain validation
export function validateDomainName(name: string): { valid: boolean; message?: string } {
  if (!name) {
    return { valid: false, message: 'Domain name is required' };
  }

  // Only allow letters, numbers and hyphens
  const validChars = /^[a-zA-Z0-9-]+$/;
  if (!validChars.test(name)) {
    return { valid: false, message: 'Only letters, numbers, and hyphens are allowed' };
  }

  // Check length
  if (name.length < 3) {
    return { valid: false, message: 'Domain name must be at least 3 characters' };
  }

  if (name.length > 32) {
    return { valid: false, message: 'Domain name must be less than 32 characters' };
  }

  return { valid: true };
}

// Format domain name (add .pepu if not already there)
export function formatDomainName(name: string): string {
  const lowercaseName = name.toLowerCase();
  return lowercaseName.endsWith('.pepu') ? lowercaseName : `${lowercaseName}.pepu`;
}

// Check domain availability
export async function checkDomain(name: string) {
  const validation = validateDomainName(name);
  if (!validation.valid) {
    throw new Error(validation.message);
  }
  
  const formattedName = formatDomainName(name);
  return checkDomainAvailability(formattedName);
}

// Monitor transaction status
export async function monitorTransaction(provider: ethers.providers.Provider, txHash: string) {
  let confirmations = 0;
  const requiredConfirmations = 1;
  
  return new Promise((resolve, reject) => {
    const checkTx = async () => {
      try {
        const tx = await provider.getTransaction(txHash);
        if (tx && tx.confirmations >= requiredConfirmations) {
          // Payment confirmed
          resolve(tx);
        } else if (!tx) {
          // Transaction not found or failed
          reject(new Error("Transaction failed or not found"));
        } else {
          // Not enough confirmations yet, check again in 5 seconds
          setTimeout(checkTx, 5000);
        }
      } catch (error) {
        reject(error);
      }
    };
    
    checkTx();
  });
}

// Function to register a domain after payment is verified
export async function completeDomainRegistration(
  domainName: string,
  walletAddress: string,
  txHash: string,
  provider: ethers.providers.Provider | null
) {
  try {
    // In a real implementation, we would wait for transaction confirmation
    // await monitorTransaction(provider, txHash);
    
    // Register the domain
    const formattedDomain = formatDomainName(domainName);
    return await registerDomain(formattedDomain, walletAddress, txHash);
  } catch (error) {
    console.error('Failed to complete domain registration:', error);
    throw error;
  }
}
