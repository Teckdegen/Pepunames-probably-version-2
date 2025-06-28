
import { supabase } from '@/integrations/supabase/client';

// Domain related functions
export async function checkDomainAvailability(domainName: string) {
  const { data, error } = await supabase
    .from('domains')
    .select('domain_name')
    .eq('domain_name', domainName)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking domain availability:', error);
    throw error;
  }

  return {
    available: !data,
    domain: domainName
  };
}

export async function registerDomain(
  domainName: string, 
  walletAddress: string, 
  txHash: string
) {
  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 1);

  const { data, error } = await supabase
    .from('domains')
    .insert([
      {
        domain_name: domainName,
        wallet_address: walletAddress,
        tx_hash: txHash,
        payment_confirmed: true,
        payment_amount: '5000', // Adding the required payment_amount field
        expires_at: expiresAt.toISOString(),
        confirmation_time: new Date().toISOString(),
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error registering domain:', error);
    throw error;
  }

  return data;
}

// Subscribe to real-time updates on domains
export function subscribeToDomainsChanges(callback: (payload: any) => void) {
  const subscription = supabase
    .channel('domains-changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'domains' }, 
      payload => {
        callback(payload);
      }
    )
    .subscribe();

  return subscription;
}
