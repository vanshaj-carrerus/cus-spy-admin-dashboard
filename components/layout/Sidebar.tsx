'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Activity, 
  BarChart3, 
  FolderKanban, 
  FileCheck, 
  History, 
  CalendarDays,
  HelpCircle,
  Monitor,
  Users,
  UserCog,
  CreditCard,
  Zap,
  Settings,
  Users2
} from 'lucide-react';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Users2, label: 'My Team', href: '/my-team' },
  { icon: UserCog, label: 'Change Manager', href: '/manager' },
  { 
    icon: Activity, 
    label: 'Live Tracking', 
    href: '#',
    subItems: [
      { label: 'Live Stream', href: '/live-stream' },
      // { label: 'Screenshot', href: '/screenshots' }
    ]
  },
  { 
    icon: BarChart3, 
    label: 'Reports', 
    href: '#',
    subItems: [
      { label: 'Time Tracker', href: '/reports/time-tracker' },
      { label: 'Shift Tracker', href: '/reports/shift-tracker' },
      { label: 'Productivity Breakdown', href: '/reports/productivity' },
      { label: 'Activity Log', href: '/reports/activity-log' },
      { label: 'Web And Apps', href: '/reports/web-apps' },
      { label: 'Attendance', href: '/reports/attendance' },
      { label: 'Daily Time Entry', href: '/reports/daily-entry' },
      { label: 'Project Report', href: '/reports/project-report' },
      { label: 'User Task', href: '/reports/tasks' },
      { label: 'Productive vs Unproductive', href: '/reports/productivity-vs-unproductive' },
      { label: 'Application Usage', href: '/reports/app-usage' },
    ]
  },
  { 
    icon: FolderKanban, 
    label: 'Project & Task', 
    href: '#',
    subItems: []
  },
  { icon: CreditCard, label: 'Pricing and Billing', href: '/billing' },
  { 
    icon: FileCheck, 
    label: 'Time Claim', 
    href: '#',
    subItems: []
  },
  { icon: History, label: 'Time Entry', href: '/time-entry' },
  { icon: CalendarDays, label: 'Holiday', href: '/holidays' },
  { icon: Zap, label: 'Trial', href: '/trial' },
  { icon: Settings, label: 'Configuration', href: '/config' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialOpenMenus: Record<string, boolean> = {};
    sidebarItems.forEach(item => {
      if (item.subItems?.some(si => pathname === si.href)) {
        initialOpenMenus[item.label] = true;
      }
    });
    setOpenMenus(initialOpenMenus);
  }, [pathname]);

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white transition-transform dark:border-slate-800  ">
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="flex items-center gap-2 p-6 border-b border-dashed border-slate-200 dark:border-slate-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5E35B1] text-white">
            <Monitor className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold text-[#5E35B1]">MeraMonitor</span>
        </div>

        <ul className="mt-6 space-y-1 px-3 font-medium">
          {sidebarItems.map((item) => (
            <li key={item.label}>
              {item.subItems ? (
                <div className="space-y-1">
                  <div 
                    onClick={() => toggleMenu(item.label)}
                    className={cn(
                      "group flex items-center rounded-xl p-3 text-slate-500 cursor-pointer hover:bg-slate-50  transition-all",
                      (openMenus[item.label] || item.subItems.some(si => pathname === si.href)) && "text-[#5E35B1] font-bold"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="ml-3 flex-1">{item.label}</span>
                    <svg className={cn(
                      "h-4 w-4 transition-transform",
                      openMenus[item.label] && "rotate-180"
                    )} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
                    </svg>
                  </div>
                  <ul className={cn(
                    "ml-9 space-y-1 overflow-auto transition-all duration-300",
                    openMenus[item.label] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}>
                    {item.subItems.map((subItem) => (
                      <li key={subItem.href}>
                        <Link
                          href={subItem.href}
                          className={cn(
                            "flex items-center rounded-xl p-2 text-sm text-slate-500 hover:bg-slate-50  transition-all",
                            pathname === subItem.href && "bg-[#5E35B1] text-white hover:bg-[#5E35B1]/90"
                          )}
                        >
                          <div className={cn(
                            "mr-3 h-1.5 w-1.5 rounded-full",
                            pathname === subItem.href ? "bg-white" : "bg-slate-300"
                          )} />
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center rounded-xl p-3 text-slate-500 hover:bg-slate-50  transition-all",
                    pathname === item.href && "bg-[#5E35B1] text-white hover:bg-[#5E35B1]/90"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition duration-75",
                    pathname === item.href ? "text-white" : "text-slate-400 group-hover:text-slate-900  "
                  )} />
                  <span className="ml-3">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-slate-200 p-4 dark:border-slate-800">
          <Link
            href="/support"
            className="flex items-center rounded-xl p-3 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            <HelpCircle className="h-5 w-5 text-slate-400" />
            <span className="ml-3">Support Forum</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
