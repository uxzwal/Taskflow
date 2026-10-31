import React from 'react';

interface StatsRowProps {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

export const StatsRow: React.FC<StatsRowProps> = ({ total, pending, inProgress, completed }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Total (Vibrant Pink) */}
      <div className="p-5 rounded-2xl bg-[#FF90E8] border-[3px] border-black shadow-[6px_6px_0px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
            <span>✦</span> Total Tasks
          </span>
          <span className="text-lg">📁</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-4xl font-black text-black tracking-tight">{total}</span>
          <span className="text-xs font-black uppercase text-black/80">Registered</span>
        </div>
      </div>

      {/* Pending (Bright Yellow) */}
      <div className="p-5 rounded-2xl bg-[#FFC900] border-[3px] border-black shadow-[6px_6px_0px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
            <span>✦</span> Pending
          </span>
          <span className="text-lg">⏳</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-4xl font-black text-black tracking-tight">{pending}</span>
          <span className="text-xs font-black uppercase text-black/80">In Queue</span>
        </div>
      </div>

      {/* In Progress (Electric Blue) */}
      <div className="p-5 rounded-2xl bg-[#90A8ED] border-[3px] border-black shadow-[6px_6px_0px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
            <span>✦</span> In Progress
          </span>
          <span className="text-lg">⚡</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-4xl font-black text-black tracking-tight">{inProgress}</span>
          <span className="text-xs font-black uppercase text-black/80">Active Now</span>
        </div>
      </div>

      {/* Completed (Lime Green) */}
      <div className="p-5 rounded-2xl bg-[#B8FF9F] border-[3px] border-black shadow-[6px_6px_0px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
            <span>✦</span> Completed
          </span>
          <span className="text-lg">✔</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-4xl font-black text-black tracking-tight">{completed}</span>
          <span className="text-xs font-black uppercase text-black/80">Shipped</span>
        </div>
      </div>
    </section>
  );
};
