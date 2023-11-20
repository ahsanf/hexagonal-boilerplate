export class ApplicationError extends Error {
  static type = {
    APP_NAME: "APP_NAME",
    INTERNAL: "INTERNAL",
    NETWORK: "NETWORK",
    UNKNOWN: "UNKNOWN",
    INVALIDDATA: "INVALID DATA",
  };
  /**
   * attributes declaration **
   */
  public name: string;
  public type: string;
  public code: string;
  public statusCode: string;

  constructor(options: any) {
    super();
    if (!options.message) {
      throw new Error("ApplicationError: error message required.");
    }

    if (!options.code) {
      throw new Error("ApplicationError: error code required.");
    }

    this.name = options.name;
    this.type = options.type;
    this.code = options.code;
    this.message = options.message;

    this.statusCode = options.statusCode;
  }
}