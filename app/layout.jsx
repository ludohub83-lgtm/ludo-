import './globals.css';

export const metadata = {
  title: 'Ludo Admin Panel',
  description: 'Manage payments, users, and coins',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <header className="mb-6">
            <h1 className="text-3xl font-bold">Ludo Admin Panel</h1>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
