import React from 'react';

export function Footer() {
  return (
    <footer className="w-full py-8 mt-auto border-t border-white/[0.04] bg-background">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
        <p>
          Built by{' '}
          <a
            href="https://x.com/_mercyar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors font-medium"
            data-testid="link-twitter-mercyar"
          >
            @_mercyar
          </a>
        </p>
        <p className="mt-2 sm:mt-0">
          Powered by{' '}
          <a
            href="https://x.com/arc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors font-medium"
            data-testid="link-twitter-arc"
          >
            @arc
          </a>
        </p>
      </div>
    </footer>
  );
}
