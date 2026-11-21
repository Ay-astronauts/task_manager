import { Activity, Project, Task, User } from "./types";

export const currentUser: User = { id: "u1", name: "Ayo O.", email: "ayo@example.com", role: "owner" };
export const team: User[] = [currentUser, { id: "u2", name: "Joshua A.", email: "joshua@example.com", role: "member" }, { id: "u3", name: "Nnamdi I.", email: "nnamdi@example.com", role: "admin" }];
export const projects: Project[] = [
  { id: "p1", workspaceId: "w1", name: "Product launch", color: "#7c5cff", taskCount: 12 },
  { id: "p2", workspaceId: "w1", name: "Marketing site", color: "#18b6a4", taskCount: 8 },
  { id: "p3", workspaceId: "w1", name: "Operations", color: "#f59e0b", taskCount: 5 }
];
export const initialTasks: Task[] = [
  { id: "t1", projectId: "p1", title: "Finalize launch checklist", description: "Review owners and confirm the final go-live checklist.", priority: "Urgent", status: "In Progress", dueDate: "2026-11-18", tags: ["Launch", "Planning"], assignee: currentUser, recurrence: "None", archived: false, subtasks: [], comments: [], createdAt: "2026-11-12" },
  { id: "t2", projectId: "p1", title: "Prepare customer announcement", description: "Write and schedule the announcement email.", priority: "High", status: "To Do", dueDate: "2026-11-20", tags: ["Marketing"], assignee: team[1], recurrence: "None", archived: false, subtasks: [], comments: [], createdAt: "2026-11-11" },
  { id: "t3", projectId: "p2", title: "Mobile navigation QA", description: "Check responsive states on iOS and Android breakpoints.", priority: "Medium", status: "In Review", dueDate: "2026-11-16", tags: ["Design", "QA"], assignee: team[2], recurrence: "Weekly", archived: false, subtasks: [], comments: [], createdAt: "2026-11-09" },
  { id: "t4", projectId: "p2", title: "Ship analytics events", description: "Add product events for the activation funnel.", priority: "Low", status: "Done", dueDate: "2026-11-14", tags: ["Engineering"], assignee: currentUser, recurrence: "None", archived: false, subtasks: [], comments: [], createdAt: "2026-11-05" },
  { id: "t5", projectId: "p3", title: "Update team handbook", description: "Document the new weekly planning ritual.", priority: "Medium", status: "To Do", dueDate: "2026-11-22", tags: ["People"], assignee: team[1], recurrence: "Monthly", archived: false, subtasks: [], comments: [], createdAt: "2026-11-10" }
];
export const activities: Activity[] = [
  { id: "a1", actor: currentUser, action: "moved", target: "Finalize launch checklist to In Progress", createdAt: "10 min ago" },
  { id: "a2", actor: team[1], action: "commented on", target: "Prepare customer announcement", createdAt: "1 hr ago" },
  { id: "a3", actor: team[2], action: "completed", target: "Ship analytics events", createdAt: "Yesterday" }
];
