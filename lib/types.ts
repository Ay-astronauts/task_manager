export type Priority = "Low" | "Medium" | "High" | "Urgent";
export type TaskStatus = "To Do" | "In Progress" | "In Review" | "Done";
export type Recurrence = "None" | "Daily" | "Weekly" | "Monthly";

export type User = { id: string; name: string; email: string; avatar?: string; role: "owner" | "admin" | "member" };
export type Task = {
  id: string; projectId: string; title: string; description: string; priority: Priority;
  status: TaskStatus; dueDate?: string; tags: string[]; assignee?: User; parentId?: string;
  recurrence: Recurrence; archived: boolean; subtasks: Task[]; comments: Comment[]; createdAt: string;
};
export type Project = { id: string; workspaceId: string; name: string; color: string; taskCount: number };
export type Comment = { id: string; author: User; body: string; createdAt: string };
export type Activity = { id: string; actor: User; action: string; target: string; createdAt: string };

export const priorities: Priority[] = ["Low", "Medium", "High", "Urgent"];
export const statuses: TaskStatus[] = ["To Do", "In Progress", "In Review", "Done"];
