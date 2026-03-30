"use client";

import React from "react";
import { Header } from "@/components/Header";
import {
  Users,
  Clock,
  Map,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    label: "Total Members",
    value: "148",
    change: "+12.5%",
    isPositive: true,
    icon: Users,
    color: "bg-indigo-50 text-indigo-600 border-indigo-100"
  },
  {
    label: "Logged Hours",
    value: "2,840h",
    change: "+4.2%",
    isPositive: true,
    icon: Clock,
    color: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    label: "Live Tracking",
    value: "92",
    change: "-2.1%",
    isPositive: false,
    icon: Map,
    color: "bg-emerald-50 text-emerald-600 border-emerald-100"
  },
  {
    label: "Active Projects",
    value: "24",
    change: "+5.1%",
    isPositive: true,
    icon: Activity,
    color: "bg-amber-50 text-amber-600 border-amber-100"
  },
];

const recentActivity = [
  { id: 1, user: "Sarah Connor", action: "joined My Team", time: "2 mins ago", status: "success" },
  { id: 2, user: "James Bond", action: "updated Live Location", time: "15 mins ago", status: "info" },
  { id: 3, user: "Tony Stark", action: "submitted Time Claim", time: "1 hour ago", status: "success" },
  { id: 4, user: "Peter Parker", action: "requested Holiday", time: "3 hours ago", status: "alert" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      <Header
        title="Dashboard Overview"
        description="Welcome back, Alex! Here's what's happening with your team today."
      />

      <div className="p-10 flex flex-col gap-10 max-w-7xl mx-auto w-full">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${stat.color} transition-all group-hover:scale-110 shadow-sm`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                <div className="flex items-end gap-3">
                  <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</h3>
                  <div className={`flex items-center gap-0.5 text-xs font-bold mb-1.5 px-2 py-0.5 rounded-full ${stat.isPositive ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"}`}>
                    {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Activity Overview</h3>
                <p className="text-sm text-gray-500 font-medium">Tracking performance over the last 7 days</p>
              </div>
              <select className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm font-bold text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>

            {/* Visual Placeholder for a Chart */}
            <div className="h-64 flex items-end gap-4 px-2">
              {[60, 45, 80, 55, 90, 70, 85].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                  <div className="w-full relative">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 0.8, ease: "easeOut" }}
                      className="w-full rounded-t-xl bg-indigo-50 border-t-2 border-indigo-400 group-hover:bg-indigo-600 transition-all duration-300 relative"
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {height}%
                      </div>
                    </motion.div>
                  </div>
                  <span className="text-xs font-bold text-gray-400">Day {i + 1}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-gray-900">Recent Notifications</h3>
              <button className="text-indigo-600 text-xs font-bold hover:underline">View All</button>
            </div>

            <div className="space-y-6">
              {recentActivity.map((activity, idx) => (
                <div key={activity.id} className="flex gap-4 group cursor-pointer">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all group-hover:scale-110 ${activity.status === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                    activity.status === 'info' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                    {activity.status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      <span className="font-bold">{activity.user}</span> {activity.action}
                    </p>
                    <span className="text-xs text-gray-400 font-bold">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 rounded-2xl bg-indigo-600 relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-indigo-100 text-xs font-bold uppercase tracking-widest mb-1">PRO PREVIEW</p>
                <h4 className="text-white font-bold mb-3">Upgrade to unlock advanced monitoring</h4>
                <button className="bg-white text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 transition-all shadow-lg active:scale-95">
                  Learn More
                </button>
              </div>
              <ShieldCheck className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 -rotate-12 transition-transform group-hover:scale-125 group-hover:-rotate-45 duration-700" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ShieldCheck({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
  );
}
