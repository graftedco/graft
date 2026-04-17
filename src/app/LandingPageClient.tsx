'use client';

import { useEffect, useRef, useState } from 'react';
import GoldParticles from '@/components/GoldParticles';
import type { Review } from '@/lib/reviews-data';

type AnsweredQuestion = {
  id: string;
  name: string;
  question: string;
  answer: string;
  answered_at: string;
};

const GOLD = '#D4AF37';

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < rating ? GOLD : '#333', fontSize: 18 }}>★</span>
      ))}
    </div>
  );
}

function Navbar() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: '#000000',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        height: 64,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 28,
            color: GOLD,
            textDecoration: 'none',
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          GRAFT
        </a>
        <a href="/api/checkout" className="gold-btn" style={{ padding: '10px 20px', fontSize: 15 }}>
          <span style={{ display: 'none' }} className="desktop-label">Get Access — £30</span>
          <span className="mobile-label">£30</span>
        </a>
      </div>
      <style>{`
        @media (min-width: 640px) {
          nav .mobile-label { display: none; }
          nav .desktop-label { display: inline !important; }
        }
      `}</style>
    </nav>
  );
}

function InivexBanner() {
  return (
    <section
      style={{
        background: '#000000',
        borderTop: `1px solid ${GOLD}`,
        borderBottom: `1px solid ${GOLD}`,
        padding: '20px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          flexWrap: 'wrap',
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{ color: GOLD, fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-inter)' }}>
            Check out our real dropshipping store
          </div>
          <div style={{ color: '#FFFFFF', fontSize: 16 }}>to see what yours could be like</div>
        </div>
        <a href="https://inivex.com" target="_blank" rel="noopener noreferrer" className="gold-btn">
          Visit INIVEX
        </a>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        background: '#000000',
        padding: '100px 24px 120px',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <GoldParticles />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1000, margin: '0 auto' }}>
        <span
          style={{
            display: 'inline-block',
            background: GOLD,
            color: '#000',
            fontWeight: 700,
            padding: '8px 20px',
            borderRadius: 50,
            fontSize: 13,
            letterSpacing: 0.5,
            marginBottom: 28,
          }}
        >
          50% OFF — LIMITED TIME
        </span>

        <h1
          style={{
            fontFamily: 'var(--font-playfair)',
            color: '#FFFFFF',
            fontWeight: 900,
            lineHeight: 1,
            margin: 0,
          }}
          className="hero-title"
        >
          GRAFT
        </h1>

        <p
          style={{
            color: GOLD,
            fontFamily: 'var(--font-playfair)',
            fontSize: 24,
            margin: '16px 0 12px',
            fontWeight: 600,
          }}
        >
          The Complete Ecommerce Blueprint
        </p>

        <p style={{ color: '#AAAAAA', fontSize: 18, margin: '0 0 36px', maxWidth: 640, marginInline: 'auto' }}>
          What took us 2 years explained in less than 4 weeks
        </p>

        <a href="/api/checkout" className="gold-btn" style={{ fontSize: 18, padding: '18px 36px' }}>
          Get Instant Access — £30
        </a>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 28,
            marginTop: 28,
            flexWrap: 'wrap',
            color: '#AAAAAA',
            fontSize: 14,
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={GOLD}><path d="M12 1a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V11a2 2 0 0 0-2-2h-2V6a5 5 0 0 0-5-5zm-3 8V6a3 3 0 0 1 6 0v3H9z" /></svg>
            Secure checkout
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={GOLD}><path d="M12 2L4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3z" /></svg>
            30 day guarantee
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill={GOLD}><path d="M13 2L3 14h7v8l10-12h-7V2z" /></svg>
            Instant delivery
          </span>
        </div>
      </div>
      <style>{`
        .hero-title { font-size: 48px; }
        @media (min-width: 768px) { .hero-title { font-size: 80px; } }
      `}</style>
    </section>
  );
}

