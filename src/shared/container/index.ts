import { container } from "tsyringe";

import { SettingsRepository } from "@modules/settings/infra/repositories/SettingsRepository";
import { ISettingsRepository } from "@modules/settings/repositories/ISettingsRepository";

container.registerSingleton<ISettingsRepository>(
  "SettingsRepository",
  SettingsRepository
);
