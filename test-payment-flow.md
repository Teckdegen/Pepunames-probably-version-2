# Payment Flow Verification

## Complete Registration Flow

The domain registration follows this exact sequence:

### 1. User Initiates Payment
- User connects wallet (MetaMask/Coinbase)
- User searches for available domain
- User clicks "Register Now"
- App checks user has sufficient USDC balance (≥10 USDC)
- App verifies user is on correct network (Pepe Unchained V2, Chain ID: 97741)

### 2. USDC Payment Transaction
- Frontend creates USDC contract instance using:
  - Contract: `0xC565AE272c15D1aCaFc25C3A92a56D33Fa280f01`
  - ABI: Standard ERC-20 transfer function
- Calls `transfer(treasuryWallet, amount)` where:
  - treasuryWallet: `0x3af0382fF31F4C5965a48E5B42092Be03C8e6e9B`
  - amount: `10000000` (10 USDC in 6 decimal format)

### 3. Transaction Verification
- App waits for transaction confirmation using `useWaitForTransactionReceipt`
- Once confirmed, app calls `verifyPayment()` function which:
  - Gets transaction receipt
  - Verifies transaction was successful (status === 1)
  - Verifies transaction was sent to USDC contract
  - Parses Transfer event logs
  - Confirms recipient is treasury wallet
  - Confirms amount is exactly 10 USDC

### 4. Domain Registration (Only if payment verified)
- Calls API endpoint `/api/domains/confirm`
- Server stores domain in database with:
  - Domain name
  - Wallet address
  - Transaction hash
  - Payment amount
  - Confirmation time
  - Expiration date (1 year from now)

### 5. Transaction Logging
- Logs successful transaction in `transaction_logs` table
- Records domain name, wallet, tx hash, amount, status

### 6. Telegram Notification (Final step)
- Sends notification to Telegram bot with:
  - Domain name
  - Owner wallet address
  - Transaction hash
  - Amount (10 USDC)
  - Registration and expiration dates

## Security Features

✅ **No database operations until payment confirmed**
✅ **Verifies exact payment amount and recipient**
✅ **Only successful transactions trigger notifications**
✅ **Failed transactions don't register domains**
✅ **Real-time USDC balance checking**
✅ **Network validation before payment**

## Error Handling

- Insufficient balance: Shows error, blocks registration
- Wrong network: Shows switch network button
- Failed transaction: Shows error, no database changes
- Payment verification failed: Shows error, no domain registration
- No Telegram notification sent for failed payments