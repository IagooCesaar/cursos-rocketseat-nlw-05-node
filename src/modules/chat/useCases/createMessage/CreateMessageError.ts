/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-namespace */
import { AppError } from "@shared/errors/AppError";

export namespace CreateMessageError {
  export class UserNotFound extends AppError {
    constructor() {
      super("User not found");
    }
  }

  export class TextMustNotBeEmpty extends AppError {
    constructor() {
      super("Text must not be empty");
    }
  }
}
