"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import PaymentCard from '../../components/PaymentCard';

export default function PaymentsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  const checkAdmin = async () => {
    setAuthLoading(true);
    const { data: auth } = await supabase.auth.getUser();
    const uid = auth?.user?.id;
    if (!uid) { setAllowed(false); setAuthLoading(false); return; }
    const { data: rows } = await supabase.from('users').select('role').eq('id', uid).single();
    setAllowed(rows?.role === 'admin');
    setAuthLoading(false);
  };

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('payment_requests')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  };

  useEffect(() => { (async () => { await checkAdmin(); })(); }, []);
  useEffect(() => { if (allowed) load(); }, [allowed]);

  const approve = async (id) => {
    const { error: e1 } = await supabase.from('payment_requests').update({ status: 'approved' }).eq('id', id);
    if (!e1) {
      await fetch((process.env.NEXT_PUBLIC_BACKEND_BASE || '') + '/api/updateCoins', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payment_request_id: id })
      });
      await load();
    }
  };

  const markFake = async (id) => {
    await supabase.from('payment_requests').update({ status: 'fake' }).eq('id', id);
    await load();
  };

  if (authLoading) return <div className="p-6">Checking access…</div>;
  if (!allowed) return <div className="p-6 text-red-600 font-semibold">Access denied. Admins only.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Requests</h1>
      {loading && <div>Loading...</div>}
      <div className="grid gap-4">
        {items.map((it) => (
          <PaymentCard key={it.id} item={it} onApprove={() => approve(it.id)} onFake={() => markFake(it.id)} />
        ))}
        {!loading && items.length === 0 && (
          <div className="text-gray-500">No pending requests</div>
        )}
      </div>
    </div>
  );
}
