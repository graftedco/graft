import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ hasAccess: false });
    const supabase = getServiceSupabase();
    const { data } = await supabase
      .from('purchases')
      .select('has_access')
      .eq('email', email)
      .limit(1)
      .maybeSingle();
    return NextResponse.json({ hasAccess: Boolean(data?.has_access) });
  } catch {
    return NextResponse.json({ hasAccess: false });
  }
}
