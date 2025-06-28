
import { checkDomainAvailability as apiCheckDomain, confirmDomainRegistration, logTransaction } from './api';
import { appConfig, usdcConfig } from '@/config/chain';
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

// Verify USDC payment received in treasury wallet
export async function verifyPayment(txHash: string | `0x${string}`, provider: any): Promise<boolean> {
  try {
    // Ensure we have a string regardless of what type was passed
    const hashString: string = typeof txHash === 'string' ? txHash : txHash as string;
    
    if (!hashString || hashString.length !== 66 || !hashString.startsWith('0x')) {
      throw new Error("Invalid transaction hash format");
    }

    // Get transaction receipt to verify success
    const receipt = await provider.getTransactionReceipt(hashString);
    if (!receipt) {
      throw new Error("Transaction receipt not found");
    }

    // Check if transaction was successful
    if (receipt.status !== 1) {
      throw new Error("Transaction failed or was reverted");
    }

    // Verify the transaction was to USDC contract
    const usdcContract = usdcConfig.address.toLowerCase();
    if (receipt.to?.toLowerCase() !== usdcContract) {
      throw new Error("Transaction was not sent to USDC contract");
    }

    // Parse USDC Transfer event from logs
    const transferEventSignature = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"; // keccak256("Transfer(address,address,uint256)")
    const transferLog = receipt.logs.find((log: any) => 
      log.topics[0] === transferEventSignature &&
      log.address.toLowerCase() === usdcContract
    );

    if (!transferLog) {
      throw new Error("USDC Transfer event not found in transaction logs");
    }

    // Decode transfer event data
    const treasuryWallet = appConfig.treasuryWallet.toLowerCase();
    const toAddress = '0x' + transferLog.topics[2]?.slice(26); // Remove padding from address
    const transferAmount = BigInt(transferLog.data);
    
    // Verify recipient is treasury wallet
    if (toAddress.toLowerCase() !== treasuryWallet) {
      throw new Error(`Payment sent to wrong address. Expected: ${treasuryWallet}, Got: ${toAddress}`);
    }

    // Verify amount (10 USDC = 10 * 10^6 smallest units)
    const expectedAmount = BigInt(appConfig.registrationFee) * BigInt(10 ** usdcConfig.decimals);
    if (transferAmount < expectedAmount) {
      const receivedUsdc = Number(transferAmount) / (10 ** usdcConfig.decimals);
      throw new Error(`Insufficient payment: received ${receivedUsdc} USDC, expected ${appConfig.registrationFee} USDC`);
    }

    return true;
  } catch (error) {
    console.error('USDC payment verification failed:', error);
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
