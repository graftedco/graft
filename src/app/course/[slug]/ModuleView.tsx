'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import VideoPlayer from '@/components/VideoPlayer';
import type { ModuleData } from '@/lib/modules-data';
import type { ModuleContent } from '@/lib/module-content';

const GOLD = '#D4AF37';

type Props = {
  mod: ModuleData;
  content: ModuleContent;
  prev?: ModuleData;
  next?: ModuleData;
};

export default function ModuleView({ mod, content, prev, next }: Props) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.email) {
        router.replace('/login');
        return;
      }
      const res = await fetch('/api/check-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session.user.email }),
      });
      const { hasAccess } = await res.json();
      if (!hasAccess) {
        router.replace('/login');
        return;
      }
      setReady(true);
    })();
  }, [router]);

  if (!ready) {
    return (
      <main style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: GOLD }}>Loading...</div>
      </main>
    );
  }

  const paragraphStyle: React.CSSProperties = {
    color: '#AAAAAA',
    fontSize: 16,
    lineHeight: 1.8,
    maxWidth: 800,
    margin: '0 auto 28px',
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', padding: '32px 24px 80px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ marginBottom: 28 }}>
          <Link href="/course" style={{ color: GOLD, textDecoration: 'none', fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span>←</span> Back to Course
          </Link>
        </div>

        <h1 style={{ fontFamily: 'var(--font-playfair)', color: GOLD, fontSize: 36, fontWeight: 800, textAlign: 'center', marginBottom: 40, lineHeight: 1.2 }}>
          {content.title}
        </h1>

        <p style={paragraphStyle}>{content.intro}</p>
        <p style={paragraphStyle}>{content.video1Guide}</p>
        <p style={paragraphStyle}>{content.video2Guide}</p>

        <div style={{ maxWidth: 900, margin: '40px auto' }}>
          <VideoPlayer videoId={mod.videos[0].id} title={mod.videos[0].title} />
        </div>

        <div style={{ maxWidth: 800, margin: '40px auto' }}>
          <h2 style={{ fontFamily: 'var(--font-playfair)', color: '#FFFFFF', fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
            Key Takeaways
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {content.takeaways.map((t, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: GOLD, marginTop: 8, flexShrink: 0 }} />
                <span style={{ color: '#FFFFFF', fontSize: 15, lineHeight: 1.6 }}>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ maxWidth: 900, margin: '40px auto' }}>
          <VideoPlayer videoId={mod.videos[1].id} title={mod.videos[1].title} />
        </div>

        <div
          style={{
            maxWidth: 800,
            margin: '48px auto 0',
            background: '#111111',
            border: `2px solid ${GOLD}`,
            borderRadius: 12,
            padding: 32,
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-playfair)', color: GOLD, fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
            Your Action Step
          </h3>
          <p style={{ color: '#FFFFFF', fontSize: 16, lineHeight: 1.7 }}>{content.actionStep}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 800, margin: '48px auto 0', gap: 16, flexWrap: 'wrap' }}>
          <div>
            {prev && (
              <Link href={`/course/${prev.slug}`} className="gold-outline-btn">
                ← Previous Module
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link href={`/course/${next.slug}`} className="gold-btn">
                Next Module →
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
