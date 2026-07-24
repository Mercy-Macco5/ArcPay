import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { FormField } from '../components/FormField';
import { Chain } from '../types';
import { saveLink } from '../lib/store';

const isValidEVMAddress = (address: string): boolean =>
  /^0x[0-9a-fA-F]{40}$/.test(address);

export default function CreatePaymentLink() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    walletAddress: '',
    amount: '',
    reason: '',
    chain: 'Base' as Chain,
  });
  const [walletTouched, setWalletTouched] = useState(false);

  const walletValue = formData.walletAddress.trim();
  const walletValid = isValidEVMAddress(walletValue);
  const showWalletError = walletTouched && walletValue.length > 0 && !walletValid;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletValid) return;
    const stored = saveLink({
      name: formData.name,
      walletAddress: walletValue,
      amount: parseFloat(formData.amount),
      reason: formData.reason || undefined,
      chain: formData.chain,
    });
    setLocation(`/pay-created/${stored.id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Auto-trim wallet address
    const sanitized = name === 'walletAddress' ? value.trimStart() : value;
    setFormData((prev) => ({ ...prev, [name]: sanitized }));
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center py-12 px-6">
      <div className="w-full max-w-[480px]">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          data-testid="link-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card border border-white/[0.06] rounded-2xl p-8 shadow-xl"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Create Payment Link</h1>
            <p className="text-muted-foreground text-sm mt-1">Configure your request details below.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              label="Your Name"
              name="name"
              placeholder="e.g. Mercy"
              value={formData.name}
              onChange={handleChange}
              required
              data-testid="input-name"
            />

            <div className="flex flex-col gap-1.5">
              <FormField
                label="Wallet Address"
                name="walletAddress"
                placeholder="0x..."
                value={formData.walletAddress}
                onChange={handleChange}
                onBlur={() => setWalletTouched(true)}
                required
                data-testid="input-wallet"
              />
              {showWalletError && (
                <p className="text-xs text-red-400" data-testid="error-wallet">
                  Please enter a valid EVM wallet address.
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                suffix="USDC"
                value={formData.amount}
                onChange={handleChange}
                required
                data-testid="input-amount"
              />

              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-[13px] font-medium text-muted-foreground tracking-tight">
                  Chain
                </label>
                <div className="relative">
                  <select
                    name="chain"
                    value={formData.chain}
                    onChange={handleChange}
                    className="w-full bg-background border border-white/[0.08] rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none"
                    data-testid="select-chain"
                  >
                    <option value="Ethereum">Ethereum</option>
                    <option value="Base">Base</option>
                    <option value="Arbitrum">Arbitrum</option>
                    <option value="Optimism">Optimism</option>
                    <option value="Polygon">Polygon</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <FormField
              label="Reason (Optional)"
              name="reason"
              placeholder="e.g. Invoice #001"
              value={formData.reason}
              onChange={handleChange}
              data-testid="input-reason"
            />

            <button
              type="submit"
              disabled={!walletValid}
              className="w-full mt-4 py-3 px-4 bg-primary text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)] enabled:hover:bg-primary/90 enabled:hover:scale-[1.01] enabled:active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              data-testid="button-generate"
            >
              Generate Payment Link
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
