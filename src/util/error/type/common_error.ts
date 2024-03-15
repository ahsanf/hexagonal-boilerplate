import { ApplicationError } from "../application_error";


const HTTPError = (customMessage?: string) => ({
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
  INVALID_DATA: {
    type: ApplicationError.type.NETWORK,
    code: "INVALID DATA",
    message: customMessage ?? "Invalid data check it again",
    statusCode: 401,
  },
  FORBIDDEN: {
    type: ApplicationError.type.NETWORK,
    code: "FORBIDDEN",
    message: customMessage ?? "Forbidden",
    statusCode: 403,
  },
  RESOURCE_NOT_FOUND: {
    type: ApplicationError.type.NETWORK,
    code: "RESOURCE_NOT_FOUND",
    message: customMessage ?? "Resource not found",
    statusCode: 404,
    meta: {
      translationKey: "app.common.error.RESOURCE_NOT_FOUND",
    },
  },

  INTERNAL_SERVER_ERROR: {
    type: ApplicationError.type.NETWORK,
    code: "INTERNAL_SERVER_ERROR",
    message: customMessage ?? "Something went wrong, Please try again later.",
    statusCode: 500,
    meta: {
      shouldRedirect: true,
    },
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
  NOT_FOUND: {
    type: ApplicationError.type.NETWORK,
    code: "NOT_FOUND",
    message: customMessage ?? "Object not found",
    statusCode: 504,
  },
  UNPROCESSABLE_ENTITY: {
    type: ApplicationError.type.INVALIDDATA,
    code: "UNPROCESSABLE_ENTITY",
    message: customMessage ?? "We could not process your request",
    statusCode: 422,
  }
});

export { HTTPError };
