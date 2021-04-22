import { ICreateSettingsDTO } from "@modules/settings/dtos/ICreateSettingsDTO";
import { Settings } from "@modules/settings/entities/Settings";

import { ISettingsRepository } from "../ISettingsRepository";

class InMemorySettingsRepository implements ISettingsRepository {
  private settings: Settings[] = [];

  async findById(id: string): Promise<Settings> {
    return this.settings.find((setting) => setting.id === id);
  }

  async findByUsername(username: string): Promise<Settings> {
    return this.settings.find((setting) => setting.username === username);
  }

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
