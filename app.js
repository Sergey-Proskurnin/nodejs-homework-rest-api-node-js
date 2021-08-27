const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require('./helpers');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/v1/contacts', contactsRouter);

app.use((_req, res) => {
  res
    .status(NOT_FOUND)
    .json({ status: 'error', code: NOT_FOUND, message: 'Not found' });
});

app.use((err, _req, res, _next) => {
  const status = err.status || INTERNAL_SERVER_ERROR;
  res.status(status).json({
    status: 'fail',
    code: status,
    message: err.message.replace(/"/gi, ''),
  });
});

module.exports = app;
