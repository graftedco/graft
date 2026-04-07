import Link from 'next/link';

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <nav className="bg-[#0A0A0F] border-b border-[#F5C518]/15 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-[family-name:var(--font-playfair)] text-[28px] font-bold gold-text-gradient">GRAFT</Link>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white mb-8">Refund Policy</h1>
        <div className="text-[#A0A0B0] space-y-6 text-base leading-relaxed">
          <p><strong className="text-white">Last updated:</strong> 1 January 2026</p>
          <p>At GRAFT, we are confident in the value of our course and want you to feel completely comfortable with your purchase. That is why we offer a straightforward 30-day money-back guarantee.</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">1. 30-Day Money-Back Guarantee</h2>
          <p>If you are not satisfied with the GRAFT course for any reason, you may request a full refund within 30 days of your purchase date. No questions asked. We believe that if our course does not meet your expectations, you deserve your money back.</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">2. How to Request a Refund</h2>
          <p>To request a refund, simply send an email to grafted.business@gmail.com with the subject line &quot;Refund Request&quot; and include the email address you used to make your purchase. We will process your refund within 5-10 business days. You will receive your refund to the original payment method used at checkout.</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">3. Refund Timeline</h2>
          <p>Once we receive your refund request, we will process it within 5 business days. Depending on your bank or card issuer, it may take an additional 5-10 business days for the refund to appear in your account. We will send you a confirmation email once the refund has been processed on our end.</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">4. After the 30-Day Period</h2>
          <p>Refund requests made after the 30-day guarantee period has expired will be considered on a case-by-case basis at our discretion. We encourage you to explore the course fully within the first 30 days to ensure it meets your needs.</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">5. Access After Refund</h2>
          <p>Upon processing a refund, your access to the GRAFT course will be revoked. Your unique access link will be deactivated and you will no longer be able to view the course content.</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">6. Your Consumer Rights</h2>
          <p>This refund policy does not affect your statutory rights under the Consumer Rights Act 2015 or any other applicable UK consumer protection legislation. Under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, you have the right to cancel your purchase within 14 days of the date of purchase for any reason. As digital content, once you begin accessing the course you acknowledge that you may lose this cancellation right, however our 30-day money-back guarantee provides you with protection that exceeds your statutory cancellation rights.</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">7. Chargebacks</h2>
          <p>We kindly ask that you contact us directly at grafted.business@gmail.com before initiating a chargeback with your bank or credit card company. We are committed to resolving any issues promptly and a direct refund through us is faster and simpler for both parties. Initiating a chargeback without first contacting us may result in delays in processing your refund.</p>

          <h2 className="text-white text-2xl font-[family-name:var(--font-playfair)] font-bold mt-8">8. Contact Us</h2>
          <p>If you have any questions about our refund policy or need assistance with a refund request, please contact us at: grafted.business@gmail.com. We aim to respond to all enquiries within 24 hours during business days.</p>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5">
          <Link href="/" className="text-[#F5C518] hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
