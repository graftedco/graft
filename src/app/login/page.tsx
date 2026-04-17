'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/course');
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 420, width: '100%', background: '#111', borderRadius: 12, padding: 40, border: '1px solid rgba(212,175,55,0.2)' }}>
        <h1 style={{ fontFamily: 'var(--font-playfair)', color: '#D4AF37', fontSize: 36, fontWeight: 700, textAlign: 'center', marginBottom: 24 }}>GRAFT</h1>
        <h2 style={{ color: '#FFFFFF', fontSize: 20, textAlign: 'center', marginBottom: 24, fontFamily: 'var(--font-inter)' }}>Login to your course</h2>
        <form onSubmit={submit}>
          <label style={{ color: '#FFFFFF', fontSize: 14, display: 'block', marginBottom: 8 }}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginBottom: 16 }} />
          <label style={{ color: '#FFFFFF', fontSize: 14, display: 'block', marginBottom: 8 }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ marginBottom: 16 }} />
          {error && <div style={{ color: '#EF4444', fontSize: 14, marginBottom: 12 }}>{error}</div>}
          <button type="submit" disabled={loading} className="gold-btn" style={{ width: '100%' }}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p style={{ color: '#AAAAAA', fontSize: 13, textAlign: 'center', marginTop: 24 }}>
          Don&apos;t have access? <a href="/" style={{ color: '#D4AF37' }}>Get GRAFT for £30</a>
        </p>
      </div>
    </main>
  );
}
