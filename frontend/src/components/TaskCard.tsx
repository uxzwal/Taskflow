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
          classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        };
      case 'in_progress':
        return {
          label: 'In Progress',
          classes: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        };
      default:
        return {
          label: 'Pending',
          classes: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
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
    <div className="group relative p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700/80 hover:bg-slate-900 shadow-sm transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badge.classes}`}
            >
              {badge.label}
            </span>
            <span className="text-[11px] font-mono text-slate-500">#{task.id}</span>
          </div>

          <h3 className="text-sm font-semibold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
            {task.title}
          </h3>

          {task.description && (
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Footer Metadata */}
          <div className="flex items-center gap-3 mt-3 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Created {timeAgo(task.created_at)}
            </span>
          </div>
        </div>

        {/* Actions: Status Dropdown & Ghost Delete */}
        <div className="flex items-center gap-2 self-start flex-shrink-0">
          <select
            value={task.status}
            onChange={(e) => onUpdateStatus(task.id, e.target.value as TaskStatus)}
            className="text-xs font-medium bg-slate-950 text-slate-300 border border-slate-700/80 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 hover:border-slate-600 transition-colors cursor-pointer"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {/* Ghost Delete Icon */}
          <button
            onClick={() => onDelete(task.id)}
            title="Delete task"
            className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all opacity-60 group-hover:opacity-100"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
