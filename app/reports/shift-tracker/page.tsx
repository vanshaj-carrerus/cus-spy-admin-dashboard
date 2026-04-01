'use client';

import { 
  Calendar, 
  ChevronDown,
  Search,
  LayoutDashboard
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export default function ShiftReportPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">Shift Report</h1>
        <p className="text-[12px] text-slate-400">View shift time and activity details for employees from this page.</p>
      </div>

      {/* Controls */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-end">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-sm border border-slate-100 cursor-pointer min-w-[280px]">
            <span className="text-[13px] text-slate-500 flex-1">Yash sapkale</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-sm border border-slate-100 cursor-pointer">
            <span className="text-[13px] font-medium text-slate-600">2026-03-30</span>
            <span className="text-slate-300">—</span>
            <span className="text-[13px] font-medium text-slate-600">2026-04-05</span>
            <Calendar className="ml-2 h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Empty State Card */}
      <Card className="flex flex-col items-center justify-center py-24 shadow-sm border-slate-100">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl border-4 border-slate-50 dark:border-slate-800">
          <Calendar className="h-10 w-10 text-slate-200 dark:text-slate-700" />
        </div>
        <p className="text-[15px] font-bold text-slate-300 dark:text-slate-700">No shift report data found</p>
      </Card>
    </DashboardLayout>
  );
}
