function AppError(statusCode, errorMessage) {
  this.statusCode = statusCode;
  this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';
  this.message = errorMessage;

  Error.captureStackTrace(this);
}

module.exports = { AppError };
