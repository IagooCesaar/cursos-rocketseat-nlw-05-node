/* eslint-disable @typescript-eslint/no-namespace */
import { AppError } from "@shared/errors/AppError";

export namespace CreateUserError {
  export class UserAlreadyExists extends AppError {
    constructor() {
      super("User already exists");
    }
  }
}
