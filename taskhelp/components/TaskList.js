"use client";

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) return <p>No tasks yet. Add one above.</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.done ? "done" : ""}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggle(task.id)}
          />
          <span>{task.title}</span>
          {task.dueDate && <small>Due: {task.dueDate}</small>}
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}