'use client';

import { Bell, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 z-50 w-full bg-white   px-6 py-4 sm:ml-64 sm:w-[calc(100%-16rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 ">Hi Yash sapkale, Good Morning</h1>
          <p className="text-sm text-slate-400">1st April, 2026</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold text-white">
              9
            </span>
          </button>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-green-500 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop" 
                alt="User" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
