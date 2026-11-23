"use client";

import { Archive, Check, MessageCircle, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { currentUser } from "../lib/mock-data";
import { priorities, Task, TaskStatus } from "../lib/types";

export default function TaskDetails({
  task,
  onClose,
  onSave,
  onDelete,
  onArchive,
  onComment,
  onSubtask
}: {
  task: Task;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onComment: (id: string, body: string) => void;
  onSubtask: (id: string, title: string) => void;
}) {
  const [draft, setDraft] = useState(task);
  const [comment, setComment] = useState("");
  const [subtask, setSubtask] = useState("");
  const update = <K extends keyof Task>(key: K, value: Task[K]) => setDraft(current => ({ ...current, [key]: value }));
  useEffect(() => { setDraft(task); }, [task]);

  return <div className="fixed inset-0 z-30 overflow-y-auto bg-ink/40 p-4">
    <div className="mx-auto my-6 max-w-3xl rounded-2xl bg-white shadow-2xl dark:bg-slate-900">
      <div className="flex items-start justify-between border-b border-slate-100 p-6">
        <div><p className="text-xs font-bold uppercase tracking-widest text-violet-500">Task details</p><h2 className="mt-1 text-2xl font-black">{task.title}</h2></div>
        <button onClick={onClose} aria-label="Close task details"><X /></button>
      </div>
      <div className="grid gap-6 p-6 md:grid-cols-[1fr_260px]">
        <div>
          <label className="block text-sm font-bold">Title<input value={draft.title} onChange={e => update("title", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3" /></label>
          <label className="mt-4 block text-sm font-bold">Description<textarea value={draft.description} onChange={e => update("description", e.target.value)} rows={5} className="mt-2 w-full resize-none rounded-xl border border-slate-200 p-3" /></label>
          <div className="mt-6 flex items-center justify-between"><h3 className="font-black">Subtasks</h3><span className="text-xs text-slate-400">{draft.subtasks.length}/3 levels supported</span></div>
          <div className="mt-3 space-y-2">{draft.subtasks.map(item => <div key={item.id} className="flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-sm"><Check size={16} className="text-emerald-500" />{item.title}</div>)}</div>
          {draft.subtasks.length < 3 && <div className="mt-3 flex gap-2"><input value={subtask} onChange={e => setSubtask(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); if (subtask.trim()) { onSubtask(task.id, subtask.trim()); setSubtask(""); } } }} placeholder="Add a subtask" className="min-w-0 flex-1 rounded-xl border border-slate-200 p-3 text-sm" /><button type="button" aria-label="Add subtask" onClick={() => { if (subtask.trim()) { onSubtask(task.id, subtask.trim()); setSubtask(""); } }} className="rounded-xl bg-slate-100 px-3"><Plus size={18}/></button></div>}
          <h3 className="mt-8 flex items-center gap-2 font-black"><MessageCircle size={18}/>Comments</h3>
          <div className="mt-3 space-y-3">{task.comments.map(item => <div key={item.id} className="rounded-xl bg-slate-50 p-3 text-sm"><b>{item.author.name}</b><p className="mt-1 text-slate-600">{item.body}</p></div>)}{!task.comments.length && <p className="text-sm text-slate-400">No comments yet.</p>}</div>
          <div className="mt-3 flex gap-2"><input value={comment} onChange={e => setComment(e.target.value)} placeholder="Write a comment or mention @teammate" className="min-w-0 flex-1 rounded-xl border border-slate-200 p-3 text-sm" /><button onClick={() => { if (comment.trim()) { onComment(task.id, comment.trim()); setComment(""); } }} className="rounded-xl bg-ink px-4 text-sm font-bold text-white">Post</button></div>
        </div>
        <div className="space-y-4 rounded-2xl bg-slate-50 p-4">
          <label className="block text-xs font-bold uppercase text-slate-400">Status<select value={draft.status} onChange={e => update("status", e.target.value as TaskStatus)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"><option>To Do</option><option>In Progress</option><option>In Review</option><option>Done</option></select></label>
          <label className="block text-xs font-bold uppercase text-slate-400">Priority<select value={draft.priority} onChange={e => update("priority", e.target.value as Task["priority"])} className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm">{priorities.map(value => <option key={value}>{value}</option>)}</select></label>
          <label className="block text-xs font-bold uppercase text-slate-400">Due date<input type="date" value={draft.dueDate ?? ""} onChange={e => update("dueDate", e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm" /></label>
          <button onClick={() => onSave(draft)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink p-3 text-sm font-bold text-white"><Check size={16}/>Save changes</button>
          <button onClick={() => onArchive(task.id)} className="flex w-full items-center justify-center gap-2 rounded-xl p-3 text-sm font-bold text-amber-700 hover:bg-amber-50"><Archive size={16}/>Archive task</button>
          <button onClick={() => onDelete(task.id)} className="flex w-full items-center justify-center gap-2 rounded-xl p-3 text-sm font-bold text-rose-600 hover:bg-rose-50"><Trash2 size={16}/>Delete task</button>
        </div>
      </div>
    </div>
  </div>;
}
