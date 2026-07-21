import React from 'react';
import { PaymentCard } from '../components/PaymentCard';

export default function PayDemo() {
  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center py-12 px-6">
      <PaymentCard />
    </div>
  );
}
