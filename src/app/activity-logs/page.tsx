"use client";

import React, { useEffect, useState } from "react";
import {
  Activity,
  Monitor,
  Clock,
  Search,
  Loader2,
  ExternalLink,
  Globe,
  User as UserIcon,
  X,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface ActivityLog {
  _id: string;
  userId: string;
  userName?: string;
  title: string;
  app_name: string;
  site?: string;
  start_time: string;
  duration_seconds: number;
}

export default function ActivityLogs() {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/users");
        const result = await response.json();
        if (result.success) {
          setUsers(result.data);
        } else {
          setError(result.error || "Failed to fetch users");
        }
      } catch (err) {
        setError("An error occurred while fetching users.");
      } finally {
        setLoadingUsers(false);
      }
    }
    fetchUsers();
  }, []);

  const openUserLogs = async (user: User) => {
    setSelectedUser(user);
    setLoadingLogs(true);
    setLogs([]);
    try {
      const response = await fetch(`/api/activity-log?userId=${user._id}`);
      const result = await response.json();
      if (result.success) {
        setLogs(result.data);
      }
    } catch (err) {
      console.error("Error fetching logs:", err);
    } finally {
      setLoadingLogs(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (mins > 0) parts.push(`${mins}m`);
    parts.push(`${secs}s`);
    return parts.join(" ");
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-[1600px] mx-auto min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
              <Activity className="w-6 h-6 text-white" />
            </div>
            Activity Monitoring
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            High-precision tracking metrics organized by user accounts.
          </p>
        </div>

        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
          <input
            type="text"
            placeholder="Search users or roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-6 py-3.5 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none w-full md:w-[400px] transition-all text-sm shadow-sm"
          />
        </div>
      </div>

      {loadingUsers ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/20 shadow-2xl">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-6" />
          <p className="text-gray-600 font-semibold text-lg">Initializing workforce data...</p>
        </div>
      ) : error ? (
        <div className="p-16 text-center bg-red-50/50 backdrop-blur-sm rounded-[2.5rem] border border-red-100 shadow-xl">
          <p className="text-red-600 font-bold text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-200"
          >
            Reconnect to System
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <motion.div
              layoutId={user._id}
              key={user._id}
              onClick={() => openUserLogs(user)}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-indigo-100/10 cursor-pointer group transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                  <UserIcon className="w-7 h-7" />
                </div>
                <div className="px-3 py-1 bg-gray-50 rounded-full border border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  {user.role}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                {user.username}
              </h3>
              <p className="text-gray-400 text-sm mt-1 font-medium">{user.email}</p>

              <div className="mt-6 flex items-center justify-between group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-xs font-bold text-indigo-500 uppercase">View Activity logs</span>
                <ArrowRight className="w-4 h-4 text-indigo-500" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Logs Modal */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[3rem] shadow-2xl border border-white flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                    <Activity className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 leading-tight">
                      {selectedUser.username.toUpperCase()} Activity
                    </h2>
                    <p className="text-gray-500 font-semibold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Feed • Role: {selectedUser.role}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 transition-all border border-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                {loadingLogs ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin mb-4" />
                    <p className="text-gray-500 font-bold">Synchronizing real-time logs...</p>
                  </div>
                ) : logs.length === 0 ? (
                  <div className="py-20 text-center bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-200">
                    <Monitor className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-700">No activity recorded yet</h3>
                    <p className="text-gray-400 mt-2 font-medium">System is waiting for user session data...</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/50">
                          <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-[0.15em] border-b border-gray-100">Application</th>
                          <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-[0.15em] border-b border-gray-100">WindowTitle / Context</th>
                          <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-[0.15em] border-b border-gray-100">Start Time</th>
                          <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-[0.15em] border-b border-gray-100 text-right">Session</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {logs.map((log) => (
                          <tr key={log._id} className="hover:bg-indigo-50/20 transition-all group">
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl border ${log.site ? 'bg-blue-50 border-blue-100 text-blue-600' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>
                                  {log.site ? <Globe className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                                </div>
                                <div className="max-w-[150px]">
                                  <p className="text-sm font-bold text-gray-900 truncate uppercase tracking-tight">{log.app_name}</p>
                                  {log.site && (
                                    <p className="text-[10px] font-bold text-indigo-500 truncate hover:underline flex items-center gap-1">
                                      {log.site} <ExternalLink className="w-2 h-2" />
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <p className="text-sm text-gray-600 font-medium max-w-[350px] line-clamp-2 leading-relaxed" title={log.title}>
                                {log.title}
                              </p>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-900">{format(new Date(log.start_time), "MMM d, HH:mm")}</span>
                                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                                  {formatDistanceToNow(new Date(log.start_time), { addSuffix: true })}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-right font-mono">
                              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-black transition-all ${log.duration_seconds > 300
                                ? 'bg-amber-50 border-amber-100 text-amber-700 shadow-sm shadow-amber-50'
                                : 'bg-indigo-50 border-indigo-100 text-indigo-700'
                                }`}>
                                <Clock className="w-3.5 h-3.5" />
                                {formatDuration(log.duration_seconds)}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between shrink-0">
                <span className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                  Synchronized with sidecar
                </span>
                <p className="text-sm font-bold text-gray-900">
                  <span className="text-indigo-600">{logs.length}</span> EVENTS LOGGED
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 20px;
          border: 2px solid #f8fafc;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
