// utils/responseBuilder.js
export const buildApiResponse = ({
  success = true,
  message = '',
  data = null,
  errorCode = null,
  path = '',
  durationMs = 0
}) => {
  return {
    success,
    message,
    data,
    errorCode,
    path,
    timestamp: new Date().toISOString(),
    durationMs
  };
};
