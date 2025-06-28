
import { checkDomainAvailability as apiCheckDomain, confirmDomainRegistration, logTransaction } from './api';
import { appConfig } from '@/config/chain';
import { sendTelegramNotification } from './telegram';
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

  // Check length - now allowing single character domains
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
  return apiCheckDomain(formattedName);
}

// Monitor transaction status with more robust error handling
export async function monitorTransaction(provider: any, txHash: string) {
  let confirmations = 0;
  const requiredConfirmations = 1;
  const maxAttempts = 30; // Max number of attempts
  let attempts = 0;
  
  return new Promise((resolve, reject) => {
    const checkTx = async () => {
      try {
        if (attempts >= maxAttempts) {
          reject(new Error("Transaction confirmation timed out"));
          return;
        }
        
        attempts++;
        const tx = await provider.getTransaction(txHash);
        
        if (tx && tx.confirmations >= requiredConfirmations) {
          // Payment confirmed
          resolve(tx);
        } else if (!tx) {
          // If no transaction after a few attempts, probably failed or hash is wrong
          if (attempts > 5) {
            reject(new Error("Transaction not found or failed"));
          } else {
            // Keep checking, might just be network delay
            setTimeout(checkTx, 5000);
          }
        } else {
          // Not enough confirmations yet, check again in 5 seconds
          setTimeout(checkTx, 5000);
        }
      } catch (error) {
        console.error('Error monitoring transaction:', error);
        if (attempts >= 5) {
          reject(error);
        } else {
          // Try again in case of temporary network issue
          setTimeout(checkTx, 5000);
        }
      }
    };
    
    checkTx();
  });
}

// Verify payment received in treasury wallet with enhanced validation
export async function verifyPayment(txHash: string | `0x${string}`, provider: any): Promise<boolean> {
  try {
    // Ensure we have a string regardless of what type was passed
    const hashString: string = typeof txHash === 'string' ? txHash : txHash as string;
    
    if (!hashString || hashString.length !== 66 || !hashString.startsWith('0x')) {
      throw new Error("Invalid transaction hash format");
    }

    const tx = await provider.getTransaction(hashString);
    if (!tx) {
      throw new Error("Transaction not found");
    }

    // Wait for at least 1 confirmation
    await tx.wait(1);

    // Verify amount and recipient with strict validation
    const expectedAmount = BigInt(appConfig.registrationFee);
    const receivedAmount = tx.value;
    const recipient = tx.to?.toLowerCase();
    const treasuryWallet = appConfig.treasuryWallet.toLowerCase();

    if (receivedAmount < expectedAmount) {
      throw new Error(`Insufficient payment: received ${ethers.formatEther(receivedAmount)} ETH, expected ${ethers.formatEther(expectedAmount)} ETH`);
    }
    
    if (recipient !== treasuryWallet) {
      throw new Error("Payment sent to incorrect wallet address");
    }

    return true;
  } catch (error) {
    console.error('Payment verification failed:', error);
    throw error;
  }
}

// Function to register a domain after payment is verified
export async function completeDomainRegistration(
  domainName: string,
  walletAddress: string,
  txHash: string | `0x${string}`,
  provider: any
) {
  try {
    // Ensure we have a string regardless of what type was passed
    const hashString: string = typeof txHash === 'string' ? txHash : txHash as string;
    
    // Verify payment first
    const isPaymentVerified = await verifyPayment(hashString, provider);
    if (!isPaymentVerified) {
      throw new Error("Payment verification failed");
    }
    
    // Register the domain
    const formattedDomain = formatDomainName(domainName);
    const registrationData = await confirmDomainRegistration({
      domainName: formattedDomain,
      walletAddress: walletAddress,
      txHash: hashString,
      paymentAmount: appConfig.registrationFee
    });
    
    // Log the transaction
    await logTransaction({
      domainName: formattedDomain,
      walletAddress: walletAddress,
      txHash: hashString,
      amount: appConfig.registrationFee,
      status: 'confirmed'
    });
    
    // Only send Telegram notification after successful registration
    if (registrationData) {
      const notificationDetails = {
        domainName: formattedDomain,
        walletAddress: walletAddress,
        txHash: hashString,
        reservedAt: registrationData.createdAt,
        expiresAt: registrationData.expiresAt,
      };
      
      try {
        await sendTelegramNotification(notificationDetails);
      } catch (error) {
        console.error('Failed to send Telegram notification:', error);
        // Don't throw error here as domain is already registered
      }
    }
    
    return registrationData;
  } catch (error) {
    console.error('Failed to complete domain registration:', error);
    throw error;
  }
}