function PurchaseCard() {
  const checklist = [
    '9 Complete Modules Written In Full',
    'Video Lessons Embedded In Every Module',
    'Full Store Setup — Name Theme Pages Settings Everything',
    'Real Budget Breakdown',
    'DSers Automation Complete Walkthrough',
    'Ali Reviews Setup',
    'Viral Product Strategy With 5 Free Video Methods',
    'Mindset And 90 Day Action Plan',
    'Lifetime Access To Everything',
  ];
  return (
    <section className="section">
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          background: '#111111',
          border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: 16,
          padding: 48,
        }}
        className="purchase-card"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 32,
            alignItems: 'center',
          }}
          className="pc-grid"
        >
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'var(--font-playfair)',
                color: GOLD,
                fontSize: 64,
                fontWeight: 900,
                letterSpacing: 2,
                lineHeight: 1,
              }}
            >
              GRAFT
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
              <Stars rating={5} />
            </div>
            <div style={{ color: GOLD, fontSize: 14, marginTop: 6 }}>4.9 rating</div>
          </div>

          <div>
            <h2 style={{ fontFamily: 'var(--font-playfair)', color: '#FFFFFF', fontSize: 32, fontWeight: 700, marginBottom: 12 }}>
              GRAFT — The Complete Ecommerce Blueprint
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <span style={{ color: '#666', textDecoration: 'line-through', fontSize: 18 }}>£60.00</span>
              <span style={{ background: '#CC0000', color: '#FFFFFF', padding: '4px 10px', borderRadius: 4, fontSize: 12, fontWeight: 700 }}>
                50% OFF
              </span>
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 48, fontWeight: 900, lineHeight: 1, marginBottom: 8 }}>£30</div>
            <div style={{ color: GOLD, fontSize: 14, marginBottom: 24 }}>
              One-time payment. Instant access. Lifetime access included.
            </div>

            <p style={{ color: '#AAAAAA', fontSize: 16, lineHeight: 1.7, marginBottom: 16 }}>
              This is the complete ecommerce system that took us 2 years to figure out, compressed into a course you can
              consume in a week and implement immediately. Built specifically for beginners in 2026 who want to start an
              online business from their bedroom with no experience and no large budget.
            </p>
            <p style={{ color: '#AAAAAA', fontSize: 16, lineHeight: 1.7, marginBottom: 16 }}>
              You get 9 complete modules with embedded video lessons, a full store setup guide covering every single
              click, a real budget breakdown, DSers automation walkthrough, Ali Reviews setup, a viral product strategy
              with 5 free video methods, and lifetime access to everything.
            </p>
            <p style={{ color: '#AAAAAA', fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
              Follow this system step by step and reach where most dropshippers take 2 years to get — in 4 to 6 weeks
              instead. This is not theory. This is the exact blueprint that works right now.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px' }}>
              {checklist.map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={GOLD} style={{ marginTop: 3, flexShrink: 0 }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <span style={{ color: '#FFFFFF', fontSize: 15 }}>{item}</span>
                </li>
              ))}
            </ul>

            <a href="/api/checkout" className="gold-btn" style={{ display: 'block', textAlign: 'center', fontSize: 18 }}>
              Get Instant Access — £30
            </a>
          </div>
        </div>
      </div>
      <style>{`
        @media (min-width: 768px) {
          .pc-grid { grid-template-columns: 1fr 2fr !important; gap: 48px !important; }
        }
        @media (max-width: 600px) {
          .purchase-card { padding: 28px !important; }
        }
      `}</style>
    </section>
  );
}

