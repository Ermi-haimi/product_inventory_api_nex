export default function createError(message, statusCode) {
  const newError = new Error(message);
  newError.statusCode = statusCode;

  return newError;
}
