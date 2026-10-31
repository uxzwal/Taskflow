import React from 'react';

interface SidebarProps {
  taskCount: number;
  apiHealthy: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ taskCount, apiHealthy }) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-slate-900/95 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 z-30">
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800/80">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              TaskFlow
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                v1.0
              </span>
            </span>
            <span className="block text-[11px] text-slate-400 font-medium -mt-0.5">DevOps Platform</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            Workspace
          </div>

          <a
            href="#dashboard"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 shadow-sm transition-colors"
          >
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </a>

          <a
            href="#tasks"
            className="flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Tasks
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-semibold">
              {taskCount}
            </span>
          </a>

          <div className="pt-4 px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            Observability
          </div>

          <a
            href="/metrics"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Prometheus Metrics
          </a>

          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
          >
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            Grafana Dashboard
          </a>
        </nav>
      </div>

      {/* User Profile & Health Footer */}
      <div className="p-4 border-t border-slate-800/80 space-y-3">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/70">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              {apiHealthy && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  apiHealthy ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
            </span>
            <span
              className={`text-xs font-medium ${
                apiHealthy ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {apiHealthy ? 'API Connected' : 'API Offline'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            {apiHealthy ? '200 OK' : 'ERR'}
          </span>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-semibold text-xs text-white ring-2 ring-slate-800">
            LI
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-200 truncate">Lucy Intern</div>
            <div className="text-[11px] text-slate-400 truncate">DevOps Engineer</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
