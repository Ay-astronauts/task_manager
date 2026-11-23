"use client";
import { CalendarDays, CheckSquare, ChevronDown, Inbox, LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
import { projects } from "../lib/mock-data";

export default function Sidebar({ active, onNavigate, onSignOut }: { active: string; onNavigate: (value: string) => void; onSignOut: () => void }) {
  const nav = [["Overview", LayoutDashboard], ["My tasks", CheckSquare], ["Calendar", CalendarDays], ["Inbox", Inbox]] as const;
  return <aside className="hidden min-h-screen w-64 shrink-0 border-r border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 md:block">
    <div className="mb-9 flex items-center gap-2 px-2"><div className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-white"><CheckSquare size={19}/></div><span className="text-xl font-black tracking-tight">flowtask</span></div>
    <div className="mb-7 rounded-2xl bg-slate-50 p-3"><div className="flex items-center justify-between"><div><p className="text-xs text-slate-500">Workspace</p><p className="font-bold">Acme Studio</p></div><ChevronDown size={16}/></div></div>
    <nav className="space-y-1">{nav.map(([label, Icon]) => <button key={label} onClick={() => onNavigate(label)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${active === label ? "bg-lavender text-ink" : "text-slate-500 hover:bg-slate-50"}`}><Icon size={18}/>{label}</button>)}</nav>
    <div className="mt-9"><p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">Projects</p>{projects.map(p => <button key={p.id} onClick={() => onNavigate(p.name)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"><span className="h-2.5 w-2.5 rounded-full" style={{backgroundColor:p.color}} />{p.name}<span className="ml-auto text-xs text-slate-400">{p.taskCount}</span></button>)}</div>
    <div className="mt-auto pt-16"><button onClick={() => onNavigate("Members")} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 hover:bg-slate-50"><Users size={18}/>Members</button><button onClick={() => onNavigate("Settings")} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 hover:bg-slate-50"><Settings size={18}/>Settings</button><button onClick={onSignOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 hover:bg-slate-50"><LogOut size={18}/>Sign out</button></div>
  </aside>;
}
