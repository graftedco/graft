import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('access_token', token)
      .single();

    if (error || !data) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }

    return NextResponse.json({
      valid: true,
      email: data.email,
      modules_completed: data.modules_completed || [],
    });
  } catch {
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
