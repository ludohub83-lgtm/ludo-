import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Payment APIs
export const fetchPendingPayments = async () => {
  const res = await api.get('/pending-payments');
  return res.data || [];
};

export const fetchPaymentRequests = async (status = 'Pending') => {
  const res = await api.get(`/api/admin/payment-requests?status=${status}`);
  return res.data?.requests || [];
};

export const approvePayment = async (id) => {
  const res = await api.post(`/approve-payment/${id}`);
  return res.data;
};

export const rejectPayment = async (id, markAsFake = false) => {
  const res = await api.post(`/reject-payment/${id}`, { markAsFake });
  return res.data;
};

export const verifyPaymentRequest = async (id, verified) => {
  const res = await api.put(`/api/admin/verify/${id}`, { verified });
  return res.data;
};

// Withdraw APIs
export const fetchPendingWithdraws = async () => {
  const res = await api.get('/withdraw/pending');
  return res.data || [];
};

export const approveWithdraw = async (id) => {
  const res = await api.post(`/withdraw/approve/${id}`);
  return res.data;
};

export const rejectWithdraw = async (id) => {
  const res = await api.post(`/withdraw/reject/${id}`);
  return res.data;
};

// QR Code APIs
export const getPaymentQRCode = async () => {
  const res = await api.get('/admin/qr-code');
  return res.data;
};

export const updatePaymentQRCode = async ({ upiId, qrImageUrl }) => {
  const res = await api.put('/admin/qr-code', { upiId, qrImageUrl });
  return res.data;
};

// User Search
export const searchUser = async (query) => {
  const res = await api.get(`/admin/search-user?q=${encodeURIComponent(query)}`);
  return res.data || [];
};

// Stats
export const getAdminStats = async () => {
  try {
    const [pending, manualPending, withdraws] = await Promise.all([
      fetchPendingPayments().catch(() => []),
      fetchPaymentRequests('Pending').catch(() => []),
      fetchPendingWithdraws().catch(() => []),
    ]);

    return {
      pendingPayments: pending?.length || 0,
      pendingManualPayments: manualPending?.length || 0,
      pendingWithdraws: withdraws?.length || 0,
      totalNotifications: (pending?.length || 0) + (manualPending?.length || 0) + (withdraws?.length || 0),
    };
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return {
      pendingPayments: 0,
      pendingManualPayments: 0,
      pendingWithdraws: 0,
      totalNotifications: 0,
    };
  }
};

export default api;

