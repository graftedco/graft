'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { modules } from '@/lib/modules-data';

const GOLD = '#D4AF37';

export default function CourseDashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.email) {
        router.replace('/login');
        return;
      }
      const userEmail = session.user.email;
      const res = await fetch('/api/check-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });
      const { hasAccess } = await res.json();
      if (!hasAccess) {
        router.replace('/login');
        return;
      }
      setEmail(userEmail);
      setReady(true);
    })();
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  if (!ready) {
    return (
      <main style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: GOLD }}>Loading your course...</div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#000' }}>
      <nav style={{ position: 'sticky', top: 0, background: '#000', borderBottom: `1px solid rgba(212,175,55,0.2)`, padding: '16px 24px', zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/course" style={{ fontFamily: 'var(--font-playfair)', color: GOLD, fontSize: 28, fontWeight: 700, textDecoration: 'none' }}>GRAFT</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ color: '#AAAAAA', fontSize: 13 }}>{email}</span>
            <button onClick={logout} className="gold-outline-btn" style={{ padding: '8px 16px', fontSize: 13 }}>Logout</button>
          </div>
        </div>
      </nav>

      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--font-playfair)', color: GOLD, fontSize: 40, fontWeight: 800, textAlign: 'center', marginBottom: 12 }}>
            Your Course
          </h1>
          <p style={{ color: '#AAAAAA', textAlign: 'center', marginBottom: 48 }}>
            Work through each module in order. Come back any time.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {modules.map((mod) => (
              <Link key={mod.number} href={`/course/${mod.slug}`} className="module-card" style={{ display: 'block' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: GOLD, fontSize: 14, fontWeight: 600, marginBottom: 10, letterSpacing: 0.5 }}>
                      Module {mod.number}
                    </div>
                    <div style={{ fontFamily: 'var(--font-inter)', color: '#FFFFFF', fontSize: 20, fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>
                      {mod.title}
                    </div>
                    <div style={{ color: '#AAAAAA', fontSize: 14, lineHeight: 1.6 }}>{mod.description}</div>
                  </div>
                  <div style={{ color: GOLD, fontSize: 24, flexShrink: 0 }}>→</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
