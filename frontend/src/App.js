import './App.css';
import { useState, useEffect } from 'react';
import { requestGetAllTasks, requestDeleteTask, requestPostTask, requestPutTask } from './services/requests';

function App() {
  const [editingTask, setEditingTask] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('to do');
  const [priority, setPriority] = useState('low');
  const [task, setTask] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    fetchDataTasks();
  }, []);
  
  const fetchDataTasks = async () => {
    setLoadingTasks(true)
    const result = await requestGetAllTasks();
    setTasks(result)
    setLoadingTasks(false)
  }

  const handleChangeStatus = ({ target: { value }}) => {
    setStatus(value);
  };

  const handleChangePriority = ({ target: { value }}) => {
    setPriority(value);
  };

  const handleChangeTask = ({ target: { value }}) => {
    setTask(value);
  };

  const handleDeleteTask = async (id) => {
    setLoadingTasks(true);
    await requestDeleteTask(id);
    await fetchDataTasks();
  };

  const handleResetForm = () => {
    setTask('');
    setStatus('to do');
    setPriority('low');
    setId('');
  };

  const handleAddNewTask = async (event) => {
    event.preventDefault();
    await requestPostTask({ task, status, priority });
    await fetchDataTasks();
    handleResetForm();
  };

  const handleEditTask = ({ id, task, status, priority }) => {
    console.log(id);
    setEditingTask(true);
    setId(id);
    setTask(task);
    setStatus(status);
    setPriority(priority);
  };

  const handleCancelEditTask = (event) => {
    event.preventDefault();
    handleResetForm();
    setEditingTask(false);
  };

  const handleConfirmEditTask = async (event) => {
    event.preventDefault();
    await requestPutTask({ id, task, status, priority });
    handleResetForm();
    setEditingTask(false);
    await fetchDataTasks();
    setLoadingTasks(false);
  }

  return (
    <div className="App">
      <h1>Todolist</h1>
      <form>
        {editingTask?<h3>Editing Task</h3> : <h3>New Task</h3>}
          <label>
            Status:
            <select name='status' value={ status } onChange={ handleChangeStatus }>
              <option value='to do'>to do</option>
              <option value='in progress'>in progress</option>
              <option value='completed'>completed</option>
            </select>
          </label>
          <label>
            Priority:
            <select name='priority' value={ priority } onChange={ handleChangePriority }>
              <option value='low'>low</option>
              <option value='medium'>medium</option>
              <option value='high'>high</option>
            </select>
          </label>
          <input placeholder='Insert new task' value={ task } onChange={ handleChangeTask }/>
          {
            editingTask ? (
            <div>
              <button onClick={ handleConfirmEditTask }>Confirm</button>
              <button onClick={ handleCancelEditTask }>Cancel</button>
            </div>) : <button onClick={ handleAddNewTask }>Add new task</button>
          }
      </form>
      { loadingTasks ? <h3>Loading...</h3> : tasks.length !== 0 ? (
        <div>
          {tasks.map((task) => {
            return (
            <div key={task.id}>
              <p>{task.task}</p>
              <p>{task.status}</p>
              <p>{task.priority}</p>
              <button onClick={() => handleEditTask(task)}>Editar</button>
              <button onClick={ async () => await handleDeleteTask(task.id) }>Excluir</button>
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
