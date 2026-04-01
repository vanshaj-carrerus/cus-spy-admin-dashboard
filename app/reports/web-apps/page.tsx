'use client';

import { useState } from 'react';
import { 
  User, 
  Calendar, 
  Search, 
  Upload, 
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function WebAndAppsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'websites' | 'applications'>('all');

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Websites & Applications</h1>
        <p className="text-sm text-slate-500">Descriptions of the websites and apps tracked by your system up to today.</p>
      </div>

      {/* Sub-header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-xl bg-white p-1 shadow-sm   border border-slate-100 dark:border-slate-800">
          <button className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2 text-sm font-medium text-[#5E35B1] dark:bg-slate-800">
            <User className="h-4 w-4" />
            Me
          </button>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white p-2 shadow-sm   border border-slate-100 dark:border-slate-800">
          <span className="text-sm text-slate-400">2026-03-26</span>
          <span className="text-slate-200">—</span>
          <span className="text-sm text-slate-400">2026-04-01</span>
          <Calendar className="ml-2 h-4 w-4 text-slate-400" />
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="p-8 border-none shadow-sm min-h-[500px] flex flex-col">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center flex-1">
            <div className="relative max-w-sm w-full">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-xl border border-slate-100 bg-slate-50/50 py-2.5 pl-11 pr-4 text-sm focus:border-[#5E35B1] focus:outline-none dark:border-slate-800  "
              />
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  activeFilter === 'all' 
                    ? "bg-[#1F2937] text-white" 
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-800"
                )}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('websites')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  activeFilter === 'websites' 
                    ? "bg-[#1F2937] text-white" 
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-800"
                )}
              >
                Websites
              </button>
              <button
                onClick={() => setActiveFilter('applications')}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  activeFilter === 'applications' 
                    ? "bg-[#1F2937] text-white" 
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-800"
                )}
              >
                Applications
              </button>
            </div>
          </div>

          <Button variant="secondary" size="sm" className="flex items-center gap-2 bg-slate-50 text-slate-400  dark:text-slate-500 border-none">
            <Upload className="h-4 w-4" />
            Export
          </Button>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-slate-50 dark:border-slate-800">
            <BarChart3 className="h-12 w-12 text-slate-200 dark:text-slate-700" />
          </div>
          <p className="text-2xl font-bold text-slate-200 dark:text-slate-700">No Active Data</p>
        </div>

        {/* Pagination Footer */}
        <div className="mt-auto pt-8 flex items-center justify-between text-sm text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-800  ">
              10 rows
              <ChevronDown className="h-4 w-4" />
            </div>
            <span className="text-slate-300">No entries to show</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 text-slate-200 cursor-not-allowed">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="p-1 text-slate-200 cursor-not-allowed">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}
