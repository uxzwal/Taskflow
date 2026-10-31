import React, { useState } from 'react';
import { TaskStatus } from './TaskCard';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: { title: string; description: string; status: TaskStatus }) => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('pending');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description: description.trim(), status });
    setTitle('');
    setDescription('');
    setStatus('pending');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-all duration-150">
      <div className="w-full max-w-lg bg-white border-[4px] border-black rounded-2xl shadow-[10px_10px_0px_0px_#000] overflow-hidden transform transition-all duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b-[3px] border-black bg-[#FFC900] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">✦</span>
            <div>
              <h3 className="text-base font-black uppercase text-black tracking-tight">Create New Task</h3>
              <p className="text-xs font-bold text-black/80 uppercase">Add an item to the task queue</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white text-black font-black border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#FF6B6B] hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Task Title <span className="text-[#FF6B6B]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.G., PROVISION TERRAFORM EC2 INSTANCE"
              className="w-full px-4 py-2.5 text-sm font-bold bg-[#F4F1EA] border-[2.5px] border-black rounded-xl text-black placeholder-slate-500 shadow-[3px_3px_0px_0px_#000] focus:outline-none focus:ring-4 focus:ring-black transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Description (Optional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add relevant engineering notes, PR URLs, or acceptance criteria..."
              className="w-full px-4 py-2.5 text-sm font-bold bg-[#F4F1EA] border-[2.5px] border-black rounded-xl text-black placeholder-slate-500 shadow-[3px_3px_0px_0px_#000] focus:outline-none focus:ring-4 focus:ring-black transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-black mb-1.5">
              Initial Status
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setStatus('pending')}
                className={`p-2.5 rounded-xl border-[2.5px] border-black text-center font-black uppercase text-xs transition-all cursor-pointer ${
                  status === 'pending'
                    ? 'bg-[#FFC900] shadow-[4px_4px_0px_0px_#000]'
                    : 'bg-white shadow-[2px_2px_0px_0px_#000] hover:bg-slate-100'
                }`}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => setStatus('in_progress')}
                className={`p-2.5 rounded-xl border-[2.5px] border-black text-center font-black uppercase text-xs transition-all cursor-pointer ${
                  status === 'in_progress'
                    ? 'bg-[#90A8ED] shadow-[4px_4px_0px_0px_#000]'
                    : 'bg-white shadow-[2px_2px_0px_0px_#000] hover:bg-slate-100'
                }`}
              >
                In Progress
              </button>
              <button
                type="button"
                onClick={() => setStatus('completed')}
                className={`p-2.5 rounded-xl border-[2.5px] border-black text-center font-black uppercase text-xs transition-all cursor-pointer ${
                  status === 'completed'
                    ? 'bg-[#B8FF9F] shadow-[4px_4px_0px_0px_#000]'
                    : 'bg-white shadow-[2px_2px_0px_0px_#000] hover:bg-slate-100'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="pt-4 border-t-[3px] border-black flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-xs font-black uppercase text-black bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] hover:bg-slate-200 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-black uppercase text-black bg-[#FF90E8] border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              Create Task ✦
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
