"use client";
import { useState, useEffect } from "react";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, loaded]);

  const addTask = (title, dueDate) =>
    setTasks((t) => [...t, { id: Date.now(), title, dueDate, done: false }]);

  const toggleTask = (id) =>
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));

  const deleteTask = (id) => setTasks((t) => t.filter((x) => x.id !== id));

  return { tasks, addTask, toggleTask, deleteTask };
}