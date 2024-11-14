import { ChangeEvent, useEffect, useState, useRef } from "react";
import { useTaskContext } from "../hooks/Hooks";

function Form() {
  const { createTask, tasks, taskEditId, editTask, changeEditId, toggleTabs, deleteTask} = useTaskContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [id, setId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [file, setFile] = useState<File | null | undefined>(null);
  const [isActiveButton, setIsActiveButton] = useState(true);

  useEffect(() => {
    const taskToEdit = tasks.find(task => task.id === taskEditId);

    if (taskToEdit) {
      const { id, title, description, completed, file } = taskToEdit;
      setId(id);
      setTitle(title);
      setDescription(description);
      setCompleted(completed);
      setFile(file);

      if (fileInputRef.current && file) {
        fileInputRef.current.value = "";
      }
    }
  }, [taskEditId]);

  useEffect(() => {
    setIsActiveButton(!title.trim() || !description.trim());
  }, [title, description]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      id: id || Date.now(),
      title,
      description,
      completed,
      file: file || null
    };

    if (id) {
      editTask(taskData);
    } else {
      createTask(taskData);
    }

    resetForm();
  };

  const resetForm = () => {
    setId(null);
    setTitle('');
    setDescription('');
    setCompleted(false);
    setFile(null);
    changeEditId(null);
    toggleTabs('All');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const buttonText = id ? "Edit Task" : "Add Task";

  return (
    <div className="bg-slate-700 p-5 rounded-md w-full h-fit">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="flex flex-col gap-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Task Title"
            className="w-full p-3 rounded-lg bg-slate-600 text-yellow-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Task Description"
            className="w-full p-3 rounded-lg bg-slate-600 text-yellow-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <div className="flex items-center gap-2">
            <input
              id="task"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              type="checkbox"
              className="h-5 w-5 text-yellow-400 rounded focus:ring-yellow-400 focus:ring-2"
            />
            <label htmlFor="task" className="text-yellow-300">Mark as Completed</label>
          </div>

          <label htmlFor="fileInput" className="w-full text-yellow-300 cursor-pointer flex justify-center items-center bg-slate-600 p-3 rounded-lg hover:bg-yellow-400 transition">
            {file?.name ? `Selected file: ${file.name}` : "Choose file"}
          </label>
          <input
            id="fileInput"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                resetForm();
              }}
              className="mt-4 w-full p-3 bg-yellow-500 text-slate-900 rounded-lg hover:bg-yellow-600 transition font-semibold"
            >
              Cancel
            </button>

            {id && (
              <button
              onClick={() => {
                deleteTask(id);
              }}
              className="mt-4 w-full p-3 bg-red-700 text-slate-900 rounded-lg hover:bg-red-900 transition font-semibold"
            >
              Delete Task
            </button>
            )}
            <button
              type="submit"
              disabled={isActiveButton}
              className="mt-4 w-full p-3 bg-green-500 text-slate-900 rounded-lg hover:bg-green-600 transition font-semibold disabled:bg-slate-500 disabled:text-yellow-600 disabled:pointer-events-none"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
