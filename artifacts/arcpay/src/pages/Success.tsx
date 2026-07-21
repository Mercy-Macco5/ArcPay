import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Link } from 'wouter';

export default function SuccessPage() {
  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center py-12 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center max-w-md w-full"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.1
          }}
          className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.2 }}
          >
            <Check className="w-10 h-10 text-green-500" />
          </motion.div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-3xl font-bold tracking-tight text-foreground mb-3"
        >
          Payment Successful
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-muted-foreground mb-10"
        >
          Your payment has been completed and is being processed on the network.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="w-full"
        >
          <Link
            href="/"
            className="w-full flex items-center justify-center py-3.5 px-4 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] text-foreground font-medium rounded-lg transition-all"
            data-testid="link-return-home"
          >
            Return Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
