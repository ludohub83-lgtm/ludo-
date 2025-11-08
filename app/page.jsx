"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-4">
      <p>Welcome to the Ludo Admin Panel.</p>
      <Link href="/payments" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Go to Payment Requests
      </Link>
    </div>
  );
}
