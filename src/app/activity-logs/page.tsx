"use client";

import React, { useEffect, useState } from "react";
import {
  Activity,
  Monitor,
  Clock,
  Calendar,
  Search,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ExternalLink,
  Globe
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

interface ActivityLog {
  _id: string;
  userId: string;
  title: string;
  app_name: string;
  site?: string;
  start_time: string;
  duration_seconds: number;
  createdAt: string;
}

export default function ActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await fetch("/api/activity-log");
        const result = await response.json();
        if (result.success) {
          setLogs(result.data);
        } else {
          setError(result.error || "Failed to fetch logs");
        }
      } catch (err) {
        setError("An error occurred while fetching activity logs.");
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (mins > 0) parts.push(`${mins}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

    return parts.join(" ");
  };

  const filteredLogs = logs.filter(log =>
    log.app_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Activity className="w-6 h-6 text-indigo-600" />
            Activity Logs
          </h1>
          <p className="text-gray-500 mt-1">
            Real-time tracking of applications and website usage across all monitored machines.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search activity, app, or user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-full md:w-[300px] transition-all text-sm shadow-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 shadow-xl">
          <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Fetching sync data...</p>
        </div>
      ) : error ? (
        <div className="p-12 text-center bg-red-50 rounded-3xl border border-red-100 shadow-sm">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Retry Fetch
          </button>
        </div>
      ) : filteredLogs.length === 0 ? (
        <div className="p-16 text-center bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-gray-300">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No activities found</h3>
          <p className="text-gray-500">Try adjusting your search or check back later.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-indigo-100/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-bottom border-gray-100">
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User & Machine</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Application</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Activity Title</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Start Time</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-indigo-50/30 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-bold ring-2 ring-indigo-50 group-hover:ring-indigo-100 transition-all">
                          {log.userId.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{log.userId}</p>
                          <p className="text-[10px] text-gray-400 font-mono">ID: {log._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {log.site ? (
                          <div className="p-1.5 bg-blue-50 rounded-md">
                            <Globe className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                        ) : (
                          <div className="p-1.5 bg-gray-50 rounded-md">
                            <Monitor className="w-3.5 h-3.5 text-gray-600" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-800">{log.app_name}</p>
                          {log.site && (
                            <p className="text-[11px] text-indigo-600 flex items-center gap-0.5 hover:underline decoration-indigo-200 cursor-pointer">
                              {log.site} <ExternalLink className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 max-w-[300px] truncate leading-relaxed" title={log.title}>
                        {log.title}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-900">
                          {format(new Date(log.start_time), "MMM d, h:mm a")}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {formatDistanceToNow(new Date(log.start_time), { addSuffix: true })}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${log.duration_seconds > 300
                        ? "bg-amber-50 text-amber-700 border-amber-100"
                        : "bg-emerald-50 text-emerald-700 border-emerald-100"
                        }`}>
                        <Clock className="w-3 h-3" />
                        {formatDuration(log.duration_seconds)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer Controls */}
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500 font-medium">
              Showing <span className="text-indigo-600">{filteredLogs.length}</span> entries
            </p>
            <div className="flex gap-2">
              <button disabled className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button disabled className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-30">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}