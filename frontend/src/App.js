import './App.css';
import { useState, useEffect } from 'react';
import { requestTasks } from './services/requests';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await requestTasks();
      setTasks(result)
      console.log(result)
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Todolist</h1>
      { tasks.length !== 0 ? (
        <div>
          {tasks.map((task) => {
            return (
            <div key={task.id}>
              <p>{task.task}</p>
              <p>{task.status}</p>
              <p>{task.priority}</p>
              <button>Editar</button>
              <button>Excluir</button>
            </div>)
          })}
        </div>
      ): (
        <h1>Don't have any task</h1>
      )}
    </div>
  );
}

export default App;
