function success(res, data, statusCode = 200) {
  return res.status(statusCode).json(data);
}

function error(res, message, statusCode = 400) {
  return res.status(statusCode).json({
    errorCode: statusCode,
    errorMessage: message,
  });
}

function paginated(res, rows, total, page, size) {
  return res.status(200).json({
    content: rows,
    totalElements: total,
    totalPages: Math.ceil(total / size),
    number: page,
    size,
  });
}

module.exports = { success, error, paginated };
