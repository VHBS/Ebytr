const createTaskController = require('./controller/taskController');
const app = require('./app');

app.post('/task', createTaskController.create)

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Escutando na porta ${process.env.PORT}`));
