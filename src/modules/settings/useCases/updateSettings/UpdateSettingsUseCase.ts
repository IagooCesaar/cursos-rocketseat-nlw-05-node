import { inject, injectable } from "tsyringe";

import { Settings } from "@modules/settings/entities/Settings";
import { ISettingsRepository } from "@modules/settings/repositories/ISettingsRepository";

import { UpdateSettingsError } from "./UpdateSettingsError";

interface IRequest {
  username: string;
  chat: boolean;
}

@injectable()
class UpdateSettingsUseCase {
  constructor(
    @inject("SettingsRepository")
    private settingsRepository: ISettingsRepository
  ) {}

  async execute({ chat, username }: IRequest): Promise<Settings> {
    const settings = await this.settingsRepository.findByUsername(username);
    if (!settings) {
      throw new UpdateSettingsError.SettingNotFound();
    }

    settings.chat = chat;
    await this.settingsRepository.create(settings);
    return settings;
  }
}

export { UpdateSettingsUseCase };
