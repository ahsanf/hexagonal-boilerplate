export function formatError(error: any, overrides = {}) {
  const stackTrace: any = JSON.stringify(error, ["stack"], 4) || {};
  const newError = JSON.parse(JSON.stringify(error));

  return {
    error: {
      ...newError,
      stack: stackTrace.stack,
    },
    success: false,
    ...overrides,
  };
}