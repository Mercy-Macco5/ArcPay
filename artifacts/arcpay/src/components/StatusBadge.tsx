import React from 'react';

export function StatusBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-medium tracking-wide">
      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
      Awaiting Payment
    </div>
  );
}
