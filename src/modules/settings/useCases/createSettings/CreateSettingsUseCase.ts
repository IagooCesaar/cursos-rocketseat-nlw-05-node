import { inject, injectable } from "tsyringe";

import { Settings } from "@modules/settings/entities/Settings";
import { ISettingsRepository } from "@modules/settings/repositories/ISettingsRepository";

interface IRequest {
  username: string;
  chat: boolean;
}

@injectable()
class CreateSettingsUseCase {
  constructor(
    @inject("SettingsRepository")
    private settingsRepository: ISettingsRepository
  ) {}

  async execute({ username, chat }: IRequest): Promise<Settings> {
    const settings = await this.settingsRepository.create({
      username,
      chat,
    });
    return settings;
  }
}

export { CreateSettingsUseCase };
