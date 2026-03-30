"use client";

import { Search, Bell, Menu, UserCircle, LogOut } from "lucide-react";

export function Header({ title, description }: { title: string; description?: string }) {
  return (
    <header className="h-24 bg-white/70 backdrop-blur-xl border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-40">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-gray-500 font-medium">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2.5 rounded-full w-72 transition-all focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-400 group">
          <Search className="w-4 h-4 text-gray-400 group-focus-within:text-indigo-500" />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent border-none outline-none text-sm font-medium text-gray-900 w-full placeholder:text-gray-400"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-11 h-11 bg-white border border-gray-100 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all group shadow-sm hover:shadow-md">
          <Bell className="w-5 h-5 text-gray-500 group-hover:text-indigo-600 group-hover:rotate-12 transition-all" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-4 pl-4 border-l border-gray-100">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-gray-900 leading-none">Alex Johnson</span>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">Super Admin</span>
          </div>
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-xl shadow-indigo-100 transition-all hover:scale-105">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full translate-x-1/4 -translate-y-1/4"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
