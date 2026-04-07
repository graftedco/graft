import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { token, moduleNumber } = await req.json();

    if (!token || !moduleNumber) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('purchases')
      .select('modules_completed')
      .eq('access_token', token)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const current = data.modules_completed || [];
    if (!current.includes(moduleNumber)) {
      current.push(moduleNumber);
    }

    const { error: updateError } = await supabase
      .from('purchases')
      .update({ modules_completed: current })
      .eq('access_token', token);

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }

    return NextResponse.json({ modules_completed: current });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
