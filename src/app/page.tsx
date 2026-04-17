import { staticReviews } from '@/lib/reviews-data';
import LandingPageClient from './LandingPageClient';
import { getServiceSupabase } from '@/lib/supabase';

export const revalidate = 0;

export default async function Home() {
  let answeredQuestions: { id: string; name: string; question: string; answer: string; answered_at: string }[] = [];
  try {
    const supabase = getServiceSupabase();
    const { data } = await supabase
      .from('questions')
      .select('id, name, question, answer, answered_at')
      .not('answer', 'is', null)
      .order('answered_at', { ascending: false })
      .limit(50);
    answeredQuestions = data || [];
  } catch {
    answeredQuestions = [];
  }

  return <LandingPageClient reviews={staticReviews} answered={answeredQuestions} />;
}
