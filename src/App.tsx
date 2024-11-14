import './App.css';
import Form from './components/Form';
import Tabs from './components/Tabs';
import Tasks from './components/Tasks';
import { useTaskContext } from './hooks/Hooks';

function App() {
  const { activeTab } = useTaskContext();

  return (
    <main className="bg-slate-900 flex justify-center h-screen">
      <section className="bg-slate-500 w-3/4 sm:w-1/2 mt-24 mb-24 rounded-xl shadow-lg flex flex-col">
        <Tabs />
        <div className="bg-gray-800 mt-2 pt-3 rounded-lg h-full p-6 shadow-md overflow-auto flex flex-col gap-4">
          {activeTab === 'NewTask' ? <Form /> : <Tasks />}
        </div>
      </section>
    </main>
  );
}

export default App;