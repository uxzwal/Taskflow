import React from 'react';

interface SidebarProps {
  taskCount: number;
  apiHealthy: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ taskCount, apiHealthy }) => {
  return (
    <aside className="w-72 flex-shrink-0 bg-white border-r-[3px] border-black flex flex-col justify-between z-30 shadow-[4px_0px_0px_0px_#000]">
      <div>
        {/* Brand Header */}
        <div className="h-20 flex items-center gap-3 px-6 border-b-[3px] border-black bg-[#FFC900]">
          <div className="w-10 h-10 rounded-xl bg-black text-[#B8FF9F] flex items-center justify-center font-black text-xl shadow-[3px_3px_0px_0px_#000] border-2 border-black">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-black uppercase">TaskFlow</span>
              <span className="text-[10px] font-black tracking-wider px-2 py-0.5 rounded-full bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_#000]">
                v1.0
              </span>
            </div>
            <span className="text-xs font-bold text-black uppercase tracking-wider block">DevOps Platform</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <div className="px-2 pb-1 text-[11px] font-black tracking-widest text-black uppercase">
            ✦ Workspace
          </div>

          <a
            href="#dashboard"
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-black uppercase rounded-xl bg-[#90A8ED] text-black border-[3px] border-black shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <span className="text-base">❖</span>
            Dashboard
          </a>

          <a
            href="#tasks"
            className="flex items-center justify-between px-4 py-2.5 text-sm font-black uppercase rounded-xl bg-white text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#FF90E8] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-base">✔</span>
              Tasks
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-black text-white font-black border-2 border-black">
              {taskCount}
            </span>
          </a>

          <div className="pt-4 px-2 pb-1 text-[11px] font-black tracking-widest text-black uppercase">
            ✦ Observability
          </div>

          <a
            href="/metrics"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-black uppercase rounded-xl bg-white text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#B8FF9F] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <span className="text-base">📊</span>
            Prometheus
          </a>

          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-black uppercase rounded-xl bg-white text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-[#FFC900] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <span className="text-base">📈</span>
            Grafana Board
          </a>
        </nav>
      </div>

      {/* Bottom Health & User Profile */}
      <div className="p-4 border-t-[3px] border-black bg-[#F4F1EA] space-y-3">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000]">
          <div className="flex items-center gap-2">
            <span
              className={`w-3.5 h-3.5 rounded-full border-2 border-black inline-block ${
                apiHealthy ? 'bg-[#B8FF9F] animate-pulse' : 'bg-[#FF6B6B]'
              }`}
            />
            <span className="text-xs font-black uppercase text-black">
              {apiHealthy ? 'API Live' : 'API Offline'}
            </span>
          </div>
          <span className="text-[11px] font-black px-2 py-0.5 rounded bg-[#FFC900] border border-black text-black">
            200 OK
          </span>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000]">
          <div className="w-10 h-10 rounded-xl bg-[#FF90E8] border-2 border-black font-black text-sm text-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]">
            LI
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-black uppercase text-black truncate">Lucy Intern</div>
            <div className="text-[11px] font-bold text-slate-600 truncate">DevOps Engineer</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
