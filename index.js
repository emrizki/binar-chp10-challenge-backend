const express = require('express');
const router = require('./routes');
const passport = require('./lib/passport');
const app = express();

const port = process.env.port || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(passport.initialize());
app.use(router);

app.listen(port, () => {
  console.log(`this app listening at http://localhost:${port}`);
});
