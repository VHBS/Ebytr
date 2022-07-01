const { Task } = require('../database/models');

const create = async  ({ task, status, priority }) => {
  const newTask = await Task.create({ task, status, priority })
  return newTask;
};

module.exports = { create };