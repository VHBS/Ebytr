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
    setLoadingTasks(false);
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
      <h1 className="title">Todolist</h1>
      <form>
        { editingTask ? <h3>Editing Task</h3> : <h3>New Task</h3> }
        <div className="selects">
          <label className="selectLabel" htmlFor="status">
            <span>Status:</span>
            <select name="status" value={status} onChange={handleChangeStatus}>
              <option value="to do">to do</option>
              <option value="in progress">in progress</option>
              <option value="completed">completed</option>
            </select>
          </label>
          <label className="selectLabel" htmlFor="priority">
            <span>Priority:</span>
            <select name="priority" value={priority} onChange={handleChangePriority}>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </label>
        </div>
        <input className="inputTask" placeholder="Insert new task" value={task} onChange={handleChangeTask} />
        { blankTask && (
        <div>
          <p>Task is mandatory</p>
        </div>
        )}
        { editingTask
          ? (
            <div className="buttonEditTask">
              <button type="button" onClick={handleConfirmEditTask}>Confirm</button>
              <button type="button" onClick={handleCancelEditTask}>Cancel</button>
            </div>
          ) : <button type="button" onClick={handleAddNewTask}>Add new task</button> }
      </form>
      { tasks.length === 0 && loadingTasks === false && <h4 className="noHaveTasks">Don&apos;t have any task</h4>}
      { loadingTasks ? <h3>Loading...</h3> : (
        <div className="tasks">
          {tasks.map((taskObj) => (
            <div className="task" key={taskObj.id}>
              <div className="sideTaskCollum">
                <h6>Status:</h6>
                <p>{taskObj.status}</p>
                <h6>Priority:</h6>
                <p>{taskObj.priority}</p>
              </div>
              <div className="bodyTask">
                <div className="taskDescription">
                  <p>{taskObj.task}</p>
                </div>
                <div className="buttonTasks">
                  <button type="button" onClick={async () => handleDeleteTask(taskObj.id)}>Finish</button>
                  <button type="button" onClick={() => handleEditTask(taskObj)}>Edit</button>
                  <button type="button" onClick={async () => handleDeleteTask(taskObj.id)}>Exclude</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
