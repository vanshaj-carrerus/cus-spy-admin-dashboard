"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Locate,
  BarChart3,
  CheckSquare,
  CreditCard,
  Clock,
  CalendarRange,
  Sun,
  Play,
  Settings,
  HelpCircle,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/" },
  { name: "My Team", icon: Users, href: "/invite" },
  { name: "Change Manager", icon: Settings, href: "#" },
  { name: "Live Tracking", icon: Locate, href: "#", hasSub: true },
  { name: "Reports", icon: BarChart3, href: "#", hasSub: true },
  { name: "Project & Task", icon: CheckSquare, href: "#", hasSub: true },
  { name: "Pricing and Billing", icon: CreditCard, href: "#", hasSub: true },
  { name: "Time Claim", icon: Clock, href: "#", hasSub: true },
  { name: "Time Entry", icon: CalendarRange, href: "#" },
  { name: "Holiday", icon: Sun, href: "#" },
  { name: "Trial", icon: Play, href: "#" },
  { name: "Configuration", icon: Settings, href: "#", hasSub: true },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-50">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <ShieldCheck className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">CUS Spy</h1>
          <p className="text-xs text-indigo-600 font-semibold tracking-wider">ADMIN PANEL</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                  : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "group-hover:text-indigo-600"}`} />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              {item.hasSub && (
                <ChevronRight className={`w-4 h-4 opacity-50 ${isActive ? "text-white" : "group-hover:text-indigo-600"}`} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-50 bg-gray-50/50">
        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:bg-white hover:text-indigo-600 transition-all duration-200 shadow-sm border border-transparent hover:border-indigo-100"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Support Forum</span>
          <div className="ml-auto bg-indigo-100 text-indigo-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            24
          </div>
        </Link>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
