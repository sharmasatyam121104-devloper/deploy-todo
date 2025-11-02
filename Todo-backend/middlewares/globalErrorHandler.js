export const notFoundErrorHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error); // pass error to global error handler
};

export const globalErrorHandler = (error, req, res, next) => {
  const status = error?.status ? error.status : "failed";
  const message = error?.message;
  const stack = error?.stack;
  res.status(500).json({ status, message, stack });
};
