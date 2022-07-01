const express = require('express');
const createTaskController = require('./controller/taskController');

const app = express();
app.use(express.json());

app.post('/task', createTaskController.create)

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Escutando na porta ${process.env.PORT}`));
