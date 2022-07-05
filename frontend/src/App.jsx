import './App.css';
import React, { useState, useEffect } from 'react';
import {
  requestGetAllTasks,
  requestDeleteTask,
  requestPostTask,
  requestPutTask,
} from './services/requests';

function App() {
  const [blankTaskInput, setBalnkTaskInput] = useState(false);
  const [editingTask, setEditingTask] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('to do');
  const [priority, setPriority] = useState('low');
  const [task, setTask] = useState('');
  const [idTask, setIdTask] = useState('');
  const [orderTasksBy, setOrderTasksBy] = useState('date');
  const [orderTasksDirection, setOrderTasksDirection] = useState('ascending');
  const [showFormTask, setShowFormTask] = useState(false);

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
      return setBalnkTaskInput(true);
    }
    setBalnkTaskInput(false);
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
      return setBalnkTaskInput(true);
    }
    await requestPutTask({
      id: idTask, task, status, priority,
    });
    setBalnkTaskInput(false);
    handleResetForm();
    setEditingTask(false);
    await fetchDataTasks();
    return setLoadingTasks(false);
  };

  const handleFinishTask = async (taskObject) => {
    await requestPutTask({
      id: taskObject.id, task: taskObject.task, status: 'finished', priority: taskObject.priority,
    });
    fetchDataTasks();
  };

  const handleOrderTasksByAlphabetical = async (getAllTasks) => {
    if (orderTasksDirection === 'ascending') {
      const tasksOrderedAlphabetical = getAllTasks.sort((a, b) => a.task.localeCompare(b.task));
      return setTasks(tasksOrderedAlphabetical);
    }
    const tasksOrderedAlphabetical = getAllTasks.sort((a, b) => b.task.localeCompare(a.task));
    return setTasks(tasksOrderedAlphabetical);
  };

  const handleOrderTasksByDate = async (getAllTasks) => {
    if (orderTasksDirection === 'ascending') {
      const tasksOrderedByDate = getAllTasks.sort((a, b) => a.id - b.id);
      return setTasks(tasksOrderedByDate);
    }
    const tasksOrderedByDate = getAllTasks.sort((a, b) => b.id - a.id);
    return setTasks(tasksOrderedByDate);
  };

  const handleOrderTaskByStatus = async (getAllTasks) => {
    if (orderTasksDirection === 'ascending') {
      const tasksOrderedByStatus = getAllTasks.sort((a, b) => (a.status < b.status ? -1 : 1));
      return setTasks(tasksOrderedByStatus);
    }
    const tasksOrderedByStatus = getAllTasks.sort((a, b) => (a.status < b.status ? 1 : -1));
    return setTasks(tasksOrderedByStatus);
  };

  const handleOrderTasks = async () => {
    const getAllTasks = await requestGetAllTasks();
    if (orderTasksBy === 'alphabetical') {
      return handleOrderTasksByAlphabetical(getAllTasks);
    }
    if (orderTasksBy === 'date') {
      return handleOrderTasksByDate(getAllTasks);
    }
    return handleOrderTaskByStatus(getAllTasks);
  };

  const handleOrderTasksBy = ({ target: { value } }) => {
    setOrderTasksBy(value);
  };

  const handleOrderTaskDirection = ({ target: { id } }) => {
    setOrderTasksDirection(id);
  };

  useEffect(() => {
    handleOrderTasks();
  }, [orderTasksDirection, orderTasksBy]);

  return (
    <div className="App">
      <h1 className="title">Todolist</h1>
      { showFormTask && (
        <form>
          <div className="headerFormTask">
            { editingTask ? <h3>Editing Task</h3> : <h3>New Task</h3> }
            <button className="redButton" type="button" onClick={() => setShowFormTask(false)}>X</button>
          </div>
          <div className="selects">
            <label className="selectLabel" htmlFor="status">
              <span>Status:</span>
              <select name="status" value={status} onChange={handleChangeStatus}>
                <option value="to do">to do</option>
                <option value="in progress">in progress</option>
                <option value="finished">finished</option>
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
          { blankTaskInput && (
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
      ) }
      { tasks.length !== 0 && loadingTasks && <h3>Loading...</h3>}
      { tasks.length === 0 && !loadingTasks && (
        <div className="noHaveTasks">
          <h4 className="noHaveTasksMessage">Don&apos;t have any task</h4>
          <button type="button" onClick={() => setShowFormTask(true)}>New task</button>
        </div>
      )}
      {tasks.length !== 0 && (
        <div className="tasks">
          <div className="headerTasks">
            <h2>Tasks</h2>
            <button type="button" onClick={() => setShowFormTask(true)}>New task</button>
          </div>
          <div className="filters">
            <div className="filtersInputs">
              <label className="filtersInputsSelect" htmlFor="orderby">
                <span>Order by:</span>
                <select name="orderby" value={orderTasksBy} onChange={handleOrderTasksBy}>
                  <option value="date">date</option>
                  <option value="alphabetical">alphabetical</option>
                  <option value="status">status</option>
                </select>
              </label>
              <label className="labelInputRadio" htmlFor="ascending">
                <input className="inputRadio" type="radio" name="orderTaskBy" id="ascending" onClick={handleOrderTaskDirection} defaultChecked />
                <span>ascending</span>
              </label>
              <label htmlFor="descending">
                <input className="inputRadio" type="radio" name="orderTaskBy" id="descending" onClick={handleOrderTaskDirection} />
                <span>descending</span>
              </label>
            </div>
          </div>
          {tasks.map((taskObj) => (
            <div className="task" key={taskObj.id}>
              <div className="sideTaskCollum">
                <h6>Date:</h6>
                <p>{taskObj.createdAt}</p>
                <h6>Status:</h6>
                <p className={`${taskObj.status.split(' ').join('')}Status`}>{taskObj.status}</p>
                <h6>Priority:</h6>
                <p className={`${taskObj.priority}Priority`}>{taskObj.priority}</p>
              </div>
              <div className="bodyTask">
                <div className="taskDescription">
                  <p>{taskObj.task}</p>
                </div>
                <div className="buttonTasks">
                  <button type="button" onClick={async () => handleFinishTask(taskObj)}>Finish</button>
                  <button type="button" onClick={() => handleEditTask(taskObj)}>Edit</button>
                  <button className="redButton" type="button" onClick={async () => handleDeleteTask(taskObj.id)}>Delete</button>
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
