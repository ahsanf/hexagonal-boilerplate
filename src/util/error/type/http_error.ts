import { ApplicationError } from "../application_error";

const HTTPError = (customMessage?: string) => ({
  // 1xx Informational
  CONTINUE: {
    type: ApplicationError.type.NETWORK,
    code: "CONTINUE",
    message: customMessage ?? "Continue",
    statusCode: 100,
  },
  SWITCHING_PROTOCOLS: {
    type: ApplicationError.type.NETWORK,
    code: "SWITCHING_PROTOCOLS",
    message: customMessage ?? "Switching protocols",
    statusCode: 101,
  },
  PROCESSING: {
    type: ApplicationError.type.NETWORK,
    code: "PROCESSING",
    message: customMessage ?? "Processing",
    statusCode: 102,
  },

  // 2xx Success
  OK: {
    type: ApplicationError.type.NETWORK,
    code: "OK",
    message: customMessage ?? "OK",
    statusCode: 200,
  },
  CREATED: {
    type: ApplicationError.type.NETWORK,
    code: "CREATED",
    message: customMessage ?? "Created",
    statusCode: 201,
  },
  ACCEPTED: {
    type: ApplicationError.type.NETWORK,
    code: "ACCEPTED",
    message: customMessage ?? "Accepted",
    statusCode: 202,
  },
  NON_AUTHORITATIVE_INFORMATION: {
    type: ApplicationError.type.NETWORK,
    code: "NON_AUTHORITATIVE_INFORMATION",
    message: customMessage ?? "Non-authoritative information",
    statusCode: 203,
  },
  NO_CONTENT: {
    type: ApplicationError.type.NETWORK,
    code: "NO_CONTENT",
    message: customMessage ?? "No content",
    statusCode: 204,
  },
  RESET_CONTENT: {
    type: ApplicationError.type.NETWORK,
    code: "RESET_CONTENT",
    message: customMessage ?? "Reset content",
    statusCode: 205,
  },
  PARTIAL_CONTENT: {
    type: ApplicationError.type.NETWORK,
    code: "PARTIAL_CONTENT",
    message: customMessage ?? "Partial content",
    statusCode: 206,
  },

  // 3xx Redirection
  MULTIPLE_CHOICES: {
    type: ApplicationError.type.NETWORK,
    code: "MULTIPLE_CHOICES",
    message: customMessage ?? "Multiple choices",
    statusCode: 300,
  },
  MOVED_PERMANENTLY: {
    type: ApplicationError.type.NETWORK,
    code: "MOVED_PERMANENTLY",
    message: customMessage ?? "Moved permanently",
    statusCode: 301,
  },
  FOUND: {
    type: ApplicationError.type.NETWORK,
    code: "FOUND",
    message: customMessage ?? "Found",
    statusCode: 302,
  },
  SEE_OTHER: {
    type: ApplicationError.type.NETWORK,
    code: "SEE_OTHER",
    message: customMessage ?? "See other",
    statusCode: 303,
  },
  NOT_MODIFIED: {
    type: ApplicationError.type.NETWORK,
    code: "NOT_MODIFIED",
    message: customMessage ?? "Not modified",
    statusCode: 304,
  },
  TEMPORARY_REDIRECT: {
    type: ApplicationError.type.NETWORK,
    code: "TEMPORARY_REDIRECT",
    message: customMessage ?? "Temporary redirect",
    statusCode: 307,
  },
  PERMANENT_REDIRECT: {
    type: ApplicationError.type.NETWORK,
    code: "PERMANENT_REDIRECT",
    message: customMessage ?? "Permanent redirect",
    statusCode: 308,
  },

  // 4xx Client Errors
  BAD_REQUEST: {
    type: ApplicationError.type.NETWORK,
    code: "BAD_REQUEST",
    message: customMessage ?? "Bad request",
    statusCode: 400,
  },
  UNAUTHORIZED: {
    type: ApplicationError.type.NETWORK,
    code: "UNAUTHORIZED",
    message: customMessage ?? "Unauthorized",
    statusCode: 401,
  },
  PAYMENT_REQUIRED: {
    type: ApplicationError.type.NETWORK,
    code: "PAYMENT_REQUIRED",
    message: customMessage ?? "Payment required",
    statusCode: 402,
  },
  FORBIDDEN: {
    type: ApplicationError.type.NETWORK,
    code: "FORBIDDEN",
    message: customMessage ?? "Forbidden",
    statusCode: 403,
  },
  NOT_FOUND: {
    type: ApplicationError.type.NETWORK,
    code: "NOT_FOUND",
    message: customMessage ?? "Not found",
    statusCode: 404,
  },
  METHOD_NOT_ALLOWED: {
    type: ApplicationError.type.NETWORK,
    code: "METHOD_NOT_ALLOWED",
    message: customMessage ?? "Method not allowed",
    statusCode: 405,
  },
  NOT_ACCEPTABLE: {
    type: ApplicationError.type.NETWORK,
    code: "NOT_ACCEPTABLE",
    message: customMessage ?? "Not acceptable",
    statusCode: 406,
  },
  CONFLICT: {
    type: ApplicationError.type.NETWORK,
    code: "CONFLICT",
    message: customMessage ?? "Conflict",
    statusCode: 409,
  },
  UNPROCESSABLE_ENTITY: {
    type: ApplicationError.type.INVALIDDATA,
    code: "UNPROCESSABLE_ENTITY",
    message: customMessage ?? "Unprocessable entity",
    statusCode: 422,
  },
  TOO_MANY_REQUESTS: {
    type: ApplicationError.type.NETWORK,
    code: "TOO_MANY_REQUESTS",
    message: customMessage ?? "Too many requests",
    statusCode: 429,
  },

  // 5xx Server Errors
  INTERNAL_SERVER_ERROR: {
    type: ApplicationError.type.NETWORK,
    code: "INTERNAL_SERVER_ERROR",
    message: customMessage ?? "Internal server error",
    statusCode: 500,
  },
  NOT_IMPLEMENTED: {
    type: ApplicationError.type.NETWORK,
    code: "NOT_IMPLEMENTED",
    message: customMessage ?? "Not implemented",
    statusCode: 501,
  },
  BAD_GATEWAY: {
    type: ApplicationError.type.NETWORK,
    code: "BAD_GATEWAY",
    message: customMessage ?? "Bad gateway",
    statusCode: 502,
  },
  SERVICE_UNAVAILABLE: {
    type: ApplicationError.type.NETWORK,
    code: "SERVICE_UNAVAILABLE",
    message: customMessage ?? "Service unavailable",
    statusCode: 503,
  },
  GATEWAY_TIMEOUT: {
    type: ApplicationError.type.NETWORK,
    code: "GATEWAY_TIMEOUT",
    message: customMessage ?? "Gateway timeout",
    statusCode: 504,
  },
});

export { HTTPError as HttpError };
