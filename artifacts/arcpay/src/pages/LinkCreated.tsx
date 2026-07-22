import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'wouter';
import { Copy, Check, ArrowRight, Home } from 'lucide-react';
import { getLink } from '../lib/store';

export default function LinkCreated() {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);

  const payment = id ? getLink(id) : undefined;
  const payUrl = `${window.location.origin}/pay/${id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(payUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!payment) {
    return (
      <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center py-12 px-6 text-center">
        <p className="text-muted-foreground text-sm">Payment link not found.</p>
        <Link href="/" className="mt-4 text-sm text-primary hover:underline">Go home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center py-12 px-6">
      <div className="w-full max-w-[480px]">
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-card border border-white/[0.06] rounded-2xl p-8 shadow-xl relative isolate"
        >
          {/* Top glow */}
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-50" />

          {/* Icon */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Check className="w-5 h-5 text-primary" />
          </motion.div>

          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">
            Your link is ready
          </h1>
          <p className="text-sm text-muted-foreground mb-8">
            Share this link to request{' '}
            <span className="text-foreground font-medium">
              {payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC
            </span>{' '}
            from anyone.
          </p>

          {/* Link display + copy */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-background border border-white/[0.08] mb-6">
            <span className="text-sm text-muted-foreground font-mono truncate flex-1 min-w-0">
              {payUrl}
            </span>
            <button
              onClick={handleCopy}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              data-testid="button-copy-link"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Link
                </>
              )}
            </button>
          </div>

          {/* Summary */}
          <div className="space-y-2 text-sm mb-8">
            {[
              { label: 'Name', value: payment.name },
              { label: 'Network', value: payment.chain },
              { label: 'Wallet', value: `${payment.walletAddress.slice(0, 6)}...${payment.walletAddress.slice(-4)}` },
              ...(payment.reason ? [{ label: 'Reason', value: payment.reason }] : []),
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-muted-foreground">
                <span>{label}</span>
                <span className="text-foreground font-medium font-mono">{value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link
              href={`/pay/${id}`}
              className="w-full py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)]"
              data-testid="link-view-payment"
            >
              Preview payment page
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="w-full py-3 px-4 bg-white/[0.03] text-muted-foreground font-medium rounded-lg border border-white/[0.08] hover:bg-white/[0.06] hover:text-foreground transition-all flex items-center justify-center gap-2"
              data-testid="link-home"
            >
              <Home className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
