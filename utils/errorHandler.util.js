export const customErrorHandler = (
  res,
  status = 500,
  message = "Internal server error",
  error
) => {
  res.status(status || 500).json({
    success: false,
    message,
    error: error ? error.message : undefined,
  });
};
