const Task = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    task: DataTypes.STRING,
    status: DataTypes.STRING,
    priority: DataTypes.STRING
  });

  return Task;
}

module.exports = Task;