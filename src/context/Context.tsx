import { ReactNode, createContext, useEffect, useState, useCallback } from "react";
import { TabsType, Task, TaskContextType } from "../types/Types";

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [activeTab, setActiveTab] = useState<TabsType>('All');
  const [taskEditId, setTaskEditId] = useState<number | null>(null);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const createTask = useCallback((task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  }, []);

  const deleteTask = useCallback((id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  const editTask = useCallback((currentTask: Task) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === currentTask.id ? { ...currentTask } : task
    ));
  }, []);

  const changeEditId = useCallback((id: number | null) => {
    setTaskEditId(id);
  }, []);

  const toggleTabs = useCallback((activeTab: TabsType) => {
    setActiveTab(activeTab);
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, taskEditId, activeTab, createTask, deleteTask, editTask, toggleTabs, changeEditId }}>
      {children}
    </TaskContext.Provider>
  );
};
