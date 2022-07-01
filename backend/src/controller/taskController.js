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

module.exports = { create };