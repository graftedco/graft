'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import GoldParticles from '@/components/GoldParticles';
import { staticReviews } from '@/lib/reviews-data';

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  );
}

function CheckoutButton({ text, className = '' }: { text: string; className?: string }) {
  const [loading, setLoading] = useState(false);
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  };
  return (
    <motion.button
      onClick={handleCheckout}
      disabled={loading}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`shimmer-btn text-[#0A0A0F] font-bold rounded-full px-8 py-4 text-lg cursor-pointer disabled:opacity-70 ${className}`}
    >
      {loading ? 'Redirecting...' : text}
    </motion.button>
  );
}

/* ──────────── SECTION 1: NAV ──────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0A0F]/95 backdrop-blur-md' : 'bg-[#0A0A0F]'}`} style={{ borderBottom: '1px solid rgba(245,197,24,0.15)' }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-[family-name:var(--font-playfair)] text-[28px] font-bold gold-text-gradient">GRAFT</span>
        <CheckoutButton text="Get Access — £59.99" className="!py-2.5 !px-6 !text-base" />
      </div>
    </nav>
  );
}

/* ──────────── SECTION 2: HERO ──────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0A0A0F] dot-grid-bg overflow-hidden pt-16">
      <GoldParticles />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-block mb-8">
          <span className="gold-gradient text-[#0A0A0F] font-bold px-6 py-2.5 rounded-full text-sm animate-pulse-glow inline-block">🔥 40% OFF — LIMITED TIME</span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="font-[family-name:var(--font-playfair)] text-[64px] md:text-[96px] font-bold text-white leading-none mb-6">
          GRAFT
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="text-[#F5C518] text-xl font-medium mb-4 font-[family-name:var(--font-inter)]">
          The Complete Ecommerce Blueprint
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-[#A0A0B0] text-base max-w-2xl mx-auto mb-10">
          Turn £59.99 into your first £1,000 online — including the AI automation secrets nobody else is teaching
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
          <CheckoutButton text="Get Instant Access — £59.99 →" />
          <p className="text-white/70 text-sm mt-4">🔒 Secure checkout · ✅ 30 day guarantee · ⚡ Instant delivery</p>
        </motion.div>
      </div>
      <motion.div className="absolute bottom-8 z-10 animate-bounce-arrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
      </motion.div>
    </section>
  );
}

/* ──────────── SECTION 3: PRODUCT ──────────── */
function ProductSection() {
  const checklist = [
    '9 Complete Modules Written In Full',
    'Video Lessons Embedded In Every Module',
    'Full Store Setup — Name, Theme, Pages, Settings, Everything',
    'Real £200 Budget Breakdown',
    'DSers Automation Complete Walkthrough',
    'Ali Reviews Setup Guide',
    'Viral Product Strategy + 5 Free Video Methods',
    'AI Tools That Save 10+ Hours Per Week',
    'The 90 Day Success Roadmap',
    'Lifetime Access — Revisit Anytime',
    '30 Day Money Back Guarantee',
  ];
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <FadeUp>
          <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-[20px] p-12 text-center border border-[#F5C518]/30 shadow-2xl aspect-square flex flex-col items-center justify-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-6xl font-bold gold-text-gradient mb-4">GRAFT</h2>
            <p className="text-white text-lg mb-6">The Complete Ecommerce Blueprint</p>
            <div className="flex items-center gap-1 justify-center">
              {[...Array(5)].map((_, i) => <span key={i} className="text-[#F5C518] text-2xl">★</span>)}
              <span className="text-[#A0A0B0] ml-2 text-sm">4.9 rating</span>
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#0A0A0F] mb-6">GRAFT — The Complete Ecommerce Blueprint</h2>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-[#A0A0B0] line-through text-xl">£99.99</span>
              <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">40% OFF</span>
            </div>
            <p className="text-[#0A0A0F] text-4xl font-bold mb-2">£59.99</p>
            <p className="text-[#A0A0B0] text-sm mb-8">One-time payment. Instant access. Lifetime access included.</p>

            <div className="space-y-4 mb-8 text-[#0A0A0F]">
              <p>This is the complete ecommerce system that took one person 4 months to figure out, compressed into a course you can finish in a week and implement immediately. Built specifically for UK beginners in 2026 who want to start an online business from their bedroom with no experience and no large budget.</p>
              <p>You get 9 complete modules with embedded video lessons, a full store setup guide covering every single click, a real £200 budget breakdown, DSers automation walkthrough, Ali Reviews setup, a viral product strategy with 5 free video methods, AI automation secrets that save 10+ hours per week, and lifetime access to everything.</p>
              <p>Follow this system step by step and reach where most dropshippers take 4 months to get — in 4 to 6 weeks instead. This is not theory. This is the exact blueprint that works right now.</p>
            </div>

            <div className="space-y-3 mb-8">
              {checklist.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#F5C518] text-xl mt-0.5">✅</span>
                  <span className="text-[#0A0A0F]">{item}</span>
                </div>
              ))}
            </div>

            <CheckoutButton text="Yes — I Want This For £59.99 →" className="w-full text-center" />
            <p className="text-[#A0A0B0] text-sm text-center mt-3">🔒 Secured by Stripe · Instant access after payment</p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ──────────── SECTION 4: WHY CHOOSE US ──────────── */
