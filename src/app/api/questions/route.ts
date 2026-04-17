import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, question } = await req.json();
    if (!name || !email || !question) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    const { error } = await supabase.from('questions').insert({ name, email, question });
    if (error) {
      console.error('Questions insert error:', error);
      return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
    }

    try {
      await resend.emails.send({
        from: 'GRAFT <grafted.business@gmail.com>',
        to: 'grafted.business@gmail.com',
        subject: 'New Question on GRAFT',
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>New question on GRAFT</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Question:</strong></p>
            <p>${String(question).replace(/</g, '&lt;').replace(/\n/g, '<br/>')}</p>
          </div>
        `,
      });
    } catch (e) {
      console.error('Notify email error:', e);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('questions')
      .select('id, name, question, answer, answered_at')
      .not('answer', 'is', null)
      .order('answered_at', { ascending: false });
    if (error) return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
