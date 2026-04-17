export default function SuccessPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ maxWidth: 600, textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-playfair)', color: '#D4AF37', fontSize: 48, fontWeight: 800, letterSpacing: 2, marginBottom: 24 }}>
          GRAFT
        </div>
        <h1 style={{ color: '#D4AF37', fontSize: 32, fontFamily: 'var(--font-playfair)', marginBottom: 20 }}>
          Thank you for your purchase.
        </h1>
        <p style={{ color: '#AAAAAA', fontSize: 18, lineHeight: 1.7, marginBottom: 32 }}>
          Check your email for your login details and course access.
        </p>
        <a href="/login" className="gold-btn">Go to Login</a>
        <p style={{ color: '#666', fontSize: 13, marginTop: 24 }}>
          Can&apos;t find the email? Check your spam folder or email{' '}
          <a href="mailto:grafted.business@gmail.com" style={{ color: '#D4AF37' }}>grafted.business@gmail.com</a>
        </p>
      </div>
    </main>
  );
}
