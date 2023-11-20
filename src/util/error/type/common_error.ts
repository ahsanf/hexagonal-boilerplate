import { ApplicationError } from "../application_error";

const HTTPError = {
  BAD_REQUEST: {
    type: ApplicationError.type.NETWORK,
    code: "BAD_REQUEST",
    message: "Bad request",
    statusCode: 400,
  },
  UNAUTHORIZED: {
    type: ApplicationError.type.NETWORK,
    code: "UNAUTHORIZED",
    message: "Unauthorized",
    statusCode: 401,
  },
  INVALID_DATA: {
    type: ApplicationError.type.NETWORK,
    code: "INVALID DATA",
    message: "invalid data check it again",
    statusCode: 401,
  },
  FORBIDDEN: {
    type: ApplicationError.type.NETWORK,
    code: "FORBIDDEN",
    message: "Forbidden",
    statusCode: 403,
  },
  RESOURCE_NOT_FOUND: {
    type: ApplicationError.type.NETWORK,
    code: "RESOURCE_NOT_FOUND",
    message: "Resource not found",
    statusCode: 404,
    meta: {
      translationKey: "app.common.error.RESOURCE_NOT_FOUND",
    },
  },

  INTERNAL_SERVER_ERROR: {
    type: ApplicationError.type.NETWORK,
    code: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong, Please try again later.",
    statusCode: 500,
    meta: {
      shouldRedirect: true,
    },
  },
  BAD_GATEWAY: {
    type: ApplicationError.type.NETWORK,
    code: "BAD_GATEWAY",
    message: "Bad gateway",
    statusCode: 502,
  },
  SERVICE_UNAVAILABLE: {
    type: ApplicationError.type.NETWORK,
    code: "SERVICE_UNAVAILABLE",
    message: "Service unavailable",
    statusCode: 503,
  },
  GATEWAY_TIMEOUT: {
    type: ApplicationError.type.NETWORK,
    code: "GATEWAY_TIMEOUT",
    message: "Gateway timeout",
    statusCode: 504,
  },
  NOT_FOUND: {
    type: ApplicationError.type.NETWORK,
    code: "NOT_FOUND",
    message: "object not found",
    statusCode: 504,
  },
};

export { HTTPError };