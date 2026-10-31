import React from 'react';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
}

interface TaskCardProps {
  task: Task;
  onUpdateStatus: (id: number, status: TaskStatus) => void;
  onDelete: (id: number) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdateStatus, onDelete }) => {
  const getBadgeConfig = () => {
    switch (task.status) {
      case 'completed':
        return {
          label: 'Completed',
          bg: 'bg-[#B8FF9F]',
        };
      case 'in_progress':
        return {
          label: 'In Progress',
          bg: 'bg-[#90A8ED]',
        };
      default:
        return {
          label: 'Pending',
          bg: 'bg-[#FFC900]',
        };
    }
  };

  const badge = getBadgeConfig();

  const timeAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="p-5 rounded-2xl bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] transition-all">
      <div className="flex items-start justify-between gap-4">
        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className={`text-xs font-black uppercase px-3 py-1 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_#000] ${badge.bg} text-black`}
            >
              {badge.label}
            </span>
            <span className="text-xs font-mono font-black text-black px-2 py-0.5 rounded bg-[#F4F1EA] border border-black">
              #{task.id}
            </span>
          </div>

          <h3 className="text-base font-black uppercase tracking-tight text-black">
            {task.title}
          </h3>

          {task.description && (
            <p className="text-xs font-bold text-slate-700 mt-1 leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Footer Metadata */}
          <div className="flex items-center gap-3 mt-3 text-xs font-black uppercase text-slate-500">
            <span>⏱ Created {timeAgo(task.created_at)}</span>
          </div>
        </div>

        {/* Actions: Neo-Brutalist Select & Bright Pink Delete Button */}
        <div className="flex items-center gap-2 self-start flex-shrink-0">
          <select
            value={task.status}
            onChange={(e) => onUpdateStatus(task.id, e.target.value as TaskStatus)}
            className="text-xs font-black uppercase bg-white text-black border-2 border-black rounded-xl px-3 py-2 shadow-[2px_2px_0px_0px_#000] focus:outline-none focus:ring-2 focus:ring-black cursor-pointer hover:bg-[#F4F1EA] transition-all"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {/* Small, Bright Pink Square Delete Button with Hard Shadow */}
          <button
            onClick={() => onDelete(task.id)}
            title="Delete task"
            className="w-8 h-8 rounded-xl bg-[#FF90E8] text-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#FF6B6B] hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none flex items-center justify-center transition-all cursor-pointer font-black text-sm"
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
};
