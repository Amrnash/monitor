import { CustomError } from "./custom-error";

export class NotAuthorziedError extends CustomError {
  status = 401;
  constructor() {
    super("Not Authorized");
  }

  serializeError() {
    return { error: { message: this.message, status: this.status } };
  }
}
