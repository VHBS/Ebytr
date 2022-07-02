const { Task } = require('../database/models');

const create = async  ({ task, status, priority }) => {
  const newTask = await Task.create({ task, status, priority })
  return newTask;
};

const update = async ({ id, task, status, priority }) => {
  const updatedTask = await Task.update({ task, status, priority, updatedAt: new Date() }, { where: { id }});
  return updatedTask;
}

const getAll = async () => {
  const allTasks = await Task.findAll();
  return allTasks;
}

module.exports = { create, update, getAll };