import { checkDomainAvailability, registerDomain } from './supabase';
import { appConfig } from '@/config/chain';
import { sendTelegramNotification } from './telegram';

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
export async function monitorTransaction(provider: any, txHash: string) {
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

// Verify payment received in treasury wallet
export async function verifyPayment(txHash: string, provider: any): Promise<boolean> {
  try {
    const tx = await provider.getTransaction(txHash);
    if (!tx) {
      throw new Error("Transaction not found");
    }

    // Wait for at least 1 confirmation
    await tx.wait(1);

    // Verify amount and recipient
    const expectedAmount = BigInt(appConfig.registrationFee);
    const receivedAmount = tx.value;
    const recipient = tx.to?.toLowerCase();
    const treasuryWallet = appConfig.treasuryWallet.toLowerCase();

    return (
      receivedAmount >= expectedAmount &&
      recipient === treasuryWallet
    );
  } catch (error) {
    console.error('Payment verification failed:', error);
    throw new Error("Failed to verify payment");
  }
}

// Function to register a domain after payment is verified
export async function completeDomainRegistration(
  domainName: string,
  walletAddress: string,
  txHash: string,
  provider: any
) {
  try {
    // Verify payment first
    const isPaymentVerified = await verifyPayment(txHash, provider);
    if (!isPaymentVerified) {
      throw new Error("Payment verification failed");
    }
    
    // Register the domain
    const formattedDomain = formatDomainName(domainName);
    const registrationData = await registerDomain(formattedDomain, walletAddress, txHash);
    
    // Only send Telegram notification after successful registration
    if (registrationData) {
      const notificationDetails = {
        domainName: formattedDomain,
        walletAddress: walletAddress,
        txHash: txHash,
        reservedAt: registrationData.created_at,
        expiresAt: registrationData.expires_at,
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
