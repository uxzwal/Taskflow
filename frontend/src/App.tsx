import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { StatsRow } from './components/StatsRow';
import { TaskCard, Task, TaskStatus } from './components/TaskCard';
import { CreateTaskModal } from './components/CreateTaskModal';

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | TaskStatus>('all');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiHealthy, setApiHealthy] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks');
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch {
      // Offline fallback
    }
  };

  const checkHealth = async () => {
    try {
      const res = await fetch('/health');
      setApiHealthy(res.ok);
    } catch {
      setApiHealthy(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateTask = async (newTask: { title: string; description: string; status: TaskStatus }) => {
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    fetchTasks();
  };

  const handleUpdateStatus = async (id: number, status: TaskStatus) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, status } : t)));
    await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchTasks();
  };

  const handleDeleteTask = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    setTasks(prev => prev.filter(t => t.id !== id));
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  const filteredTasks = tasks.filter(t => {
    const matchesFilter = filter === 'all' || t.status === filter;
    const matchesSearch =
      search === '' ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const total = tasks.length;
  const pending = tasks.filter(t => t.status === 'pending').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const completed = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="h-full flex overflow-hidden antialiased bg-[#F4F1EA] text-black font-sans">
      {/* Sidebar */}
      <Sidebar taskCount={total} apiHealthy={apiHealthy} />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Banner */}
        <header className="h-20 flex-shrink-0 bg-white border-b-[3px] border-black px-8 flex items-center justify-between z-10 shadow-[0px_4px_0px_0px_#000]">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black uppercase tracking-tight text-black flex items-center gap-2">
              <span>✦ Good afternoon, Intern ✦</span>
            </h1>
            <span className="hidden md:inline-block px-3 py-1 text-xs font-black uppercase rounded-lg bg-[#FFC900] border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="FILTER TASKS... (⌘K)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 pl-4 pr-3 py-2 text-xs font-bold uppercase bg-white border-2 border-black rounded-xl text-black placeholder-slate-500 shadow-[3px_3px_0px_0px_#000] focus:outline-none focus:ring-4 focus:ring-black transition-all"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase rounded-xl bg-[#FF90E8] text-black border-[3px] border-black shadow-[5px_5px_0px_0px_#000] hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              <span>✚</span>
              Create Task
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-black rounded bg-white text-black border border-black ml-1">
                N
              </span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {/* Sticky Notes Stats Row */}
          <StatsRow total={total} pending={pending} inProgress={inProgress} completed={completed} />

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white rounded-2xl border-[3px] border-black shadow-[4px_4px_0px_0px_#000]">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-xs font-black uppercase rounded-xl transition-all ${
                  filter === 'all'
                    ? 'bg-black text-white shadow-none'
                    : 'text-black hover:bg-slate-100'
                }`}
              >
                All ({total})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 text-xs font-black uppercase rounded-xl transition-all ${
                  filter === 'pending'
                    ? 'bg-[#FFC900] text-black shadow-[2px_2px_0px_0px_#000]'
                    : 'text-black hover:bg-[#FFC900]'
                }`}
              >
                Pending ({pending})
              </button>
              <button
                onClick={() => setFilter('in_progress')}
                className={`px-4 py-2 text-xs font-black uppercase rounded-xl transition-all ${
                  filter === 'in_progress'
                    ? 'bg-[#90A8ED] text-black shadow-[2px_2px_0px_0px_#000]'
                    : 'text-black hover:bg-[#90A8ED]'
                }`}
              >
                In Progress ({inProgress})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-4 py-2 text-xs font-black uppercase rounded-xl transition-all ${
                  filter === 'completed'
                    ? 'bg-[#B8FF9F] text-black shadow-[2px_2px_0px_0px_#000]'
                    : 'text-black hover:bg-[#B8FF9F]'
                }`}
              >
                Completed ({completed})
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {filteredTasks.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_#000]">
                <span className="text-3xl block mb-2">✦</span>
                <h4 className="text-base font-black uppercase text-black">No Tasks Found</h4>
                <p className="text-xs font-bold text-slate-600 mt-1 uppercase">
                  {search ? 'Try adjusting your search criteria.' : 'Create a new task to get started!'}
                </p>
              </div>
            ) : (
              filteredTasks.map(t => (
                <TaskCard
                  key={t.id}
                  task={t}
                  onUpdateStatus={handleUpdateStatus}
                  onDelete={handleDeleteTask}
                />
              ))
            )}
          </div>
        </main>
      </div>

      {/* Modal */}
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
};

export default App;
