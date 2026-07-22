export type Chain = 'Ethereum' | 'Base' | 'Arbitrum' | 'Optimism' | 'Polygon';

export interface PaymentLink {
  name: string;
  walletAddress: string;
  amount: number;
  reason?: string;
  chain: Chain;
}

export interface StoredPaymentLink extends PaymentLink {
  id: string;
  createdAt: number;
}
