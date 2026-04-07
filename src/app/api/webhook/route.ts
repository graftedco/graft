import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getServiceSupabase } from '@/lib/supabase';
import { Resend } from 'resend';
import { v4 as uuidv4 } from 'uuid';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details?.email;

    if (!email) {
      console.error('No email in checkout session');
      return NextResponse.json({ error: 'No email' }, { status: 400 });
    }

    const accessToken = uuidv4();
    const supabase = getServiceSupabase();

    const { error: dbError } = await supabase.from('purchases').insert({
      email,
      access_token: accessToken,
      stripe_session_id: session.id,
      modules_completed: [],
    });

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const courseUrl = `${siteUrl}/course?token=${accessToken}`;

    try {
      await resend.emails.send({
        from: 'Graft <grafted.business@gmail.com>',
        to: email,
        subject: '⚡ You\'re in. GRAFT is ready.',
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0A0A0F;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0F;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111118;border-radius:20px;overflow:hidden;border:1px solid rgba(245,197,24,0.2);">
        <tr><td style="background:linear-gradient(135deg,#F5C518,#E8A800);padding:40px;text-align:center;">
          <h1 style="font-family:Georgia,'Times New Roman',serif;font-size:48px;color:#0A0A0F;margin:0;letter-spacing:2px;">GRAFT</h1>
          <p style="color:#0A0A0F;font-size:14px;margin:8px 0 0;font-weight:600;opacity:0.8;">THE COMPLETE ECOMMERCE BLUEPRINT</p>
        </td></tr>
        <tr><td style="padding:40px;">
          <h2 style="color:#FFFFFF;font-family:Georgia,'Times New Roman',serif;font-size:28px;margin:0 0 20px;">Welcome to GRAFT 🎉</h2>
          <p style="color:#A0A0B0;font-size:16px;line-height:1.8;margin:0 0 24px;">
            Congratulations — you have just made the smartest investment in your ecommerce journey. Your complete course is ready and waiting for you right now.
          </p>
          <p style="color:#A0A0B0;font-size:16px;line-height:1.8;margin:0 0 32px;">
            This is your lifetime access link. Bookmark it — you can come back to it anytime, from any device, forever.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
            <a href="${courseUrl}" style="display:inline-block;background:linear-gradient(135deg,#F5C518,#E8A800);color:#0A0A0F;font-size:18px;font-weight:700;padding:18px 48px;border-radius:50px;text-decoration:none;letter-spacing:0.5px;">
              Access GRAFT Now →
            </a>
          </td></tr></table>
          <p style="color:#A0A0B0;font-size:13px;text-align:center;margin:24px 0 0;opacity:0.7;">
            🔒 Bookmark this link — it is your lifetime access pass
          </p>
          <div style="border-top:1px solid rgba(245,197,24,0.2);margin:32px 0;"></div>
          <h3 style="color:#F5C518;font-size:18px;margin:0 0 16px;">What to do first:</h3>
          <ol style="color:#A0A0B0;font-size:15px;line-height:2;padding-left:20px;margin:0;">
            <li>Click the button above to open your course dashboard</li>
            <li>Start with Module 1 — The Ecommerce Opportunity</li>
            <li>Work through each module in order at your own pace</li>
            <li>Complete the action steps at the end of every module</li>
            <li>Mark each module complete as you finish — track your progress</li>
          </ol>
          <div style="border-top:1px solid rgba(245,197,24,0.2);margin:32px 0;"></div>
          <p style="color:#A0A0B0;font-size:14px;text-align:center;margin:0;">
            Need help? Email us at <a href="mailto:grafted.business@gmail.com" style="color:#F5C518;">grafted.business@gmail.com</a>
          </p>
        </td></tr>
        <tr><td style="background:#0A0A0F;padding:24px;text-align:center;border-top:1px solid rgba(245,197,24,0.1);">
          <p style="color:#A0A0B0;font-size:12px;margin:0;">© 2026 GRAFT. All rights reserved.</p>
          <p style="color:#A0A0B0;font-size:11px;margin:8px 0 0;opacity:0.6;">Get Rich And Fund Tomorrow</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
        `,
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
    }
  }

  return NextResponse.json({ received: true });
}
