import { useTaskContext } from "../hooks/Hooks";
function Tasks() {

  const { tasks, deleteTask, activeTab, changeEditId, taskEditId, toggleTabs } = useTaskContext();

 const filteredTasks = tasks.filter((task) => {
  if (activeTab === "All") return true;
  if (activeTab === "Completed") return task.completed;
  if (activeTab === "NotCompleted") return !task.completed;
  return false;
});


  return (
    <>
      {filteredTasks.map(task => (
        <div key={task.id} className="bg-slate-700 p-5 rounded-md space-y-4 w-full h-fit">
          <h3 className="text-yellow-300 text-xl font-semibold">{task.title}</h3>
          <p className="text-yellow-300">{task.description}</p>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              className="h-5 w-5 text-yellow-400 rounded focus:ring-yellow-400 focus:ring-2"
              onChange={() => { }}
            />
            <span className="text-yellow-300"><span>{task.completed ? "Completed" : "Not Completed"}</span></span>
          </div>
          <div>
            <label className="text-yellow-300">Attached File:</label>
            {task.file instanceof File ? (
              <a className="flex text-red-500 hover:text-red-900 transition" href={URL.createObjectURL(task.file)} target="_blank" rel="noopener noreferrer">
                {task.file.name}
              </a>
            ) : (
              <p>No file attached</p>
            )}
          </div>
          <div className='flex gap-3'>
            <button
              onClick={() => {
                deleteTask(task.id)
              }}
              className="mt-4 w-full p-3 bg-yellow-500 text-slate-900 rounded-lg hover:bg-yellow-600 transition font-semibold"
            >
              Delete Task
            </button>
            <button
              onClick={() => {
                if (task.id !== taskEditId) {
                  changeEditId(task.id)
                };

                toggleTabs('NewTask');
              }}
              className="mt-4 w-full p-3 bg-yellow-500 text-slate-900 rounded-lg hover:bg-yellow-600 transition font-semibold"
            >
              Edit Task
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default Tasks;