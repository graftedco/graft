'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { modules } from '@/lib/modules-data';
import { getModuleContent } from '@/lib/module-content';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { use } from 'react';

function ModulePageInner({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const moduleNumber = parseInt(id);
  const mod = modules.find(m => m.number === moduleNumber);
  const content = getModuleContent(moduleNumber);

  const [valid, setValid] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState<number[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleComplete = useCallback(async () => {
    if (!token) return;
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#F5C518', '#E8A800', '#FFE066', '#22C55E'],
    });
    try {
      const res = await fetch('/api/complete-module', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, moduleNumber }),
      });
      const data = await res.json();
      if (data.modules_completed) setCompleted(data.modules_completed);
    } catch { /* ignore */ }
  }, [token, moduleNumber]);

  if (valid === null) {
    return <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-8 h-8 border-2 border-[#F5C518] border-t-transparent rounded-full" />
    </div>;
  }

  if (!valid || !mod || !content) {
    return <div className="min-h-screen bg-[#0A0A0F] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white mb-4">Access Required</h1>
      <p className="text-[#A0A0B0] mb-8">Please use your course access link from your email.</p>
      <Link href="/" className="shimmer-btn text-[#0A0A0F] font-bold rounded-full px-8 py-4 inline-block">Get GRAFT →</Link>
    </div>;
  }

  const isComplete = completed.includes(moduleNumber);
  const progress = Math.round((completed.length / 9) * 100);

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex">
      {/* Mobile sidebar toggle */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden fixed top-4 left-4 z-50 bg-[#111118] border border-white/10 rounded-lg p-2 cursor-pointer">
        <svg width="24" height="24" fill="none" stroke="#F5C518" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
      </button>

      {/* Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#111118] border-r border-white/5 z-40 transition-transform duration-300 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6">
          <Link href={`/course?token=${token}`} className="font-[family-name:var(--font-playfair)] text-xl font-bold gold-text-gradient block mb-6">GRAFT</Link>

          <div className="bg-[#0A0A0F] rounded-full h-2 mb-2 overflow-hidden">
            <div className="h-full gold-gradient rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-[#A0A0B0] text-xs mb-6">{progress}% complete</p>

          <div className="space-y-2">
            {modules.map(m => {
              const isCurrent = m.number === moduleNumber;
              const isDone = completed.includes(m.number);
              return (
                <Link key={m.number} href={`/course/${m.number}?token=${token}`} onClick={() => setSidebarOpen(false)}>
                  <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isCurrent ? 'bg-white/5' : 'hover:bg-white/3'}`} style={isCurrent ? { borderLeft: `3px solid ${m.accent}` } : {}}>
                    {isDone ? (
                      <span className="text-[#F5C518] text-lg">✓</span>
                    ) : (
                      <span className="text-[#A0A0B0] text-sm font-mono">{String(m.number).padStart(2, '0')}</span>
                    )}
                    <span className={`text-sm ${isCurrent ? 'text-white font-medium' : 'text-[#A0A0B0]'}`}>{m.title}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Hero banner */}
        <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${mod.accent}20, ${mod.accent}05)` }}>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="font-[family-name:var(--font-playfair)] text-[200px] md:text-[300px] font-bold" style={{ color: mod.accent }}>
              {String(moduleNumber).padStart(2, '0')}
            </span>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <p className="text-sm font-medium mb-2 uppercase tracking-wider" style={{ color: mod.accent }}>Module {moduleNumber}</p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-bold text-white leading-tight">{mod.title}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
          {/* First image */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="rounded-[20px] overflow-hidden border-2" style={{ borderColor: mod.accent + '40' }}>
              <img src={content.image1} alt={content.image1Caption} className="w-full h-64 md:h-80 object-cover" loading="lazy" />
            </div>
            <p className="text-[#A0A0B0] text-sm italic mt-3 text-center">{content.image1Caption}</p>
          </motion.div>

          {/* Lead paragraph */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-[22px] text-white/90 leading-relaxed mb-10 font-light">
            {content.lead}
          </motion.p>

          {/* Main content - rendered as HTML */}
          <div
            className="module-content prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: content.html }}
            style={{
              '--accent': mod.accent,
              '--accent-light': mod.accentLight,
            } as React.CSSProperties}
          />

          {/* Second image */}
          <div className="my-12">
            <div className="rounded-[20px] overflow-hidden border-2" style={{ borderColor: mod.accent + '40' }}>
              <img src={content.image2} alt={content.image2Caption} className="w-full h-64 md:h-80 object-cover" loading="lazy" />
            </div>
            <p className="text-[#A0A0B0] text-sm italic mt-3 text-center">{content.image2Caption}</p>
          </div>

          {/* Videos */}
          {content.videos.map((video, i) => (
            <div key={i} className="my-10">
              <p className="font-bold text-lg mb-4" style={{ color: mod.accent }}>▶ Watch This</p>
              <div className="rounded-[20px] overflow-hidden border-t-4" style={{ borderColor: mod.accent, background: '#111118' }}>
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <p className="text-white font-medium text-sm">{video.title}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Action step */}
          <div className="my-12 rounded-[20px] p-8 gold-gradient">
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#0A0A0F] mb-4">⚡ Action Step</h3>
            <p className="text-[#0A0A0F] font-medium text-lg">{content.actionStep}</p>
          </div>

          {/* Mark complete */}
          <div className="text-center py-8">
            {isComplete ? (
              <div className="inline-flex items-center gap-3 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-full px-8 py-4">
                <span className="text-[#22C55E] text-2xl">✓</span>
                <span className="text-[#22C55E] font-bold text-lg">Module Complete</span>
              </div>
            ) : (
              <motion.button
                onClick={handleComplete}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="shimmer-btn text-[#0A0A0F] font-bold rounded-full px-12 py-5 text-xl cursor-pointer"
              >
                Mark Module Complete ✓
              </motion.button>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center py-8 border-t border-white/5 mt-8">
            {moduleNumber > 1 ? (
              <Link href={`/course/${moduleNumber - 1}?token=${token}`} className="text-[#A0A0B0] hover:text-[#F5C518] transition">
                ← Previous Module
              </Link>
            ) : <div />}
            {moduleNumber < 9 ? (
              <Link href={`/course/${moduleNumber + 1}?token=${token}`} className="text-[#F5C518] font-medium hover:text-[#E8A800] transition">
                Next Module →
              </Link>
            ) : (
              <Link href={`/course?token=${token}`} className="text-[#F5C518] font-medium hover:text-[#E8A800] transition">
                Back to Dashboard →
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 md:hidden" />}
    </div>
  );
}

export default function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-8 h-8 border-2 border-[#F5C518] border-t-transparent rounded-full" />
      </div>
    }>
      <ModulePageInner params={params} />
    </Suspense>
  );
}
