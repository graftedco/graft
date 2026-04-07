import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, action } = await req.json();
    const supabase = getServiceSupabase();

    if (action === 'approve') {
      const { error } = await supabase
        .from('reviews')
        .update({ verified: true })
        .eq('id', id);

      if (error) return NextResponse.json({ error: 'Failed' }, { status: 500 });
    } else if (action === 'delete') {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
