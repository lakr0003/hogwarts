// Global Error Handling Middleware
export default function (err, req, res, next) {
  console.log(err.message);

  let statusCode = err.statusCode || 500;
  let error = err.error || "Internal server error";
  let message = err.message || "Internal server error";

  if (err.statusCode == 404) {
    error = "Not found";
  } else if (err.statusCode == 400) {
    error = "Bad request";
  }
  res.status(statusCode).json({
    message: message,
    error: error,
    statusCode: statusCode,
  });
}
