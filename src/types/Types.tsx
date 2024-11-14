export type Task = {
  id: number,
  title: string,
  description: string,
  completed: boolean,
  file?: File | null,
}

export type TabsType = 'NewTask' | 'All' | 'Completed' | 'NotCompleted';

export type TaskContextType = {
  taskEditId: number | null;
  tasks: Task[];
  activeTab: TabsType;
  createTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  editTask: (currentTask: Task) => void;
  toggleTabs: (tab: TabsType) => void;
  changeEditId: (id: number | null) => void;
}

export type TabsContent = {
  name: TabsType;
  label: string;
}
