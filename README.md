# Flowtask

## Architecture and schema

Flowtask is a Next.js App Router application with a client-side feature shell and a repository seam for Supabase. The default UI uses typed mock data so the project runs without credentials; the SQL migration in [`supabase/migrations/001_initial_schema.sql`](./supabase/migrations/001_initial_schema.sql) is ready for a Supabase-backed adapter.

The data model is workspace-first: `profiles` belong to `workspace_members`, workspaces own `projects`, and projects own nested `tasks`. A task can reference another task as `parent_id` and is limited to depth 3. Tags are normalized in `task_tags`; collaboration is represented by `comments`; every important mutation can be written to `activity_logs`. Row-level security policies restrict project and task access to workspace members.

```text
Next.js App Router
  app/layout.tsx + app/page.tsx
  components/dashboard.tsx (view state, filters, local adapter)
    sidebar.tsx, task-modal.tsx, kanban.tsx, list-view.tsx
  lib/types.ts (shared domain types)
  lib/mock-data.ts (offline development adapter)
  Supabase Auth + Postgres + Realtime (production adapter)
```

### Folder structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  dashboard.tsx
  kanban.tsx
  list-view.tsx
  sidebar.tsx
  task-modal.tsx
lib/
  mock-data.ts
  types.ts
supabase/migrations/001_initial_schema.sql
.env.example
```

## Local setup

1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`. Leave values empty to use the offline mock adapter, or add your Supabase project URL and anon key.
4. Run `npm run dev`, then open `http://localhost:3000`.
5. To use Supabase, create a project, run the migration in the SQL editor, enable Email and Google providers in Auth, and replace the mock repository with Supabase queries using the types in `lib/types.ts`.

The included UI demonstrates responsive dashboard cards, searchable/filterable tasks, list and Kanban views, task creation, status changes, projects, activity, deadline summaries, and dark-mode-ready theme infrastructure. Drag-and-drop can be added to `components/kanban.tsx` by wiring `onDragEnd` to the existing `onStatusChange` callback; the select fallback keeps the board usable on touch devices.
