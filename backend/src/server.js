const express = require('express');

const app = express();

app.get('/', (_req, res) => {
  return res.status(200).json({ message: 'ok' })
})

const { PORT } = process.env;
app.listen(PORT, () => console.log(`Escutando na porta ${process.env.PORT}`));
