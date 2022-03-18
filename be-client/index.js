const express = require('express');
const jwt = require('jsonwebtoken');
const {loginRoutes} = require('./routes/loginRoutes');
const {camereRoutes} = require('./routes/camereRoutes');
var cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json())

app.use(loginRoutes);
app.use(camereRoutes);

const port = 3001;

app.listen(port, () => {
    console.log('Server is running on port ', port);
});