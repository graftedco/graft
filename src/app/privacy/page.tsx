import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <nav className="bg-[#0A0A0F] border-b border-[#F5C518]/15 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-[family-name:var(--font-playfair)] text-[28px] font-bold gold-text-gradient">GRAFT</Link>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="text-[#A0A0B0] space-y-6 text-base leading-relaxed">
          <p><strong className="text-white">Last updated:</strong> 1 January 2026</p>
          <p><strong className="text-white">Data Controller:</strong> GRAFT (operated by Graft, United Kingdom). Contact: grafted.business@gmail.com</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">1. Information We Collect</h2>
          <p>When you purchase our course, we collect the following personal data: your email address, your name (as provided to Stripe during checkout), your payment information (processed securely by Stripe — we do not store card details), and your IP address and browser information (collected automatically).</p>
          <p>We may also collect information you voluntarily provide, such as when you submit a review or contact us via email.</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">2. How We Use Your Information</h2>
          <p>We use your personal data for the following purposes: to process your purchase and deliver course access, to send you your course access link via email, to provide customer support, to improve our products and services, and to comply with legal obligations.</p>
          <p>We process your data under the following lawful bases as defined by the UK General Data Protection Regulation (UK GDPR): performance of a contract (delivering the course you purchased), legitimate interests (improving our service and preventing fraud), and consent (where you have opted in to receive communications).</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">3. Data Sharing</h2>
          <p>We share your data with the following third-party service providers who assist us in operating our business: Stripe (payment processing — subject to Stripe&apos;s privacy policy), Supabase (database hosting — data stored securely), Resend (email delivery — for sending your course access link), and Vercel (website hosting).</p>
          <p>We do not sell, rent, or trade your personal information to any third parties for marketing purposes.</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">4. Data Retention</h2>
          <p>We retain your personal data for as long as your account is active or as needed to provide you with course access. Since we offer lifetime access, we retain purchase records indefinitely unless you request deletion. If you request deletion of your data, we will remove your personal information within 30 days, though we may retain certain records as required by law (such as financial transaction records for HMRC compliance, which we are required to keep for a minimum of 6 years).</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">5. Your Rights</h2>
          <p>Under the UK GDPR, you have the following rights: the right to access your personal data, the right to rectification of inaccurate data, the right to erasure (the right to be forgotten), the right to restrict processing, the right to data portability, the right to object to processing, and rights related to automated decision-making and profiling.</p>
          <p>To exercise any of these rights, please contact us at grafted.business@gmail.com. We will respond to your request within 30 days. If you are not satisfied with our response, you have the right to lodge a complaint with the Information Commissioner&apos;s Office (ICO) at ico.org.uk.</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">6. Cookies</h2>
          <p>Our website uses essential cookies that are necessary for the website to function properly. These include session cookies and authentication cookies. We do not use advertising or tracking cookies. You can control cookie settings through your browser preferences.</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">7. Security</h2>
          <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. All payment processing is handled by Stripe, which is PCI DSS Level 1 certified. Data transmission is encrypted using TLS/SSL protocols.</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">8. International Transfers</h2>
          <p>Some of our service providers may process data outside the United Kingdom. Where this occurs, we ensure that appropriate safeguards are in place, such as Standard Contractual Clauses approved by the Information Commissioner&apos;s Office, to protect your personal data.</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">9. Changes to This Policy</h2>
          <p>We may update this privacy policy from time to time. We will notify you of any material changes by posting the updated policy on our website with a revised date. Your continued use of our services after changes are posted constitutes your acceptance of the updated policy.</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">10. Contact Us</h2>
          <p>If you have any questions about this privacy policy or our data practices, please contact us at: grafted.business@gmail.com</p>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5">
          <Link href="/" className="text-[#F5C518] hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
