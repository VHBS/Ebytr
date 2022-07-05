const taskService = require('../service/taskService');

const create = async (req, res) => {
  try {
    const { task, status, priority } = req.body;
    const newTask = await taskService.create({ task, status, priority })
    return res.status(201).json(newTask);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error!" })
  }
}

const update = async (req, res) => {
  try {
    const { id, task, status, priority } = req.body;
    const updatedTask = await taskService.update({ id, task, status, priority })
    return res.status(201).json(updatedTask);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error!" })
  }
}

const getAll = async (_req, res) => {
  try {
    const allTasks = await taskService.getAll()
    return res.status(200).json(allTasks);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error!" })
  }
}

const destroy = async (req, res) => {
  try {
    const { id } = req.body;
    await taskService.destroy({ id })
    return res.status(204).json()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error!" })
  }
}

module.exports = { create, update, getAll, destroy };