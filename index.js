const express = require('express');
const router = require('./routes');
const passport = require('./lib/passport');
const app = express();

const swaggerUI = require('swagger-ui-express');


const swaggerJSON = require('./swagger.json');
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.use(passport.initialize());
app.use('/api',router);

app.listen(port, () => {
  console.log(`this app listening at http://localhost:${port}`);
});
