'use client';

import { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  Mail, 
  User as UserIcon,
  Filter
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { mockEmployees } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = mockEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Employee Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Add, edit, and manage your team members.</p>
        </div>
        <Button className="flex items-center gap-2 bg-[#5E35B1] hover:bg-[#5E35B1]/90">
          <Plus className="h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <Card>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-md">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-xl border border-slate-100 bg-slate-50/50 p-2.5 pl-10 text-sm text-slate-900 focus:border-[#5E35B1] focus:ring-[#5E35B1]   dark:text-white dark:placeholder-slate-400 transition-all"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="flex items-center gap-2 border-slate-100 text-slate-600">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <div className="relative overflow-x-auto rounded-xl border border-slate-50">
          <table className="w-full text-left text-sm text-slate-500 dark:text-slate-400">
            <thead className="bg-slate-50/50 text-xs font-bold uppercase text-slate-400  dark:text-slate-400 border-b border-slate-50">
              <tr>
                <th scope="col" className="px-6 py-4">Employee</th>
                <th scope="col" className="px-6 py-4">Role</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4">Last Active</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="bg-white hover:bg-slate-50/50 dark:border-slate-800   dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-[#5E35B1]" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{emp.name}</p>
                        <p className="text-xs text-slate-400">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                      emp.role === 'Admin' 
                        ? "bg-purple-50 text-[#5E35B1]" 
                        : "bg-slate-50 text-slate-500"
                    )}>
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        emp.status === 'active' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-slate-300 dark:bg-slate-600"
                      )} />
                      <span className="text-xs font-medium capitalize">{emp.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">
                    {emp.lastActive}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="p-2 text-slate-400 hover:text-[#5E35B1] hover:bg-purple-50 rounded-lg transition-all">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
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
