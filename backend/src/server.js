const createTaskController = require('./controller/taskController');
const app = require('./app');

app.get('/task', createTaskController.getAll)
app.post('/task', createTaskController.create)
app.put('/task', createTaskController.update)

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Escutando na porta ${process.env.PORT}`));
