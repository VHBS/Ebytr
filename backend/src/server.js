const createTaskController = require('./controller/taskController');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(express.json());

app.post('/task', createTaskController.create)

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Escutando na porta ${process.env.PORT}`));
