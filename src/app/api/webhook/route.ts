import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getServiceSupabase } from '@/lib/supabase';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const resend = new Resend(process.env.RESEND_API_KEY);

function randomPassword(len = 14): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$';
  let out = '';
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 });

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as {
    id: string;
    customer_details?: { email?: string | null; name?: string | null };
  };
  const email = session.customer_details?.email;
  const name = session.customer_details?.name || '';

  if (!email) {
    console.error('No email in checkout session');
    return NextResponse.json({ error: 'No email' }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  const password = randomPassword();

  const { error: dbError } = await supabase.from('purchases').upsert(
    {
      email,
      name,
      stripe_session_id: session.id,
      has_access: true,
    },
    { onConflict: 'email' }
  );
  if (dbError) console.error('Purchases insert error:', dbError);

  try {
    const { data: created, error: authErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    });
    if (authErr && !String(authErr.message).toLowerCase().includes('already')) {
      console.error('Auth user create error:', authErr);
    }
    if (!created?.user) {
      // user may already exist — update password instead
      const { data: list } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
      const existing = list?.users.find((u) => u.email === email);
      if (existing) {
        await supabase.auth.admin.updateUserById(existing.id, { password });
      }
    }
  } catch (e) {
    console.error('Auth admin error:', e);
  }

  const origin = req.nextUrl.origin;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;
  const loginUrl = `${siteUrl}/login`;

  try {
    await resend.emails.send({
      from: 'GRAFT <grafted.business@gmail.com>',
      to: email,
      subject: 'Welcome to GRAFT — Your Course Access',
      html: `
        <div style="font-family: Arial, sans-serif; background:#000; color:#fff; padding:40px;">
          <h1 style="color:#D4AF37; font-family: Georgia, serif; letter-spacing:2px;">GRAFT</h1>
          <p>Thank you for your purchase. Your lifetime access is ready.</p>
          <p><strong>Email:</strong> ${email}<br/><strong>Password:</strong> ${password}</p>
          <p><a href="${loginUrl}" style="display:inline-block;background:#D4AF37;color:#000;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;">Login to your course</a></p>
          <p style="color:#AAAAAA;font-size:14px;">You can change this password after logging in. Reply to this email if you need help.</p>
        </div>
      `,
    });
  } catch (emailError) {
    console.error('Resend email error:', emailError);
  }

  return NextResponse.json({ received: true });
}
