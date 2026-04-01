'use client';

import { UserCog } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function ManagerPage() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Change Manager</h1>
        <p className="text-sm text-slate-500">Manage and assign managers to your team members.</p>
      </div>

      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-sm border border-slate-50">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-50">
          <UserCog className="h-10 w-10 text-slate-200" />
        </div>
        <p className="text-2xl font-bold text-slate-200">No Manager Records</p>
      </div>
    </DashboardLayout>
  );
}
