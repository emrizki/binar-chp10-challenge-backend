const express = require('express');
const router = require('./routes');
const app = express();
const port = process.env.port || 3000;

app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
