const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/files', require('./routes/files'));
app.use('/api/users', require('./routes/users'));

module.exports = app;