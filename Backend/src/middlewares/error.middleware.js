import { postgresErrorMap, handleDatabaseError } from "../utils/postgresErrorMap.js";

const getErrorName = (statusCode) => {
  const errorMap = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    413: "Payload Too Large",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    500: "Internal Server Error",
  };
  return errorMap[statusCode] || "Internal Server Error";
};
export const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = [];

  if (Array.isArray(message)) {
    errors = message;
    message = "Validation Error";
    statusCode = 400;
  } else {
    errors = [message];
  }

  if (err.code && postgresErrorMap[err.code]) {
    const dbError = handleDatabaseError(err);
    return res.status(dbError.statusCode).json({
      statusCode: dbError.statusCode,
      message: dbError.message,
      error: dbError.error,
      ...(process.env.NODE_ENV === "development" && {
        code: dbError.code,
      }),
    });
  }

  if (err.name === "KnexTimeoutError") {
    return res.status(504).json({
      statusCode: 504,
      message: "Database query timeout",
      error: "timeout",
    });
  }

  if (process.env.NODE_ENV === "development") {
    console.error("Error:", {
      statusCode,
      message,
      code: err.code,
      stack: err.stack,
    });
  }

  return res.status(statusCode).json({
    statusCode,
    message,
    errors,
    error: getErrorName(statusCode),
  });
};
