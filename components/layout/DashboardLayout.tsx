'use client';

import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50  ">
      <Navbar />
      <Sidebar />
      <main className="p-4 sm:ml-64 pt-20">
        <div className="mx-auto max-w-7xl rounded-lg p-4">
          {children}
        </div>
      </main>
    </div>
  );
}
