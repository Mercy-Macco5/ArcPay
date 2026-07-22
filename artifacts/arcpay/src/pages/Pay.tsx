import React from 'react';
import { useParams, Link } from 'wouter';
import { PaymentCard } from '../components/PaymentCard';
import { getLink } from '../lib/store';

export default function Pay() {
  const { id } = useParams<{ id: string }>();
  const payment = id ? getLink(id) : undefined;

  if (!payment) {
    return (
      <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center py-12 px-6 text-center">
        <p className="text-lg font-semibold text-foreground mb-2">Link not found</p>
        <p className="text-sm text-muted-foreground mb-6">
          This payment link doesn't exist or has expired.
        </p>
        <Link href="/" className="text-sm text-primary hover:underline">
          Back to ArcPay
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center py-12 px-6">
      <PaymentCard payment={payment} />
    </div>
  );
}
