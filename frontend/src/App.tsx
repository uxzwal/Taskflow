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
      // Handle offline
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
    // Optimistic update
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
    <div className="h-full flex overflow-hidden antialiased bg-slate-950 text-slate-100 font-sans">
      {/* Sidebar */}
      <Sidebar taskCount={total} apiHealthy={apiHealthy} />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex-shrink-0 bg-slate-900/50 backdrop-blur-md border-b border-slate-800/80 px-8 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-white tracking-tight">Good afternoon, Intern 👋</h1>
            <span className="text-slate-600 hidden sm:inline">&bull;</span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search tasks... (⌘K)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 pl-3 pr-3 py-1.5 text-xs bg-slate-900/90 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
              </svg>
              Create Task
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {/* Stats Row */}
          <StatsRow total={total} pending={pending} inProgress={inProgress} completed={completed} />

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  filter === 'all'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All ({total})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  filter === 'pending'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pending ({pending})
              </button>
              <button
                onClick={() => setFilter('in_progress')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  filter === 'in_progress'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                In Progress ({inProgress})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                  filter === 'completed'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Completed ({completed})
              </button>
            </div>
          </div>

          {/* Task List */}
          <div className="space-y-2.5">
            {filteredTasks.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80">
                <h4 className="text-sm font-semibold text-slate-300">No tasks found</h4>
                <p className="text-xs text-slate-500 mt-1">
                  {search ? 'Try adjusting your search criteria.' : 'Create a new task to get started.'}
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
