'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { modules } from '@/lib/modules-data';
import Link from 'next/link';
import { Suspense } from 'react';

function CourseDashboardInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [valid, setValid] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);

  const isPreview = searchParams.get('preview') === 'true' && process.env.NODE_ENV === 'development';

  useEffect(() => {
    if (isPreview) { setValid(true); return; }
    if (!token) { setValid(false); return; }
    fetch('/api/verify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(r => r.json())
      .then(d => { setValid(d.valid); setCompleted(d.modules_completed || []); })
      .catch(() => setValid(false));
  }, [token]);

  if (valid === null) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-8 h-8 border-2 border-[#F5C518] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!valid) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white mb-4">Access Required</h1>
        <p className="text-[#A0A0B0] mb-8">This link is invalid or expired. Please check your email for your access link.</p>
        <Link href="/" className="shimmer-btn text-[#0A0A0F] font-bold rounded-full px-8 py-4 inline-block">
          Get GRAFT — £59.99 →
        </Link>
      </div>
    );
  }

  const progress = Math.round((completed.length / 9) * 100);

  return (
    <div className="min-h-screen bg-[#0A0A0F] dot-grid-bg">
      <nav className="bg-[#0A0A0F] border-b border-[#F5C518]/15 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-[family-name:var(--font-playfair)] text-[28px] font-bold gold-text-gradient">GRAFT</span>
          <span className="text-[#A0A0B0] text-sm">{completed.length}/9 modules completed</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-white mb-4">Your Course Dashboard</h1>
          <p className="text-[#A0A0B0] mb-6">Work through each module in order. Mark complete when finished.</p>

          <div className="bg-[#111118] rounded-full h-4 overflow-hidden border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full gold-gradient rounded-full"
            />
          </div>
          <p className="text-[#F5C518] text-sm mt-2 font-medium">{progress}% complete</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((mod, i) => {
            const isComplete = completed.includes(mod.number);
            return (
              <motion.div
                key={mod.number}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link href={`/course/${mod.number}?token=${token}`}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="glassmorphism rounded-[20px] p-6 h-full cursor-pointer relative overflow-hidden"
                    style={{ borderTop: `3px solid ${mod.accent}` }}
                  >
                    {isComplete && (
                      <div className="absolute top-4 right-4">
                        <span className="text-[#F5C518] text-2xl">✓</span>
                      </div>
                    )}
                    <div className="text-6xl font-bold mb-4 font-[family-name:var(--font-playfair)]" style={{ color: mod.accent, opacity: 0.3 }}>
                      {String(mod.number).padStart(2, '0')}
                    </div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white mb-2">{mod.title}</h3>
                    <p className="text-[#A0A0B0] text-sm">{mod.description}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: isComplete ? '#22C55E' : mod.accent }} />
                      <span className="text-xs" style={{ color: isComplete ? '#22C55E' : '#A0A0B0' }}>
                        {isComplete ? 'Completed' : 'Start Module'}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function CourseDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-8 h-8 border-2 border-[#F5C518] border-t-transparent rounded-full" />
      </div>
    }>
      <CourseDashboardInner />
    </Suspense>
  );
}
