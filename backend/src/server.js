const taskController = require('./controller/taskController');
const app = require('./app');

app.get('/task', taskController.getAll)
app.post('/task', taskController.create)
app.put('/task', taskController.update)
app.delete('/task', taskController.destroy)

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Escutando na porta ${process.env.PORT}`));
