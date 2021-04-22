/* eslint-disable @typescript-eslint/no-namespace */
import { AppError } from "@shared/errors/AppError";

export namespace UserProfileError {
  export class ParametersNotProvided extends AppError {
    constructor() {
      super("Parameters not provided");
    }
  }
}
