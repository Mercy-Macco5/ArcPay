import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { MOCK_PAYMENT } from '../lib/mockData';
import { StatusBadge } from './StatusBadge';
import { Link, useLocation } from 'wouter';

export function PaymentCard() {
  const [copied, setCopied] = useState(false);
  const [, setLocation] = useLocation();
  const payment = MOCK_PAYMENT;

  const handleCopy = () => {
    navigator.clipboard.writeText(payment.walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePay = () => {
    setLocation('/success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md mx-auto bg-card rounded-2xl border border-white/[0.06] shadow-2xl overflow-hidden relative isolate"
      data-testid="payment-card"
    >
      {/* Subtle top glow */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-50" />
      
      <div className="p-8 flex flex-col items-center">
        <div className="w-full flex justify-between items-start mb-8">
          <div className="font-bold text-foreground tracking-tight text-lg">ArcPay</div>
          <StatusBadge />
        </div>

        <div className="text-center space-y-1 mb-8 w-full">
          <p className="text-sm font-medium text-muted-foreground">{payment.name} is requesting</p>
          <h1 className="text-5xl font-bold text-foreground tracking-tighter flex items-center justify-center gap-2">
            {payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="text-2xl text-muted-foreground font-semibold">USDC</span>
          </h1>
          {payment.reason && (
            <p className="text-sm text-muted-foreground mt-2">for {payment.reason}</p>
          )}
        </div>

        <div className="w-full space-y-4 mb-8">
          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-[13px] font-medium text-muted-foreground">Recipient Wallet</span>
            <div className="flex items-center justify-between p-3 rounded-lg bg-background border border-white/[0.04] group">
              <span className="text-sm text-foreground font-mono truncate mr-4">
                {payment.walletAddress.slice(0, 6)}...{payment.walletAddress.slice(-4)}
              </span>
              <button
                onClick={handleCopy}
                className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-white/[0.05]"
                aria-label="Copy wallet address"
                data-testid="button-copy-wallet"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <span className="text-[13px] font-medium text-muted-foreground">Network</span>
            <div className="flex items-center p-3 rounded-lg bg-background border border-white/[0.04]">
              <span className="text-sm text-foreground">{payment.chain}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePay}
          className="w-full py-3.5 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_-10px_rgba(99,102,241,0.5)]"
          data-testid="button-pay"
        >
          Pay with USDC
        </button>

        <p className="text-xs text-muted-foreground/60 mt-4 text-center">
          Blockchain integration coming in the next version.
        </p>
      </div>
    </motion.div>
  );
}