function WhyChooseUs() {
  const rows = [
    { feature: 'AI Automation Included', us: true, others: false },
    { feature: 'Step By Step Guide With Videos', us: true, others: false },
    { feature: 'Winning Products Guide', us: true, others: false },
    { feature: 'Outdated Generic Advice', us: false, others: true },
  ];
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeUp>
          <h2 className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#0A0A0F] text-center mb-16">Why Choose Us?</h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="rounded-[20px] overflow-hidden border border-[#F5C518]/30 shadow-lg">
            <div className="grid grid-cols-3">
              <div className="bg-[#0A0A0F] p-4" />
              <div className="bg-[#0A0A0F] p-4 text-center"><span className="text-white font-bold text-lg">Our Course</span></div>
              <div className="bg-gray-100 p-4 text-center"><span className="text-[#0A0A0F] font-bold text-lg">Others</span></div>
            </div>
            {rows.map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-t border-gray-200">
                <div className="bg-[#0A0A0F] p-5 flex items-center"><span className="text-white font-semibold">{row.feature}</span></div>
                <div className="bg-white p-5 flex items-center justify-center">
                  <span className={`text-3xl ${row.us ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>{row.us ? '✅' : '❌'}</span>
                </div>
                <div className="bg-gray-50 p-5 flex items-center justify-center">
                  <span className={`text-3xl ${row.others ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>{row.others ? '✅' : '❌'}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[#F5C518] font-semibold mt-8 text-lg">What took us 4 months — learn in 4 weeks.</p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ──────────── SECTION 5: FAQ ──────────── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: 'When will I receive the course?', a: 'Instantly. Within 60 seconds of payment you will receive an email with your unique access link. No waiting. No manual processing.' },
    { q: 'Is this suitable for complete beginners?', a: 'Yes. Every module assumes zero knowledge. If you can use Instagram you can follow this course.' },
    { q: 'What if it does not work for me?', a: 'Full 30 day money back guarantee. Email us and we refund you completely. No questions.' },
  ];
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <h2 className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#0A0A0F] text-center mb-12">Frequently Asked Questions</h2>
        </FadeUp>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div className="border border-gray-200 rounded-2xl overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left cursor-pointer bg-white">
                  <span className="text-[#0A0A0F] font-semibold text-lg">{faq.q}</span>
                  <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-[#F5C518] text-2xl ml-4 flex-shrink-0">▼</motion.span>
                </button>
                <motion.div initial={false} animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden bg-white">
                  <p className="px-6 pb-6 text-[#666]">{faq.a}</p>
                </motion.div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────── SECTION 6: REVIEWS CAROUSEL ──────────── */
function ReviewCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let pos = 0;
    const speed = 0.5;
    function scroll() {
      pos += speed;
      if (pos >= el!.scrollWidth / 2) pos = 0;
      el!.scrollLeft = pos;
      animId = requestAnimationFrame(scroll);
    }
    animId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animId);
  }, []);

  const doubled = [...staticReviews, ...staticReviews];

  return (
    <section className="bg-[#0A0A0F] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <FadeUp>
          <h2 className="font-[family-name:var(--font-playfair)] text-5xl font-bold gold-text-gradient mb-4">WHAT OUR CUSTOMERS ARE SAYING</h2>
          <p className="text-[#A0A0B0]">Verified purchases. Real results.</p>
        </FadeUp>
      </div>
      <div ref={scrollRef} className="flex gap-6 overflow-hidden cursor-grab px-6" style={{ scrollbarWidth: 'none' }}>
        {doubled.map((r, i) => (
          <div key={i} className="glassmorphism rounded-[20px] p-6 min-w-[300px] max-w-[300px] flex-shrink-0 border-t-[3px] border-t-[#F5C518]">
            <div className="flex gap-0.5 mb-3">{[...Array(r.rating)].map((_, j) => <span key={j} className="text-[#F5C518]">★</span>)}{[...Array(5 - r.rating)].map((_, j) => <span key={j} className="text-gray-600">★</span>)}</div>
            <p className="text-white/90 text-sm mb-4 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
            <p className="text-[#F5C518] font-bold text-sm">{r.name}</p>
            <p className="text-[#A0A0B0] text-xs">{r.location} · Verified Purchase ✓</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────── SECTION 7: REVIEWS GRID ──────────── */
function ReviewGrid() {
  return (
    <section className="bg-[#0A0A0F] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {staticReviews.map((r, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <motion.div whileHover={{ y: -6 }} className="glassmorphism rounded-[20px] p-6 border-t-[3px] border-t-[#F5C518]">
                <div className="flex gap-0.5 mb-3">{[...Array(r.rating)].map((_, j) => <span key={j} className="text-[#F5C518]">★</span>)}{[...Array(5 - r.rating)].map((_, j) => <span key={j} className="text-gray-600">★</span>)}</div>
                <p className="text-white/90 text-sm mb-4 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[#F5C518] font-bold text-sm">{r.name}</p>
                    <p className="text-[#A0A0B0] text-xs">{r.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#A0A0B0] text-xs">Verified Purchase ✓</p>
                    <p className="text-[#A0A0B0] text-xs">{r.date}</p>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────── SECTION 8: REVIEW COLLECTION ──────────── */
function ReviewForm() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!name || !rating || text.length < 50) {
      setError('Please fill all fields (review must be at least 50 characters)');
      return;
    }
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, text }),
      });
      if (res.ok) setSubmitted(true);
      else setError('Failed to submit. Please try again.');
    } catch {
      setError('Failed to submit. Please try again.');
    }
  };

  if (submitted) {
    return (
      <section className="bg-[#0A0A0F] py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold gold-text-gradient mb-4">Thank You!</h2>
          <p className="text-[#A0A0B0]">Your review has been submitted and is pending approval.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#0A0A0F] py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <FadeUp>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold gold-text-gradient text-center mb-2">Enjoyed The Course?</h2>
          <p className="text-[#A0A0B0] text-center mb-10">Share your experience and help others make the same decision you did.</p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="glassmorphism rounded-[20px] p-8 space-y-6">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Your Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#F5C518] focus:outline-none transition" placeholder="Enter your name" />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)} onClick={() => setRating(star)} className="text-3xl cursor-pointer transition-transform hover:scale-110">
                    <span className={star <= (hover || rating) ? 'text-[#F5C518]' : 'text-gray-600'}>★</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Your Review</label>
              <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#F5C518] focus:outline-none transition resize-none" placeholder="Tell us about your experience (minimum 50 characters)" />
              <p className="text-[#A0A0B0] text-xs mt-1">{text.length}/50 minimum characters</p>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <motion.button onClick={submit} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="shimmer-btn text-[#0A0A0F] font-bold rounded-full px-8 py-4 w-full cursor-pointer">
              Submit Review
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ──────────── SECTION 9: FINAL CTA ──────────── */
function FinalCTA() {
  return (
    <section className="bg-[#0A0A0F] py-16 px-6 border-t border-[#F5C518]/10">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[#F5C518] font-semibold text-lg text-center md:text-left">⚡ Limited spots at this price — grab GRAFT for £59.99 before it goes up</p>
        <CheckoutButton text="Get Access Now →" className="!py-3 !px-8 whitespace-nowrap" />
      </div>
    </section>
  );
}

/* ──────────── SECTION 10: FOOTER ──────────── */
function Footer() {
  return (
    <footer className="bg-[#0A0A0F] py-16 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto text-center space-y-8">
        <div>
          <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-bold gold-text-gradient mb-2">GRAFT</h3>
          <p className="text-[#A0A0B0]">Built different. Earned properly.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <a href="/privacy" className="text-[#A0A0B0] hover:text-[#F5C518] transition">Privacy Policy</a>
          <a href="/terms" className="text-[#A0A0B0] hover:text-[#F5C518] transition">Terms of Service</a>
          <a href="/refund" className="text-[#A0A0B0] hover:text-[#F5C518] transition">Refund Policy</a>
          <a href="mailto:grafted.business@gmail.com" className="text-[#A0A0B0] hover:text-[#F5C518] transition">Contact Us</a>
        </div>
        <p className="text-[#A0A0B0] text-xs max-w-2xl mx-auto">© 2026 GRAFT. All rights reserved. Results are not guaranteed and vary by individual effort and market conditions.</p>
      </div>
    </footer>
  );
}

/* ──────────── MAIN PAGE ──────────── */
export default function SalesPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductSection />
      <WhyChooseUs />
      <FAQ />
      <ReviewCarousel />
      <ReviewGrid />
      <ReviewForm />
      <FinalCTA />
      <Footer />
    </main>
  );
}
