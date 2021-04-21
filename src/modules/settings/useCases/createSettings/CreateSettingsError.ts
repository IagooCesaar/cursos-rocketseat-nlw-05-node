/* eslint-disable @typescript-eslint/no-namespace */
import { AppError } from "@shared/errors/AppError";

export namespace CreateSettingsError {
  export class UsernameAlreadyExists extends AppError {
    constructor() {
      super("Username already exists");
    }
  }
}
