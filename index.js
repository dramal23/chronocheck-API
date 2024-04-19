const express = require('express');
const app = express();
const port = 4000 || process.env.PORT;
const watchesRouter = require('./routes/watches');

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.use('/watches', watchesRouter);
app.use('/brandnames', watchesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});