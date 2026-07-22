import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FeatureCard } from '../components/FeatureCard';
import { Zap, Share2, Shield, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background selection:bg-primary/30">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-16 px-6">
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="flex justify-center mb-6">
              <img src="/arcpay-logo.png" alt="ArcPay" className="h-20 w-20 object-contain" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground mb-6 leading-[1.1]">
              Get paid in USDC with a single link.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Create a payment link in seconds, share it with anyone, and receive USDC without the complexity of wallet addresses.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/create"
                className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all hover:scale-[1.02] shadow-[0_0_30px_-5px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2"
                data-testid="link-hero-create"
              >
                Create Payment Link
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pay/demo"
                className="w-full sm:w-auto px-8 py-3.5 bg-white/[0.03] text-foreground font-medium rounded-lg border border-white/[0.08] hover:bg-white/[0.06] transition-all flex items-center justify-center gap-2"
                data-testid="link-hero-demo"
              >
                See How It Works
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-32">
            <FeatureCard
              icon={Zap}
              title="Create payment links in seconds"
              description="Instant setup, no friction. Just enter your details and get a shareable link immediately."
              delay={0.1}
            />
            <FeatureCard
              icon={Share2}
              title="Share with anyone"
              description="Send your payment link via email, SMS, or any social channel. Works flawlessly everywhere."
              delay={0.2}
            />
            <FeatureCard
              icon={Shield}
              title="Cross-chain Ready"
              description="Built for seamless USDC payments across supported chains with Arc."
              delay={0.3}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl"
          >
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">How it works</h2>
            
            <div className="flex flex-col space-y-8 relative">
              <div className="absolute left-6 top-8 bottom-8 w-px bg-white/[0.06] md:left-1/2 md:-ml-px hidden sm:block" />
              
              {[
                { step: 1, title: 'Create a payment link', desc: 'Enter the amount and your wallet address.' },
                { step: 2, title: 'Share the link', desc: 'Send it to your client anywhere.' },
                { step: 3, title: 'They pay', desc: 'They complete the payment using USDC.' },
                { step: 4, title: 'Get paid', desc: 'Receive funds directly in your wallet.' }
              ].map((item, i) => (
                <div key={item.step} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:justify-between relative">
                  <div className={`flex flex-row items-center gap-6 sm:w-1/2 ${i % 2 !== 0 ? 'md:order-2 md:justify-start' : 'md:justify-end'}`}>
                    <div className={`hidden md:flex flex-col ${i % 2 !== 0 ? 'items-start text-left' : 'items-end text-right'}`}>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-card border border-white/[0.1] flex items-center justify-center text-primary font-bold shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)]">
                    {item.step}
                  </div>
                  
                  <div className={`sm:w-1/2 flex flex-col items-start text-left ${i % 2 !== 0 ? 'md:order-1 md:items-end md:text-right' : ''}`}>
                    <div className="md:hidden flex flex-col items-start">
                       <h3 className="text-xl font-semibold">{item.title}</h3>
                       <p className="text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                    <div className={`hidden md:flex flex-col ${i % 2 !== 0 ? 'items-end text-right' : 'items-start text-left opacity-0'}`}>
                       <h3 className="text-xl font-semibold">{item.title}</h3>
                       <p className="text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
