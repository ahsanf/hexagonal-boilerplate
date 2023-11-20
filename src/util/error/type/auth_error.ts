import { ApplicationError } from "../application_error";

const AuthError = {
  BAD_REQUEST: {
    name: "Auth Error",
    type: ApplicationError.type.INVALIDDATA,
    code: "BAD_REQUEST",
    message: "You must enter a valid data",
    statusCode: 400,
  },
  CREDENTIALS_ERROR: {
    name: "auth Error",
    type: ApplicationError.type.INVALIDDATA,
    code: "CREDENTIALS",
    message: "Invalid credentials",
    statusCode: 403,
  },
  NOT_FOUND: {
    name: "auth Error",
    type: "NOT_FOUND",
    code: "BAD_REQUEST",
    message: "User not found check your data",
    statusCode: 404,
  },
  EMAIL_ALREADY_EXIST: {
    name: "auth Error",
    type: ApplicationError.type.INVALIDDATA,
    code: "BAD_REQUEST",
    message: "Email already exits.",
    statusCode: 400,
  },
  UNAVAILABLE_REFRESH_TOKEN: {
    name: "refesh token Error",
    type: ApplicationError.type.INVALIDDATA,
    code: "BAD_REQUEST",
    message: "Refresh token is not in database!",
    statusCode: 400,
  },
  REQUIRED_REFRESH_TOKEN: {
    name: "refesh token Error",
    type: ApplicationError.type.INVALIDDATA,
    code: "BAD_REQUEST",
    message: "Refresh token is required",
    statusCode: 400,
  },
  EXPIRED_TOKEN: {
    name: "refesh token Error",
    type: ApplicationError.type.INVALIDDATA,
    code: "BAD_REQUEST",
    message: "Refresh token is expired",
    statusCode: 400,
  },
  FAILED_TOSEND: {
    name: "failed to send ",
    type: ApplicationError.type.INVALIDDATA,
    code: "BAD_REQUEST",
    message: "failed to send sms or email to the user",
    statusCode: 400,
  },
  EXPIRED_CODE: {
    name: "Code Error",
    type: ApplicationError.type.INVALIDDATA,
    code: "BAD_REQUEST",
    message: "Code is expired",
    statusCode: 400,
  },
  UNAVAILABLE_CODE: {
    name: "auth Error",
    type: "UNAVAILABLE",
    code: "BAD_REQUEST",
    message: "code is unavailable",
    statusCode: 404,
  },
  INVALID_CODE: {
    name: "auth Error",
    type: "INVALID",
    code: "BAD_REQUEST",
    message: "code is invalid",
    statusCode: 400,
  },
  FAILED_AUTHENTIFICATION: {
    name: "auth Error",
    type: "FAILED AUTH",
    code: "BAD_REQUEST",
    message: "Authentication failed ",
    statusCode: 400,
  },

  ALREADY_VERIFIED: {
    name: "auth Error",
    type: "ALREADY VERIFIED",
    code: "BAD_REQUEST",
    message: "User is already verified",
    statusCode: 400,
  },
  NOT_VERIFIED: {
    name: "auth Error",
    type: "NOT VERIFIED",
    code: "BAD_REQUEST",
    message: "User is not verified",
    statusCode: 400,
  },

  OTP_NOT_MATCH:{
    name: "auth Error",
    type: "INVALID OTP",
    code: "BAD_REQUEST",
    message: "OTP is not match",
    statusCode: 400,
  },

  OTP_EXPIRED:{
    name: "auth Error",
    type: "EXPIRED OTP",
    code: "BAD_REQUEST",
    message: "OTP has expired",
    statusCode: 400,
  },

};

export { AuthError };