import React from 'react';

interface StatsRowProps {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

export const StatsRow: React.FC<StatsRowProps> = ({ total, pending, inProgress, completed }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 shadow-sm hover:border-slate-700 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Total Tasks</span>
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-white tracking-tight">{total}</span>
          <span className="text-[11px] text-slate-500 font-medium">registered</span>
        </div>
      </div>

      {/* Pending */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 shadow-sm hover:border-slate-700 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Pending</span>
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-sky-400 tracking-tight">{pending}</span>
          <span className="text-[11px] text-slate-500 font-medium">in queue</span>
        </div>
      </div>

      {/* In Progress */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 shadow-sm hover:border-slate-700 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">In Progress</span>
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-amber-400 tracking-tight">{inProgress}</span>
          <span className="text-[11px] text-slate-500 font-medium">active</span>
        </div>
      </div>

      {/* Completed */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 shadow-sm hover:border-slate-700 transition-all group">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Completed</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-emerald-400 tracking-tight">{completed}</span>
          <span className="text-[11px] text-slate-500 font-medium">done</span>
        </div>
      </div>
    </section>
  );
};
