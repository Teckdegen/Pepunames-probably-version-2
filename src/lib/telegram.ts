
// Function to send Telegram notification
export async function sendTelegramNotification(registrationDetails: {
  domainName: string;
  walletAddress: string;
  txHash: string;
  reservedAt: string;
  expiresAt: string;
}) {
  // Replace with your actual Telegram Bot token and chat ID
  const botToken = 'YOUR_TELEGRAM_BOT_TOKEN';
  const chatId = 'YOUR_CHAT_ID';
  
  const message = `
🎉 New Domain Registration 🎉

Domain: ${registrationDetails.domainName}
Owner: ${registrationDetails.walletAddress}
Transaction: ${registrationDetails.txHash}
Amount: 5000 PEPU
Registered: ${new Date(registrationDetails.reservedAt).toLocaleString()}
Expires: ${new Date(registrationDetails.expiresAt).toLocaleString()}
  `;
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });
    
    const data = await response.json();
    if (!data.ok) {
      console.error('Failed to send Telegram notification:', data);
      // Implement fallback notification method if needed
    }
    
    return data;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    // Implement fallback notification method
    throw error;
  }
}
