import './App.css';
import React, { useState, useEffect } from 'react';
import {
  requestGetAllTasks,
  requestDeleteTask,
  requestPostTask,
  requestPutTask,
} from './services/requests';

function App() {
  const [blankTask, setBalnkTask] = useState(false);
  const [editingTask, setEditingTask] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('to do');
  const [priority, setPriority] = useState('low');
  const [task, setTask] = useState('');
  const [idTask, setIdTask] = useState('');

  const fetchDataTasks = async () => {
    setLoadingTasks(true);
    const result = await requestGetAllTasks();
    setTasks(result);
    setTimeout(() => setLoadingTasks(false), 150);
  };

  useEffect(() => {
    fetchDataTasks();
  }, []);

  const handleChangeStatus = ({ target: { value } }) => {
    setStatus(value);
  };

  const handleChangePriority = ({ target: { value } }) => {
    setPriority(value);
  };

  const handleChangeTask = ({ target: { value } }) => {
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
    setIdTask('');
  };

  const handleAddNewTask = async () => {
    if (task === '') {
      return setBalnkTask(true);
    }
    setBalnkTask(false);
    await requestPostTask({ task, status, priority });
    await fetchDataTasks();
    return handleResetForm();
  };

  const handleEditTask = (taskToEdit) => {
    setEditingTask(true);
    setIdTask(taskToEdit.id);
    setTask(taskToEdit.task);
    setStatus(taskToEdit.status);
    setPriority(taskToEdit.priority);
  };

  const handleCancelEditTask = () => {
    handleResetForm();
    setEditingTask(false);
  };

  const handleConfirmEditTask = async () => {
    if (task === '') {
      return setBalnkTask(true);
    }
    await requestPutTask({
      id: idTask, task, status, priority,
    });
    setBalnkTask(false);
    handleResetForm();
    setEditingTask(false);
    await fetchDataTasks();
    return setLoadingTasks(false);
  };

  return (
    <div className="App">
      <h1>Todolist</h1>
      <form>
        { editingTask ? <h3>Editing Task</h3> : <h3>New Task</h3> }
        <label htmlFor="status">
          Status:
          <select name="status" value={status} onChange={handleChangeStatus}>
            <option value="to do">to do</option>
            <option value="in progress">in progress</option>
            <option value="completed">completed</option>
          </select>
        </label>
        <label htmlFor="priority">
          Priority:
          <select name="priority" value={priority} onChange={handleChangePriority}>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        </label>
        <input placeholder="Insert new task" value={task} onChange={handleChangeTask} />
        { editingTask
          ? (
            <div>
              <button type="button" onClick={handleConfirmEditTask}>Confirm</button>
              <button type="button" onClick={handleCancelEditTask}>Cancel</button>
            </div>
          ) : <button type="button" onClick={handleAddNewTask}>Add new task</button> }
        { blankTask && (
        <div>
          <p>Task is mandatory</p>
        </div>
        )}
      </form>
      { tasks.length === 0 && loadingTasks === false && <h1>Don&apos;t have any task</h1>}
      { loadingTasks ? <h3>Loading...</h3> : (
        <div>
          {tasks.map((taskObj) => (
            <div key={taskObj.id}>
              <p>{taskObj.task}</p>
              <p>{taskObj.status}</p>
              <p>{taskObj.priority}</p>
              <button type="button" onClick={() => handleEditTask(taskObj)}>Editar</button>
              <button type="button" onClick={async () => handleDeleteTask(taskObj.id)}>Excluir</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
