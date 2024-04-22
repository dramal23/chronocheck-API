const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000 || process.env.PORT;
const watchesRouter = require('./routes/watches');

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use('/watches', watchesRouter);
app.use('/brandnames', watchesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});