function WhyChooseUs() {
  const rows: { feature: string; us: boolean; others: boolean }[] = [
    { feature: 'AI Automation Included', us: true, others: false },
    { feature: 'Step By Step Guide With Videos', us: true, others: false },
    { feature: 'Winning Products Guide', us: true, others: false },
    { feature: 'Outdated Generic Advice', us: false, others: true },
  ];
  const Tick = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#22C55E"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
  );
  const Cross = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#EF4444"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
  );
  return (
    <section className="section">
      <div className="container-1200">
        <h2 className="heading-xl" style={{ marginBottom: 48 }}>Why Choose Us</h2>
        <div
          style={{
            maxWidth: 800,
            margin: '0 auto',
            background: '#111111',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            <div style={{ background: '#0D0D0D', padding: 16, color: '#FFFFFF', fontWeight: 700 }}>Feature</div>
            <div style={{ background: GOLD, padding: 16, color: '#000', fontWeight: 700, textAlign: 'center' }}>Our Course</div>
            <div style={{ background: '#333333', padding: 16, color: '#FFFFFF', fontWeight: 700, textAlign: 'center' }}>Others</div>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.feature}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                background: i % 2 === 0 ? '#0D0D0D' : '#111111',
              }}
            >
              <div style={{ padding: '18px 16px', color: '#FFFFFF', fontSize: 15 }}>{r.feature}</div>
              <div style={{ padding: '18px 16px', display: 'flex', justifyContent: 'center' }}>{r.us ? <Tick /> : <Cross />}</div>
              <div style={{ padding: '18px 16px', display: 'flex', justifyContent: 'center' }}>{r.others ? <Tick /> : <Cross />}</div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: GOLD, fontStyle: 'italic', fontSize: 18, marginTop: 28 }}>
          What took us 2 years explained in less than 4 weeks.
        </p>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: 'When will I receive the course?',
      a: 'Instantly. As soon as your payment is confirmed you receive an email with your login details and full course access.',
    },
    {
      q: 'Is this suitable for complete beginners?',
      a: 'Yes. This course starts from absolute zero. You do not need any experience, any technical knowledge, or a large budget to start.',
    },
    {
      q: 'What if it does not work for me?',
      a: 'We offer a full 30 day money back guarantee. If you follow the course and it does not work for you, email us and we refund you completely, no questions asked.',
    },
    {
      q: 'How long does the course take to complete?',
      a: 'You can consume all 9 modules in a weekend. Most students complete the full course in 3 to 5 days and have their store live within 2 weeks.',
    },
    {
      q: 'Do I need a big budget to start?',
      a: 'No. You can start with as little as £100. The course shows you exactly how to set up your store for under £50 in the first month using free trials and the cheapest tools available.',
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section">
      <div className="container-1200" style={{ maxWidth: 800 }}>
        <h2 className="heading-xl" style={{ marginBottom: 40 }}>Frequently Asked Questions</h2>
        <div>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                style={{
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: 8,
                  marginBottom: 12,
                  overflow: 'hidden',
                  background: '#0D0D0D',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 0,
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontWeight: 600,
                    padding: 20,
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  <span>{item.q}</span>
                  <span style={{ color: GOLD, fontSize: 22, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s ease' }}>+</span>
                </button>
                <div className={`faq-content ${isOpen ? 'open' : ''}`}>
                  <div style={{ color: '#AAAAAA', fontSize: 16, lineHeight: 1.7 }}>{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OurStory() {
  return (
    <section style={{ background: '#000000', padding: '80px 24px', borderTop: '1px solid rgba(212,175,55,0.3)' }}>
      <div className="container-1200" style={{ maxWidth: 800 }}>
        <h2 style={{ fontFamily: 'var(--font-playfair)', color: GOLD, fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 32 }}>
          Our Story
        </h2>
        <p style={{ color: '#AAAAAA', fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
          Two years ago we started from scratch with no system, no mentor, and no idea what we were doing. We made every
          mistake possible. We wasted months testing products that never sold. We spent money on ads before we had any
          proof anything worked. We bought tools we did not need. We nearly quit three times.
        </p>
        <p style={{ color: '#AAAAAA', fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
          Then something changed. We stopped guessing and built a proper repeatable system. We found our winning products.
          We cracked the content strategy. We set up the automation. And in the 6 months that followed we made over
          £100,000. Not from luck. From a system that actually works.
        </p>
        <p style={{ color: '#AAAAAA', fontSize: 16, lineHeight: 1.8 }}>
          We built GRAFT because we could not find a course that told us exactly what to do without wasting our time.
          Everything in this course is what we wish we had been told on day one. No fluff. No gatekeeping. Just the exact
          blueprint. We built it so you never have to waste 2 years the way we did.
        </p>
      </div>
    </section>
  );
}

function Reviews({ reviews }: { reviews: Review[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = now - last;
      last = now;
      if (!paused) {
        el.scrollLeft += (dt / 1000) * 40;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const doubled = [...reviews, ...reviews];

  return (
    <section className="section" style={{ overflow: 'hidden' }}>
      <div className="container-1200" style={{ marginBottom: 36, textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair)', color: GOLD, fontSize: 40, fontWeight: 800, marginBottom: 8 }}>
          WHAT OUR CUSTOMERS ARE SAYING
        </h2>
        <p style={{ color: '#AAAAAA', fontSize: 16 }}>Verified purchases. Real results.</p>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          display: 'flex',
          gap: 20,
          overflowX: 'auto',
          scrollBehavior: 'auto',
          padding: '0 24px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="review-scroller"
      >
        {doubled.map((r, i) => (
          <div
            key={i}
            style={{
              background: '#111111',
              borderRadius: 12,
              padding: 32,
              minWidth: 350,
              maxWidth: 350,
              flexShrink: 0,
            }}
          >
            <Stars rating={r.rating} />
            <p style={{ color: '#FFFFFF', fontSize: 15, lineHeight: 1.6, marginTop: 16, marginBottom: 16 }}>
              &ldquo;{r.text}&rdquo;
            </p>
            <div style={{ color: GOLD, fontSize: 16, fontWeight: 600 }}>{r.name}</div>
            <div style={{ color: '#AAAAAA', fontSize: 14 }}>
              {r.location} · Verified Purchase ✓
            </div>
            <div style={{ color: '#666', fontSize: 14, marginTop: 4 }}>{r.date}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 48 }}>
        <button onClick={() => setShowAll((v) => !v)} className="gold-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          {showAll ? 'Hide Reviews' : 'See All Reviews'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#000" style={{ transform: showAll ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>
      </div>

      {showAll && (
        <div className="container-1200" style={{ marginTop: 48 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 20,
            }}
          >
            {reviews.map((r, i) => (
              <div key={i} style={{ background: '#111111', borderRadius: 12, padding: 28 }}>
                <Stars rating={r.rating} />
                <p style={{ color: '#FFFFFF', fontSize: 15, lineHeight: 1.6, marginTop: 14, marginBottom: 14 }}>
                  &ldquo;{r.text}&rdquo;
                </p>
                <div style={{ color: GOLD, fontSize: 16, fontWeight: 600 }}>{r.name}</div>
                <div style={{ color: '#AAAAAA', fontSize: 14 }}>
                  {r.location} · Verified Purchase ✓
                </div>
                <div style={{ color: '#666', fontSize: 14, marginTop: 4 }}>{r.date}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .review-scroller::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}

function ReviewForm() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError('');
    if (!name || !rating || text.length < 50) {
      setError('Please fill all fields. Review must be at least 50 characters.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, rating, review_text: text }),
      });
      if (res.ok) setSubmitted(true);
      else setError('Something went wrong. Please try again.');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair)', color: '#FFFFFF', fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 32 }}>
          Share Your Experience
        </h2>
        <div style={{ background: '#111111', borderRadius: 12, padding: 40 }}>
          {submitted ? (
            <p style={{ color: GOLD, textAlign: 'center', fontSize: 18 }}>Thank you for your review.</p>
          ) : (
            <>
              <label style={{ color: '#FFFFFF', fontSize: 14, display: 'block', marginBottom: 8 }}>Your Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ marginBottom: 20 }} />

              <label style={{ color: '#FFFFFF', fontSize: 14, display: 'block', marginBottom: 8 }}>Rating</label>
              <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onMouseEnter={() => setHover(s)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(s)}
                    style={{ background: 'transparent', border: 0, fontSize: 28, cursor: 'pointer', padding: 0, color: s <= (hover || rating) ? GOLD : '#444' }}
                  >
                    ★
                  </button>
                ))}
              </div>

              <label style={{ color: '#FFFFFF', fontSize: 14, display: 'block', marginBottom: 8 }}>Your Review</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ minHeight: 120, resize: 'vertical', marginBottom: 6 }}
              />
              <div style={{ color: text.length >= 50 ? GOLD : '#AAAAAA', fontSize: 12, marginBottom: 18 }}>
                {text.length} / 50 minimum characters
              </div>
              {error && <div style={{ color: '#EF4444', fontSize: 14, marginBottom: 12 }}>{error}</div>}
              <button onClick={submit} disabled={loading} className="gold-btn" style={{ width: '100%' }}>
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function QuestionsSection({ answered }: { answered: AnsweredQuestion[] }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    setError('');
    if (!name || !email || !question) {
      setError('Please fill all fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, question }),
      });
      if (res.ok) setSubmitted(true);
      else setError('Something went wrong. Please try again.');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair)', color: '#FFFFFF', fontSize: 32, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
          Got A Question
        </h2>
        <p style={{ color: '#AAAAAA', fontSize: 16, textAlign: 'center', marginBottom: 32 }}>
          Ask anything. We answer publicly so everyone benefits.
        </p>

        <div style={{ background: '#111111', borderRadius: 12, padding: 40, marginBottom: 48 }}>
          {submitted ? (
            <p style={{ color: GOLD, textAlign: 'center', fontSize: 16 }}>
              Your question has been submitted. We will answer it publicly soon.
            </p>
          ) : (
            <>
              <label style={{ color: '#FFFFFF', fontSize: 14, display: 'block', marginBottom: 8 }}>Your Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ marginBottom: 20 }} />
              <label style={{ color: '#FFFFFF', fontSize: 14, display: 'block', marginBottom: 8 }}>Your Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: 20 }} />
              <label style={{ color: '#FFFFFF', fontSize: 14, display: 'block', marginBottom: 8 }}>Your Question</label>
              <textarea value={question} onChange={(e) => setQuestion(e.target.value)} style={{ minHeight: 120, resize: 'vertical', marginBottom: 18 }} />
              {error && <div style={{ color: '#EF4444', fontSize: 14, marginBottom: 12 }}>{error}</div>}
              <button onClick={submit} disabled={loading} className="gold-btn" style={{ width: '100%' }}>
                {loading ? 'Sending...' : 'Send Question'}
              </button>
            </>
          )}
        </div>

        {answered.length > 0 && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-playfair)', color: GOLD, fontSize: 24, marginBottom: 20 }}>Answered Questions</h3>
            {answered.map((q) => (
              <div key={q.id} style={{ background: '#111111', borderRadius: 12, padding: 24, marginBottom: 16 }}>
                <div style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 500, marginBottom: 12 }}>{q.question}</div>
                <div style={{ color: GOLD, fontSize: 14, fontWeight: 600, marginBottom: 4 }}>GRAFT Team</div>
                <div style={{ color: '#AAAAAA', fontSize: 15, lineHeight: 1.6, marginBottom: 10 }}>{q.answer}</div>
                <div style={{ color: '#666', fontSize: 12 }}>
                  {new Date(q.answered_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section style={{ background: '#000', padding: '80px 24px', textAlign: 'center' }}>
      <p style={{ color: GOLD, fontSize: 20, marginBottom: 24 }}>
        Limited spots at this price — grab GRAFT for £30 before it goes up.
      </p>
      <a href="/api/checkout" className="gold-btn" style={{ fontSize: 18 }}>Get Access Now</a>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#000', padding: '60px 24px', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
      <div className="container-1200" style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-playfair)', color: GOLD, fontSize: 32, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>
          GRAFT
        </div>
        <div style={{ color: '#AAAAAA', fontSize: 16, marginBottom: 20 }}>Built different. Earned properly.</div>
        <div style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>© 2026 GRAFT. All rights reserved.</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
          <a href="/privacy" style={{ color: '#AAAAAA', textDecoration: 'none' }} className="footer-link">Privacy Policy</a>
          <a href="/terms" style={{ color: '#AAAAAA', textDecoration: 'none' }} className="footer-link">Terms of Service</a>
          <a href="/refund" style={{ color: '#AAAAAA', textDecoration: 'none' }} className="footer-link">Refund Policy</a>
          <a href="mailto:grafted.business@gmail.com" style={{ color: '#AAAAAA', textDecoration: 'none' }} className="footer-link">Contact Us</a>
        </div>
        <div style={{ color: '#666', fontSize: 12, maxWidth: 700, margin: '0 auto' }}>
          Results are not guaranteed and vary by individual effort and market conditions.
        </div>
      </div>
      <style>{`.footer-link:hover { color: ${GOLD} !important; }`}</style>
    </footer>
  );
}

export default function LandingPageClient({
  reviews,
  answered,
}: {
  reviews: Review[];
  answered: AnsweredQuestion[];
}) {
  return (
    <main style={{ background: '#000' }}>
      <Navbar />
      <InivexBanner />
      <Hero />
      <PurchaseCard />
      <WhyChooseUs />
      <FAQ />
      <OurStory />
      <Reviews reviews={reviews} />
      <ReviewForm />
      <QuestionsSection answered={answered} />
      <BottomCTA />
      <Footer />
    </main>
  );
}
