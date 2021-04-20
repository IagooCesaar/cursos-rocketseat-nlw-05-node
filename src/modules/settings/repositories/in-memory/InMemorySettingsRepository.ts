import { ICreateSettingsDTO } from "@modules/settings/dtos/ICreateSettingsDTO";
import { Settings } from "@modules/settings/entities/Settings";

import { ISettingsRepository } from "../ISettingsRepository";

class InMemorySettingsRepository implements ISettingsRepository {
  private settings: Settings[] = [];

  async create({ id, username, chat }: ICreateSettingsDTO): Promise<Settings> {
    const setting = new Settings();
    Object.assign(setting, {
      id,
      username,
      chat,
    });
    this.settings.push(setting);
    return setting;
  }
}

export { InMemorySettingsRepository };
