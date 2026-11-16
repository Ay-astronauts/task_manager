import { Task } from "../lib/types";

export default function CalendarView({ tasks, onSelect }: { tasks: Task[]; onSelect: (task: Task) => void }) {
  const days = Array.from({ length: 30 }, (_, index) => index + 1);
  return <div className="card overflow-hidden"><div className="grid grid-cols-7 border-b border-slate-100 text-center text-xs font-bold uppercase text-slate-400">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => <div key={day} className="p-3">{day}</div>)}</div><div className="grid grid-cols-7">{days.map(day => { const date = `2026-11-${String(day).padStart(2, "0")}`; const dayTasks = tasks.filter(task => task.dueDate === date); return <div key={day} className="min-h-28 border-b border-r border-slate-100 p-2"><span className={`text-xs font-bold ${day === 16 ? "grid h-6 w-6 place-items-center rounded-full bg-ink text-white" : "text-slate-400"}`}>{day}</span><div className="mt-2 space-y-1">{dayTasks.map(task => <button key={task.id} onClick={() => onSelect(task)} className="block w-full truncate rounded-lg bg-violet-100 px-2 py-1 text-left text-xs font-semibold text-violet-700">{task.title}</button>)}</div></div>; })}</div></div>;
}
