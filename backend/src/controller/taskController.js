const createTaskService = require('../service/taskService');

const create = async (req, res) => {
  try {
    const { task, status, priority } = req.body;
    const newTask = await createTaskService.create({ task, status, priority })
    return res.status(201).json(newTask);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error!" })
  }
}

const update = async (req, res) => {
  try {
    const { id, task, status, priority } = req.body;
    const updatedTask = await createTaskService.update({ id, task, status, priority })
    return res.status(201).json(updatedTask);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error!" })
  }
}

const getAll = async (_req, res) => {
  try {
    const allTasks = await createTaskService.getAll()
    return res.status(201).json(allTasks);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Internal server error!" })
  }
}

module.exports = { create, update, getAll };