function errorHandler(err, req, res, _next) {
  console.error(err); // útil para debug

  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(status).json({
    status,
    message,
    ...(err.details && { details: err.details })
  });
}

module.exports = errorHandler;
