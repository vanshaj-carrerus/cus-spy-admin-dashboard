'use client';

import { useState } from 'react';
import { 
  User, 
  Calendar, 
  Filter, 
  Upload, 
  ChevronDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
  Users2,
  Info
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const orgData = [
  { name: '', avg: '1hrs 22Min 50Sec', active: '4hrs 8Min 28Sec', productive: '0hrs 1Min 0Sec', unproductive: '0hrs 0Min 0Sec', neutral: '4hrs 7Min 28Sec', idle: '0hrs 39Min 21Sec' },
  { name: '', avg: '2hrs 1Min 56Sec', active: '10hrs 9Min 40Sec', productive: '7hrs 11Min 9Sec', unproductive: '0hrs 0Min 0Sec', neutral: '2hrs 58Min 31Sec', idle: '13hrs 42Min 46Sec' },
  { name: '', avg: '4hrs 18Min 18Sec', active: '21rs 31Min 29Sec', productive: '0hrs 12Min 24Sec', unproductive: '0hrs 0Min 0Sec', neutral: '21hrs 19Min 5Sec', idle: '4hrs 35Min 15Sec' },
  { name: '', avg: '3hrs 56Min 36Sec', active: '19hrs 43Min 0Sec', productive: '16hrs 16Min 49Sec', unproductive: '0hrs 0Min 0Sec', neutral: '3hrs 26Min 11Sec', idle: '3hrs 55Min 4Sec' },
  { name: '', avg: '4hrs 13Min 26Sec', active: '21hrs 7Min 7Sec', productive: '12hrs 26Min 42Sec', unproductive: '0hrs 0Min 0Sec', neutral: '8hrs 40Min 25Sec', idle: '4hrs 30Min 29Sec' },
  { name: '', avg: '0hrs 0Min 0Sec', active: '0hrs 0Min 0Sec', productive: '0hrs 0Min 0Sec', unproductive: '0hrs 0Min 0Sec', neutral: '0hrs 0Min 0Sec', idle: '0hrs 0Min 0Sec' },
  { name: 'Abhishek Sadhu', avg: '2hrs 39Min 37Sec', active: '10hrs 38Min 25Sec', productive: '0hrs 2Min 33Sec', unproductive: '0hrs 0Min 0Sec', neutral: '10hrs 35Min 52Sec', idle: '1hrs 17Min 20Sec' },
  { name: 'Adikate', avg: '4hrs 53Min 28Sec', active: '24hrs 27Min 16Sec', productive: '16hrs 0Min 33Sec', unproductive: '0hrs 0Min 0Sec', neutral: '8hrs 26Min 43Sec', idle: '2hrs 42Min 49Sec' },
  { name: 'Adoreen', dept: 'Sales', avg: '5hrs 36Min 4Sec', active: '28hrs 0Min 18Sec', productive: '22hrs 45Min 2Sec', unproductive: '0hrs 0Min 0Sec', neutral: '5hrs 15Min 16Sec', idle: '2hrs 38Min 53Sec' },
  { name: 'Alfaiz khatri', avg: '6hrs 13Min 18Sec', active: '37hrs 19Min 47Sec', productive: '0hrs 2Min 30Sec', unproductive: '0hrs 0Min 0Sec', neutral: '37hrs 17Min 17Sec', idle: '9hrs 41Min 51Sec' },
];

const indData = [
  { date: '26 Mar 2026', span: '-', active: '0hrs 0Min 0Sec', productive: '0hrs 0Min 0Sec', unproductive: '0hrs 0Min 0Sec', neutral: '0hrs 0Min 0Sec', idle: '0hrs 0Min 0Sec', away: '0hrs 0Min 0Sec', total: '0hrs 0Min 0Sec' },
  { date: '27 Mar 2026', span: '-', active: '0hrs 0Min 0Sec', productive: '0hrs 0Min 0Sec', unproductive: '0hrs 0Min 0Sec', neutral: '0hrs 0Min 0Sec', idle: '0hrs 0Min 0Sec', away: '0hrs 0Min 0Sec', total: '0hrs 0Min 0Sec' },
  { date: '28 Mar 2026', span: '-', active: '0hrs 0Min 0Sec', productive: '0hrs 0Min 0Sec', unproductive: '0hrs 0Min 0Sec', neutral: '0hrs 0Min 0Sec', idle: '0hrs 0Min 0Sec', away: '0hrs 0Min 0Sec', total: '0hrs 0Min 0Sec' },
  { date: '29 Mar 2026', span: '-', active: '0hrs 0Min 0Sec', productive: '0hrs 0Min 0Sec', unproductive: '0hrs 0Min 0Sec', neutral: '0hrs 0Min 0Sec', idle: '0hrs 0Min 0Sec', away: '0hrs 0Min 0Sec', total: '0hrs 0Min 0Sec' },
  { date: '30 Mar 2026', span: '-', active: '0hrs 0Min 0Sec', productive: '0hrs 0Min 0Sec', unproductive: '0hrs 0Min 0Sec', neutral: '0hrs 0Min 0Sec', idle: '0hrs 0Min 0Sec', away: '0hrs 0Min 0Sec', total: '0hrs 0Min 0Sec' },
  { date: '31 Mar 2026', span: '-', active: '0hrs 0Min 0Sec', productive: '0hrs 0Min 0Sec', unproductive: '0hrs 0Min 0Sec', neutral: '0hrs 0Min 0Sec', idle: '0hrs 0Min 0Sec', away: '0hrs 0Min 0Sec', total: '0hrs 0Min 0Sec' },
  { date: '1 Apr 2026', span: '-', active: '0hrs 0Min 0Sec', productive: '0hrs 0Min 0Sec', unproductive: '0hrs 0Min 0Sec', neutral: '0hrs 0Min 0Sec', idle: '0hrs 0Min 0Sec', away: '0hrs 0Min 0Sec', total: '0hrs 0Min 0Sec' },
];

export default function TimeTrackerPage() {
  const [activeView, setActiveView] = useState<'org' | 'ind'>('org');

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800">Time Tracker</h1>
        <p className="text-[12px] text-slate-400">Detailed Report of how your time was spent with segregation based on different time metrics.</p>
      </div>

      {/* Sub-header Controls */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-1 rounded-xl bg-white p-1 shadow-sm border border-slate-100">
          <button 
            onClick={() => setActiveView('org')}
            className={cn(
              "flex items-center gap-2 rounded-lg px-6 py-2.5 text-[13px] font-bold transition-all",
              activeView === 'org' 
                ? "bg-white text-slate-900 border shadow-sm" 
                : "text-slate-500 hover:bg-slate-50"
            )}
          >
            <div className={cn("p-1 rounded-md", activeView === 'org' ? "bg-slate-100" : "bg-transparent")}>
              <Users2 className="h-4 w-4" />
            </div>
            Organization View
          </button>
          <button 
            onClick={() => setActiveView('ind')}
            className={cn(
              "flex items-center gap-2 rounded-lg px-6 py-2.5 text-[13px] font-bold transition-all",
              activeView === 'ind' 
                ? "bg-white text-slate-900 border shadow-sm" 
                : "text-slate-500 hover:bg-slate-50"
            )}
          >
            <div className={cn("p-1 rounded-md", activeView === 'ind' ? "bg-slate-100" : "bg-transparent")}>
              <User className="h-4 w-4" />
            </div>
            Individual View
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-sm border border-slate-100 cursor-pointer">
            <span className="text-[13px] font-medium text-slate-600">2026-03-26</span>
            <span className="text-slate-300">—</span>
            <span className="text-[13px] font-medium text-slate-600">2026-04-01</span>
            <Calendar className="ml-2 h-4 w-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="p-8 shadow-sm border-slate-100">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center w-full lg:w-auto">
            {activeView === 'org' && (
              <div className="relative w-full lg:w-80">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full rounded-xl border border-slate-100 bg-[#F9FAFB] px-4 py-2.5 pl-10 text-[13px] text-slate-600 focus:border-[#5E35B1] focus:outline-none"
                />
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300" />
              </div>
            )}
            
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center w-full lg:w-auto">
              {activeView === 'org' ? (
                <div className="flex items-center gap-1 rounded-xl bg-[#F9FAFB] p-1 border border-slate-100">
                  <button className="rounded-lg bg-[#5E35B1] px-4 py-2 text-[12px] font-bold text-white shadow-lg shadow-purple-200">
                    Manager
                  </button>
                  <button className="rounded-lg px-4 py-2 text-[12px] font-bold text-slate-500 hover:bg-slate-100 transition-colors">
                    Location & Department
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-sm border border-slate-100 cursor-pointer min-w-[200px]">
                  <span className="text-[13px] text-slate-500 flex-1">Yash sapkale</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </div>
              )}
              
              <div className="text-[15px] font-bold text-slate-800 whitespace-nowrap">
                {activeView === 'org' ? (
                  <>Total Team Productivity: <span className="text-slate-900">256hrs 41Min 5Sec</span></>
                ) : (
                  <>Total Productivity: <span className="text-slate-900">0hrs 0Min 0Sec</span></>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end lg:self-auto">
            {activeView === 'org' && (
              <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-sm border border-slate-100 cursor-pointer min-w-[180px]">
                <span className="text-[13px] text-slate-500 flex-1">All Members</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </div>
            )}
            <Button variant="secondary" size="sm" className="flex items-center gap-2 bg-[#F1F5F9] text-slate-600 px-5 py-2.5 rounded-xl border-none font-bold text-[12px]">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="secondary" size="sm" className="flex items-center gap-2 bg-[#F1F5F9] text-slate-600 px-5 py-2.5 rounded-xl border-none font-bold text-[12px]">
              <Upload className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="border-b border-slate-50">
                {activeView === 'org' ? (
                  <>
                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        NAME <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        AVERAGE TIME <Info className="h-3 w-3" /> <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        ACTIVE TIME <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        PRODUCTIVE TIME <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        UNPRODUCTIVE TIME <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        NEUTRAL TIME <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        IDLE TIME <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                  </>
                ) : (
                  <>
                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider">
                      <div className="flex items-center gap-1.5">
                        DATE <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider text-center">ACTIVITY SPAN</th>
                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        ACTIVE TIME <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        PRODUCTIVE TIME <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        UNPRODUCTIVE TIME <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        NEUTRAL TIME <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        IDLE TIME <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        AWAY TIME <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                    <th className="pb-4 font-bold text-slate-400 uppercase tracking-wider text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        TOTAL TIME <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {activeView === 'org' ? (
                orgData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-5 font-bold text-slate-800">
                      {row.name}
                      {row.dept && <div className="text-[10px] font-medium text-slate-400">{row.dept}</div>}
                    </td>
                    <td className="py-5 text-right font-bold text-slate-400">{row.avg}</td>
                    <td className="py-5 text-right font-bold text-blue-500">{row.active}</td>
                    <td className="py-5 text-right font-bold text-green-500">{row.productive}</td>
                    <td className="py-5 text-right font-bold text-red-500">{row.unproductive}</td>
                    <td className="py-5 text-right font-bold text-orange-500">{row.neutral}</td>
                    <td className="py-5 text-right font-bold text-yellow-500">{row.idle}</td>
                  </tr>
                ))
              ) : (
                indData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-5 font-bold text-slate-800">{row.date}</td>
                    <td className="py-5 text-center font-bold text-slate-400">{row.span}</td>
                    <td className="py-5 text-right font-bold text-blue-500">{row.active}</td>
                    <td className="py-5 text-right font-bold text-green-500">{row.productive}</td>
                    <td className="py-5 text-right font-bold text-red-500">{row.unproductive}</td>
                    <td className="py-5 text-right font-bold text-orange-500">{row.neutral}</td>
                    <td className="py-5 text-right font-bold text-yellow-500">{row.idle}</td>
                    <td className="py-5 text-right font-bold text-slate-400">{row.away}</td>
                    <td className="py-5 text-right font-bold text-slate-400">{row.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-[13px] text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2 text-slate-500 shadow-sm cursor-pointer">
              10 rows
              <ChevronDown className="h-4 w-4" />
            </div>
            <span className="font-medium">Showing 1 to {activeView === 'org' ? '10 of 51' : '7 of 7'} entries</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-50 transition-colors text-slate-400">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5E35B1] text-white font-bold shadow-lg shadow-purple-200">
                1
              </button>
              {activeView === 'org' && (
                <>
                  <button className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 font-bold hover:bg-slate-50 transition-colors">
                    2
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 font-bold hover:bg-slate-50 transition-colors">
                    3
                  </button>
                  <span className="flex items-center justify-center w-10">...</span>
                  <button className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 font-bold hover:bg-slate-50 transition-colors">
                    6
                  </button>
                </>
              )}
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-50 transition-colors text-slate-400">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}
