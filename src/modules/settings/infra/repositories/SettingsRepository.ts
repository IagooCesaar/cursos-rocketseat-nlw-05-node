import { getRepository, Repository } from "typeorm";

import { ICreateSettingsDTO } from "@modules/settings/dtos/ICreateSettingsDTO";
import { Settings } from "@modules/settings/entities/Settings";
import { ISettingsRepository } from "@modules/settings/repositories/ISettingsRepository";

class SettingsRepository implements ISettingsRepository {
  private repository: Repository<Settings>;

  constructor() {
    this.repository = getRepository(Settings);
  }

  async findById(id: string): Promise<Settings> {
    const setting = await this.repository.findOne(id);
    return setting;
  }

  async findByUsername(username: string): Promise<Settings> {
    const setting = await this.repository.findOne({ username });
    return setting;
  }

  async create({ id, username, chat }: ICreateSettingsDTO): Promise<Settings> {
    const settings = this.repository.create({
      id,
      username,
      chat,
    });
    await this.repository.save(settings);
    return settings;
  }
}

export { SettingsRepository };
