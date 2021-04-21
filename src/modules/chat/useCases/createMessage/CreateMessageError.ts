/* eslint-disable @typescript-eslint/no-namespace */
import { AppError } from "@shared/errors/AppError";

export namespace CreateMessageError {
  export class UserNotFound extends AppError {
    constructor() {
      super("User not found");
    }
  }
}
