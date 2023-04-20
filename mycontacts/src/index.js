const { response } = require('express');
require('express-async-errors');

const express = require('express');
const cors = require('./app/middlewares/cors.js');
const errorHandler = require('./app/middlewares/errorHandler.js');

const routes = require('./routes.js')

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(3001, () => console.log(`🔥 Server started 🔥`));

