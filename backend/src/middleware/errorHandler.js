function errorHandler(err, req, res, _next) {
  console.error('Unhandled error:', err);

  if (err.code === '23505') {
    return res.status(409).json({
      errorCode: 409,
      errorMessage: 'Duplicate entry',
    });
  }

  if (err.code === '23503') {
    return res.status(400).json({
      errorCode: 400,
      errorMessage: 'Referenced record not found',
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.statusCode ? err.message : 'Internal server error';
  return res.status(statusCode).json({
    errorCode: statusCode,
    errorMessage: message,
  });
}

module.exports = errorHandler;
