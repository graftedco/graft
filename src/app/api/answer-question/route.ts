import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { question_id, answer } = await req.json();
    if (!question_id || !answer) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('questions')
      .update({ answer, answered_at: new Date().toISOString() })
      .eq('id', question_id)
      .select('email, name, question')
      .single();

    if (error || !data) {
      console.error('Answer update error:', error);
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    try {
      await resend.emails.send({
        from: 'GRAFT <grafted.business@gmail.com>',
        to: data.email,
        subject: 'Your question on GRAFT has been answered',
        html: `
          <div style="font-family: Arial, sans-serif; background:#000; color:#fff; padding:40px;">
            <h1 style="color:#D4AF37; font-family: Georgia, serif; letter-spacing:2px;">GRAFT</h1>
            <p>Hi ${data.name},</p>
            <p>Your question on GRAFT has been answered.</p>
            <p><strong>Your question:</strong></p>
            <p style="color:#AAAAAA;">${String(data.question).replace(/</g, '&lt;').replace(/\n/g, '<br/>')}</p>
            <p><strong>Our answer:</strong></p>
            <p style="color:#AAAAAA;">${String(answer).replace(/</g, '&lt;').replace(/\n/g, '<br/>')}</p>
            <p style="margin-top:24px; color:#AAAAAA; font-size:14px;">— The GRAFT team</p>
          </div>
        `,
      });
    } catch (e) {
      console.error('Answer email error:', e);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
