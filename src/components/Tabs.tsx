import { useMemo } from 'react';
import { useTaskContext } from '../hooks/Hooks';
import {TabsContent, TabsType } from '../types/Types';


function Tabs() {
  const {activeTab, toggleTabs, taskEditId, tasks} = useTaskContext();

  const handleTabClick = (tab: TabsType) => {
    toggleTabs(tab);
  };


  const completedTask = useMemo(() => tasks.filter(task => task.completed).length, [tasks]);
  const unCompletedTask = useMemo(() => tasks.length - completedTask, [tasks, completedTask]);
  
  const tabs: TabsContent[] = [
    { name: 'NewTask', label: taskEditId ? 'Edited Task' : 'Add New Task' },
    { name: 'All', label: `Show All (${tasks.length})` },
    { name: 'Completed', label: `Completed (${completedTask})` },
    { name: 'NotCompleted', label: `Uncompleted (${unCompletedTask})` }
  ];

  return (
    <div className="text-yellow-300 flex px-6 py-1">
      {tabs.map((tab) => (
      <button
        key={tab.name}
        className={`flex-1 h-10 relative rounded-t-lg ${
          activeTab === tab.name ? 'bg-gray-800 text-yellow-500' : 'bg-slate-700 hover:bg-gray-800 hover:text-yellow-500'
        } transition`}
        onClick={() => handleTabClick(tab.name)}
        type="button"
      >
        {tab.label}
      </button>
    ))}
    </div>
  );
};

export default Tabs;
