'use client';

import { 
  Calendar, 
  Download, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileDown,
  User
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function AttendanceReportPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-800">Attendance Report</h1>
          <p className="max-w-4xl text-[12px] text-slate-400 font-medium">Monitor attendance records for all employees from this page.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-sm border border-slate-100 cursor-pointer">
            <span className="text-[13px] font-medium text-slate-600">2026-04-01</span>
            <span className="text-slate-300">—</span>
            <span className="text-[13px] font-medium text-slate-600">2026-04-01</span>
            <Calendar className="ml-2 h-4 w-4 text-slate-400" />
          </div>
          <Button className="flex items-center gap-2 bg-[#5E35B1] hover:bg-[#5E35B1]/90 text-white rounded-xl px-6 py-2.5 font-bold text-[12px] border-none shadow-lg shadow-purple-200">
            <FileDown className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="p-0 border-none shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-50">
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Name</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date Range</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Logged</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Expected</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Holidays</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Untracked Days</th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr className="group hover:bg-slate-50/50 transition-colors bg-[#F0F7FF]/20">
                <td className="px-8 py-8">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-slate-400">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="text-[14px] font-bold text-slate-800 italic">No Name Selected</span>
                  </div>
                </td>
                <td className="px-8 py-8 text-[14px] font-bold text-slate-600">01/04/2026 - 01/04/2026</td>
                <td className="px-8 py-8 text-center text-[14px] font-bold text-[#4ADE80]">--:--:--</td>
                <td className="px-8 py-8 text-center text-[14px] font-bold text-[#5E35B1]">00:00:00</td>
                <td className="px-8 py-8 text-center text-[14px] font-bold text-blue-500">0</td>
                <td className="px-8 py-8 text-center text-[14px] font-bold text-orange-400">0</td>
                <td className="px-8 py-8 text-center">
                  <button className="p-2.5 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 transition-all shadow-sm">
                    <Calendar className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-50">
          <div className="flex items-center gap-4 text-[13px] text-slate-400">
            <span className="font-bold uppercase tracking-wider">Rows per page:</span>
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2 text-slate-500 shadow-sm cursor-pointer hover:border-slate-200 transition-all">
              10
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 text-slate-300 hover:bg-slate-50 rounded-xl transition-all">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5E35B1] text-white font-bold shadow-lg shadow-purple-200">
              1
            </button>
            <button className="p-2.5 text-slate-300 hover:bg-slate-50 rounded-xl transition-all">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}
