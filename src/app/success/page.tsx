'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function SuccessInner() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-[#0A0A0F] dot-grid-bg flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 rounded-full gold-gradient flex items-center justify-center mx-auto mb-8"
        >
          <span className="text-[#0A0A0F] text-5xl">✓</span>
        </motion.div>

        <h1 className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-white mb-4">
          You&apos;re In!
        </h1>
        <p className="text-[#F5C518] text-xl font-medium mb-6">
          Welcome to GRAFT
        </p>
        <p className="text-[#A0A0B0] text-lg mb-4">
          Your payment was successful. Check your email — your unique course access link is on its way right now.
        </p>
        <p className="text-[#A0A0B0] mb-8">
          It usually arrives within 60 seconds. Check your spam folder if you don&apos;t see it.
        </p>

        <div className="glassmorphism rounded-[20px] p-8 mb-8 text-left">
          <h3 className="text-[#F5C518] font-bold text-lg mb-4">What happens next:</h3>
          <ol className="space-y-3 text-[#E0E0E0]">
            <li className="flex items-start gap-3">
              <span className="gold-gradient text-[#0A0A0F] font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">1</span>
              <span>Check your email for your unique access link</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="gold-gradient text-[#0A0A0F] font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">2</span>
              <span>Bookmark the link — it&apos;s your lifetime access pass</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="gold-gradient text-[#0A0A0F] font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">3</span>
              <span>Start with Module 1 and work through in order</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="gold-gradient text-[#0A0A0F] font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">4</span>
              <span>Complete the action steps at the end of every module</span>
            </li>
          </ol>
        </div>

        <p className="text-[#A0A0B0] text-sm mb-8">
          Need help? Email us at{' '}
          <a href="mailto:grafted.business@gmail.com" className="text-[#F5C518] hover:underline">
            grafted.business@gmail.com
          </a>
        </p>

        <Link href="/">
          <motion.span
            whileHover={{ scale: 1.03 }}
            className="text-[#A0A0B0] hover:text-[#F5C518] transition inline-block"
          >
            ← Back to Home
          </motion.span>
        </Link>

        {sessionId && (
          <p className="text-[#A0A0B0]/30 text-xs mt-8">Order ref: {sessionId.slice(0, 20)}...</p>
        )}
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#F5C518] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessInner />
    </Suspense>
  );
}
