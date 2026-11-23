"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Bell, Filter, LayoutGrid, List, Plus, Search, Sun, Moon, TrendingUp } from "lucide-react";
import { useTheme } from "next-themes";
import { activities, currentUser, initialTasks, projects } from "../lib/mock-data";
import { Task, TaskStatus } from "../lib/types";
import Sidebar from "./sidebar";
import Kanban from "./kanban";
import ListView from "./list-view";
import TaskModal from "./task-modal";
import TaskDetails from "./task-details";
import CalendarView from "./calendar-view";
import { getSupabaseBrowserClient } from "../lib/supabase-browser";

export default function Dashboard() {
  const { theme, setTheme } = useTheme();
  const [tasks, setTasks] = useState(initialTasks);
  const [hydrated, setHydrated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<"board" | "list">("board");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All tasks");
  const [active, setActive] = useState("Overview");
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = window.localStorage.getItem("flowtask-tasks");
    if (saved) {
      try { setTasks(JSON.parse(saved) as Task[]); } catch { window.localStorage.removeItem("flowtask-tasks"); }
    }
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated) window.localStorage.setItem("flowtask-tasks", JSON.stringify(tasks)); }, [hydrated, tasks]);

  const visible = useMemo(() => tasks.filter(task => {
    const project = projects.find(item => item.id === task.projectId);
    const matchesActive = active === "My tasks" ? task.assignee?.id === currentUser.id
      : projects.some(item => item.name === active) ? project?.name === active : true;
    return !task.archived && matchesActive && (filter === "All tasks" || task.status === filter) &&
      `${task.title} ${task.description} ${task.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase());
  }), [active, filter, query, tasks]);

  function updateTask(id: string, patch: Partial<Task>) {
    setTasks(current => current.map(task => task.id === id ? { ...task, ...patch } : task));
    setSelectedTask(current => current?.id === id ? { ...current, ...patch } : current);
  }
  function updateStatus(id: string, status: TaskStatus) { updateTask(id, { status }); }
  function deleteTask(id: string) { setTasks(current => current.filter(task => task.id !== id)); setSelectedTask(null); }
  function archiveTask(id: string) { updateTask(id, { archived: true }); setSelectedTask(null); }
  function addComment(id: string, body: string) {
    const comment = { id: `comment-${Date.now()}`, author: currentUser, body, createdAt: new Date().toISOString() };
    setTasks(current => current.map(task => task.id === id ? { ...task, comments: [...task.comments, comment] } : task));
    setSelectedTask(current => current?.id === id ? { ...current, comments: [...current.comments, comment] } : current);
  }
  function addSubtask(id: string, title: string) {
    const child: Task = { id: `subtask-${Date.now()}`, projectId: "", title, description: "", priority: "Medium", status: "To Do", tags: [], recurrence: "None", archived: false, subtasks: [], comments: [], createdAt: new Date().toISOString(), parentId: id };
    setTasks(current => current.map(task => task.id === id ? { ...task, subtasks: [...task.subtasks, child] } : task));
    setSelectedTask(current => current?.id === id ? { ...current, subtasks: [...current.subtasks, child] } : current);
  }
  async function signOut() { await getSupabaseBrowserClient()?.auth.signOut(); }

  return <div className="flex min-h-screen bg-[#f7f8fc] dark:bg-slate-950">
    <Sidebar active={active} onNavigate={value => { setActive(value); setFilter("All tasks"); }} onSignOut={signOut} />
    <main className="min-w-0 flex-1">
      <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 dark:border-slate-800 dark:bg-slate-900 md:px-10">
        <div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-full bg-lavender text-sm font-black">AO</div><div><p className="text-sm font-bold dark:text-white">{active === "Overview" ? "Good morning, Ayo" : active}</p><p className="text-xs text-slate-400">Monday, November 16, 2026</p></div></div>
        <div className="relative flex items-center gap-2"><button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme" className="rounded-xl p-2 text-slate-500 hover:bg-slate-100">{mounted && theme === "dark" ? <Moon size={18}/> : <Sun size={18}/>}</button><button onClick={() => setShowNotifications(value => !value)} aria-label="Notifications" className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100"><Bell size={18}/><span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500"/></button>{showNotifications && <div className="absolute right-0 top-12 z-10 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl"><p className="font-bold">Notifications</p><p className="mt-2 text-sm text-slate-500">You have 2 tasks due this week.</p></div>}</div>
      </header>
      <div className="mx-auto max-w-[1500px] p-5 md:p-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-2 text-sm font-bold text-violet-600">Monday momentum</p><h1 className="text-3xl font-black tracking-tight dark:text-white md:text-4xl">{active === "Overview" ? "Your workspace" : active}</h1><p className="mt-2 text-slate-500">{active === "Calendar" ? "See every deadline in one place." : "Keep the important work moving forward."}</p></div><button onClick={() => setShowModal(true)} className="flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white shadow-lg shadow-ink/20"><Plus size={18}/>New task</button></div>
        {active === "Calendar" ? <><button onClick={() => setActive("Overview")} className="mb-5 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm hover:bg-slate-50"><ArrowLeft size={16}/>Back to workspace</button><CalendarView tasks={tasks.filter(task => !task.archived)} onSelect={setSelectedTask}/></> : <>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div className="card bg-ink p-5 text-white"><div className="flex items-center justify-between"><p className="text-sm text-white/60">Completed this week</p><TrendingUp size={18} className="text-mint"/></div><p className="mt-3 text-3xl font-black">{tasks.filter(task => task.status === "Done").length}</p><p className="mt-2 text-xs text-white/60">Live from your workspace</p></div><div className="card p-5"><p className="text-sm text-slate-500">Open tasks</p><p className="mt-3 text-3xl font-black">{tasks.filter(task => !task.archived && task.status !== "Done").length}</p><p className="mt-2 text-xs text-amber-600">Keep momentum going</p></div><div className="card p-5"><p className="text-sm text-slate-500">Completion rate</p><p className="mt-3 text-3xl font-black">{tasks.length ? Math.round(tasks.filter(task => task.status === "Done").length / tasks.length * 100) : 0}%</p><div className="mt-3 h-1.5 rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-400" style={{ width: `${tasks.length ? tasks.filter(task => task.status === "Done").length / tasks.length * 100 : 0}%` }}/></div></div><div className="card p-5"><p className="text-sm text-slate-500">Archived</p><p className="mt-3 text-3xl font-black">{tasks.filter(task => task.archived).length}</p><p className="mt-2 text-xs text-slate-400">Hidden from active views</p></div></div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><button onClick={() => setView("board")} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${view === "board" ? "bg-white shadow-sm" : "text-slate-400"}`}><LayoutGrid size={16}/>Board</button><button onClick={() => setView("list")} className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold ${view === "list" ? "bg-white shadow-sm" : "text-slate-400"}`}><List size={16}/>List</button></div><div className="flex flex-wrap gap-2"><div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2"><Search size={16} className="text-slate-400"/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search tasks..." className="w-32 bg-transparent text-sm outline-none"/></div><select value={filter} onChange={event => setFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold"><option>All tasks</option><option>To Do</option><option>In Progress</option><option>In Review</option><option>Done</option></select><button onClick={() => setFilter(filter === "All tasks" ? "In Progress" : "All tasks")} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold"><Filter size={15}/>Filters</button></div></div>
          <div className="overflow-x-auto">{view === "board" ? <Kanban tasks={visible} onStatusChange={updateStatus} onSelect={setSelectedTask}/> : <ListView tasks={visible} onStatusChange={updateStatus} onSelect={setSelectedTask}/>}</div>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]"><div className="card p-5"><div className="mb-5 flex items-center justify-between"><h2 className="font-black">Upcoming deadlines</h2><button onClick={() => setActive("Calendar")} className="text-sm font-bold text-violet-600">View calendar</button></div>{visible.filter(task => task.status !== "Done").slice(0, 3).map(task => <button onClick={() => setSelectedTask(task)} key={task.id} className="flex w-full items-center gap-3 border-b border-slate-100 py-3 text-left last:border-0"><span className="h-2 w-2 rounded-full bg-amber-400"/><p className="flex-1 text-sm font-semibold">{task.title}</p><span className="text-xs text-slate-400">{task.dueDate}</span></button>)}</div><div className="card p-5"><h2 className="mb-5 font-black">Recent activity</h2>{activities.map(activity => <div key={activity.id} className="mb-4 flex gap-3 last:mb-0"><div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lavender text-xs font-bold">{activity.actor.name.slice(0, 2).toUpperCase()}</div><p className="text-sm leading-5 text-slate-600"><b>{activity.actor.name}</b> {activity.action} <b>{activity.target}</b><span className="block text-xs text-slate-400">{activity.createdAt}</span></p></div>)}</div></div>
        </>}
      </div>
    </main>
    {showModal && <TaskModal projects={projects} onClose={() => setShowModal(false)} onCreate={task => { setTasks(current => [task, ...current]); setShowModal(false); }}/>}
    {selectedTask && <TaskDetails task={selectedTask} onClose={() => setSelectedTask(null)} onSave={task => { updateTask(task.id, task); setSelectedTask(null); }} onDelete={deleteTask} onArchive={archiveTask} onComment={addComment} onSubtask={addSubtask}/>}
  </div>;
}
