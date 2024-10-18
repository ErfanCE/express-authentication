const { join } = require('node:path');
const { AppError } = require('./utils/app-error');
const express = require('express');
const apiRouter = require('./routes/api-routes');
const viewRouter = require('./routes/view-routes');

const app = express();
const port = 8000;
const host = '127.0.0.1';

// view engine setup
app.set('view engine', 'ejs');
app.set('views', join(__dirname, './views'));

// serve static files
app.use(express.static(join(__dirname, './public')));

// parse request body
app.use(express.json({ limit: '10kb' }));
app.use(express.text({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/', viewRouter);
app.use('/api', apiRouter);

// unhandled routes
app.all('*', (request, response, next) => {
  const { method, originalUrl: pathname } = request;

  next(new AppError(404, `${method} ${pathname} not Found.`));
});

// global error handler
app.use((err, _request, response, _next) => {
  let {
    statusCode = 500,
    status = 'error',
    message = 'something went wrong, not your fault :)'
  } = err;

  // express handle json parse
  if (err?.type === 'entity.parse.failed') {
    status = 'fail';
  }

  if (statusCode === 500) {
    console.error(`[-] ${message}`);
    console.log(err.stack);
  }

  response.status(statusCode).json({ status, message });
});

app.listen(port, host, () => {
  console.info(`[i] Listening on ${host}:${port}...`);
});
