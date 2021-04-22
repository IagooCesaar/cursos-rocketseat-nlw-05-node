/* eslint-disable @typescript-eslint/no-namespace */
import { AppError } from "@shared/errors/AppError";

export namespace UpdateSettingsError {
  export class SettingNotFound extends AppError {
    constructor() {
      super("Setting not found for this username");
    }
  }
}
