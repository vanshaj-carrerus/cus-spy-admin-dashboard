'use client';

import { 
  Calendar, 
  Download
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';

export default function ProductivityBreakdownPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Productivity Breakdown</h1>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm   border border-slate-100 dark:border-slate-800">
            <span className="text-sm text-slate-400">2026-04-01</span>
            <span className="text-slate-200">—</span>
            <span className="text-sm text-slate-400">2026-04-01</span>
            <Calendar className="ml-2 h-4 w-4 text-slate-400" />
          </div>
          <Button className="flex items-center gap-2 bg-[#5E35B1] hover:bg-[#5E35B1]/90">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      {/* Empty State Content */}
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-sm   border border-slate-50 dark:border-slate-800 mt-8">
        <p className="text-2xl font-bold text-slate-200 dark:text-slate-700">No Records Found</p>
      </div>
    </DashboardLayout>
  );
}
