const { join } = require('node:path');
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

  next(
    new Error(`${method} ${pathname} not Found.`, {
      cause: { statusCode: 404 }
    })
  );
});

// global error handler
app.use((err, request, response, next) => {
  console.log(err);

  response.status(err.cause.statusCode).json({
    status: 'fail',
    error: { message: err.message }
  });
});

app.listen(port, host, () => {
  console.info(`[i] Listening on ${host}:${port}...`);
});
