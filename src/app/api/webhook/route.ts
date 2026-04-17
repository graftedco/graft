import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getServiceSupabase } from '@/lib/supabase';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const ADMIN_EMAIL = 'grafted.business@gmail.com';

function log(step: string, data?: unknown) {
  console.log(`[webhook] ${step}`, data !== undefined ? JSON.stringify(data) : '');
}

function randomPassword(len = 14): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$';
  let out = '';
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function emailHtml(email: string, password: string, loginUrl: string, adminCopy: boolean) {
  return `
    <div style="font-family: Arial, sans-serif; background:#000; color:#fff; padding:40px;">
      <h1 style="color:#D4AF37; font-family: Georgia, serif; letter-spacing:2px;">GRAFT</h1>
      ${adminCopy ? `<p style="color:#D4AF37;"><strong>New purchase — please forward these details to the customer if their copy does not arrive.</strong></p>` : ''}
      <p>Thank you for your purchase. Your lifetime access is ready.</p>
      <p><strong>Email:</strong> ${email}<br/><strong>Password:</strong> ${password}</p>
      <p><a href="${loginUrl}" style="display:inline-block;background:#D4AF37;color:#000;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:700;">Login to your course</a></p>
      <p style="color:#AAAAAA;font-size:14px;">You can change this password after logging in. Reply to this email if you need help.</p>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  log('received');

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.error('[webhook] RESEND_API_KEY missing');
    return NextResponse.json({ error: 'RESEND_API_KEY missing' }, { status: 500 });
  }
  const resend = new Resend(resendKey);

  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  if (!sig) {
    log('no signature header');
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('[webhook] signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  log('verified', { type: event.type, id: event.id });

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
    console.error('[webhook] no email in checkout session', session.id);
    return NextResponse.json({ error: 'No email' }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  const password = randomPassword();

  const { error: dbError } = await supabase
    .from('purchases')
    .upsert(
      { email, name, stripe_session_id: session.id, has_access: true },
      { onConflict: 'email' }
    );
  if (dbError) console.error('[webhook] purchases upsert error:', dbError);
  else log('purchase stored', { email });

  try {
    const { data: created, error: authErr } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    });
    if (authErr && !String(authErr.message).toLowerCase().includes('already')) {
      console.error('[webhook] auth create user error:', authErr);
    }
    if (!created?.user) {
      const { data: list } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
      const existing = list?.users.find((u) => u.email === email);
      if (existing) {
        await supabase.auth.admin.updateUserById(existing.id, { password });
        log('auth password updated for existing user', { email });
      }
    } else {
      log('auth user created', { email });
    }
  } catch (e) {
    console.error('[webhook] auth admin threw:', e);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;
  const loginUrl = `${siteUrl}/login`;

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'GRAFT <onboarding@resend.dev>';
  const usingSandbox = fromEmail.includes('onboarding@resend.dev');

  let customerSendOk = false;
  let customerError: unknown = null;

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: email,
      replyTo: ADMIN_EMAIL,
      subject: 'Welcome to GRAFT — Your Course Access',
      html: emailHtml(email, password, loginUrl, false),
    });
    if (result.error) {
      customerError = result.error;
      console.error('[webhook] customer send failed:', result.error);
    } else {
      customerSendOk = true;
      log('customer email sent', { to: email, id: result.data?.id });
    }
  } catch (e) {
    customerError = e;
    console.error('[webhook] customer send threw:', e);
  }

  // Always notify the admin — works even on Resend sandbox because
  // ADMIN_EMAIL is the Resend account owner. If the customer send failed,
  // the admin can manually forward the login details.
  try {
    const subject = customerSendOk
      ? `GRAFT purchase: ${email}`
      : `GRAFT purchase: ${email} (CUSTOMER EMAIL FAILED — forward manually)`;
    const result = await resend.emails.send({
      from: fromEmail,
      to: ADMIN_EMAIL,
      subject,
      html: emailHtml(email, password, loginUrl, !customerSendOk),
    });
    if (result.error) {
      console.error('[webhook] admin send failed:', result.error);
    } else {
      log('admin email sent', { id: result.data?.id });
    }
  } catch (e) {
    console.error('[webhook] admin send threw:', e);
  }

  // If we could not email the customer AND we're using sandbox, return 500
  // so Stripe shows the failure in its dashboard and the user sees it clearly.
  if (!customerSendOk) {
    const message = usingSandbox
      ? 'Resend sandbox can only send to the account owner email. Verify a domain in Resend and set RESEND_FROM_EMAIL.'
      : 'Resend send failed — see server logs.';
    return NextResponse.json(
      { received: true, emailSent: false, error: message, detail: String(customerError) },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true, emailSent: true });
}
