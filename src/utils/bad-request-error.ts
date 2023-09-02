import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  status = 400;
  constructor(msg: string) {
    super(msg);
  }

  serializeError() {
    return { error: { message: this.message, status: this.status } };
  }
}
