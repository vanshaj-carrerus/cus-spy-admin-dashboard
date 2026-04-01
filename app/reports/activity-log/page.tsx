'use client';

import { 
  Calendar, 
  Upload, 
  ChevronDown,
  Info
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const activityLogs = [
  { date: 'Wed - 01 Apr 2026', working: '00:00:00', idle: '00:00:00', stopped: '00:00:00', total: '00:00:00' },
  { date: 'Tue - 31 Mar 2026', working: '00:00:00', idle: '00:00:00', stopped: '00:00:00', total: '00:00:00' },
  { date: 'Mon - 30 Mar 2026', working: '00:00:00', idle: '00:00:00', stopped: '00:00:00', total: '00:00:00' },
  { date: 'Sun - 29 Mar 2026', working: '00:00:00', idle: '00:00:00', stopped: '00:00:00', total: '00:00:00' },
];

export default function ActivityLogPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-slate-800">Activity Log</h1>
          <p className="max-w-4xl text-[12px] text-slate-400 font-medium">
            A consolidated weekly report featuring a 24-hour visual timeline of daily activity, designed to drill down from a day summary into specific work sessions and the applications used within them.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-sm border border-slate-100 cursor-pointer">
            <span className="text-[13px] font-medium text-slate-600">2026-03-26</span>
            <span className="text-slate-300">—</span>
            <span className="text-[13px] font-medium text-slate-600">2026-04-01</span>
            <Calendar className="ml-2 h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="p-0 border-none shadow-sm overflow-hidden bg-white">
        {/* Legend and Actions Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-6 border-b border-slate-50">
          <div className="flex items-center gap-6 rounded-xl border border-blue-50 bg-blue-50/20 px-5 py-2.5">
            <LegendItem color="bg-slate-300" label="Offline" />
            <LegendItem color="bg-green-500" label="Working" />
            <LegendItem color="bg-[#5E35B1]" label="Stopped" />
            <LegendItem color="bg-yellow-400" label="Idle" />
          </div>
          <Button variant="secondary" size="sm" className="flex items-center gap-2 bg-[#F1F5F9] text-slate-600 px-5 py-2.5 rounded-xl border-none font-bold text-[12px]">
            <Upload className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Activity Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-1/4">
                  <div className="flex items-center justify-center gap-1.5">Date</div>
                </th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-1/2 text-center">
                  Activity Breakdown (24 Hr Time line)
                </th>
                <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-wider w-1/4 text-center">
                  Total Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {activityLogs.map((log, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-10">
                    <div className="flex items-center gap-8">
                      <ChevronDown className="h-5 w-5 text-slate-300 group-hover:text-slate-400 cursor-pointer" />
                      <span className="text-[14px] font-bold text-slate-700">{log.date}</span>
                    </div>
                  </td>
                  
                  <td className="px-8 py-10">
                    <div className="space-y-6">
                      {/* Timeline Bar Placeholder */}
                      <div className="h-4 w-full rounded-full border border-slate-100 bg-slate-50 shadow-inner relative overflow-hidden">
                        {/* Mock activity segments */}
                        <div className="absolute inset-y-0 left-[20%] w-[15%] bg-green-500/80" />
                        <div className="absolute inset-y-0 left-[40%] w-[10%] bg-yellow-400/80" />
                        <div className="absolute inset-y-0 left-[60%] w-[20%] bg-green-500/80" />
                        <div className="absolute inset-y-0 left-[85%] w-[5%] bg-[#5E35B1]/80" />
                      </div>
                      
                      {/* Durations */}
                      <div className="flex justify-center gap-12">
                        <DurationItem color="bg-green-500" label="Working" value={log.working} />
                        <DurationItem color="bg-yellow-400" label="Idle" value={log.idle} />
                        <DurationItem color="bg-[#5E35B1]" label="Stopped" value={log.stopped} />
                      </div>
                    </div>
                  </td>

                  <td className="px-8 py-10 text-center">
                    <span className="text-[14px] font-bold text-slate-400">{log.total}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn("h-2.5 w-2.5 rounded-full", color)}></div>
      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function DurationItem({ color, label, value }: { color: string, label: string, value: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-2">
        <div className={cn("h-2 w-2 rounded-full", color)}></div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-[13px] font-bold text-slate-900">{value}</span>
    </div>
  );
}
