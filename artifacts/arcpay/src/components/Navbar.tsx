import React from 'react';
import { Link } from 'wouter';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-white/[0.04]">
      <Link href="/" className="text-lg font-bold tracking-tight text-white hover:opacity-80 transition-opacity" data-testid="link-home">
        ArcPay
      </Link>
      <Link href="/create" className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md transition-all shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)]" data-testid="link-create-payment">
        Create Payment Link
      </Link>
    </nav>
  );
}
