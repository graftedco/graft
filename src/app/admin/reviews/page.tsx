'use client';

import { useState, useEffect } from 'react';

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  verified: boolean;
  created_at: string;
}

export default function AdminReviews() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const login = () => {
    if (password === 'graft2026admin') {
      setAuthed(true);
      fetchReviews();
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/reviews');
      const data = await res.json();
      setReviews(data);
    } catch { /* ignore */ }
    setLoading(false);
  };

  const approveReview = async (id: string) => {
    await fetch('/api/admin/reviews', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action: 'approve' }),
    });
    fetchReviews();
  };

  const deleteReview = async (id: string) => {
    await fetch('/api/admin/reviews', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action: 'delete' }),
    });
    fetchReviews();
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-6">
        <div className="glassmorphism rounded-[20px] p-8 max-w-md w-full">
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold gold-text-gradient mb-6 text-center">Admin Panel</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            placeholder="Enter admin password"
            className="w-full bg-[#0A0A0F] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#F5C518] focus:outline-none transition mb-4"
          />
          <button onClick={login} className="shimmer-btn text-[#0A0A0F] font-bold rounded-full px-8 py-3 w-full cursor-pointer">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold gold-text-gradient mb-2">Review Management</h1>
        <p className="text-[#A0A0B0] mb-8">Approve or delete submitted reviews.</p>

        {loading ? (
          <p className="text-[#A0A0B0]">Loading...</p>
        ) : reviews.length === 0 ? (
          <p className="text-[#A0A0B0]">No reviews found.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="glassmorphism rounded-[20px] p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-[#F5C518] font-bold">{review.name}</p>
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => <span key={i} className="text-[#F5C518]">★</span>)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${review.verified ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {review.verified ? 'Approved' : 'Pending'}
                    </span>
                    <span className="text-[#A0A0B0] text-xs">{new Date(review.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-white/80 text-sm mb-4">{review.text}</p>
                <div className="flex gap-3">
                  {!review.verified && (
                    <button onClick={() => approveReview(review.id)} className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-green-500/30 transition">
                      Approve
                    </button>
                  )}
                  <button onClick={() => deleteReview(review.id)} className="bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-red-500/30 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
