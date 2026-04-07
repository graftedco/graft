import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { name, rating, text } = await req.json();

    if (!name || !rating || !text || text.length < 50) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    const { error } = await supabase.from('reviews').insert({
      name,
      rating,
      text,
      verified: false,
    });

    if (error) {
      console.error('Review insert error:', error);
      return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
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
      .from('reviews')
      .select('*')
      .eq('verified', true)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
