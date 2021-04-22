import { inject, injectable } from "tsyringe";

import { Settings } from "@modules/settings/entities/Settings";
import { ISettingsRepository } from "@modules/settings/repositories/ISettingsRepository";

interface IRequest {
  username?: string;
  id?: string;
}

@injectable()
class GetSettingsUseCase {
  constructor(
    @inject("SettingsRepository")
    private settingsRepository: ISettingsRepository
  ) {}

  async execute({ id, username }: IRequest): Promise<Settings> {
    if (username) {
      const setting = await this.settingsRepository.findByUsername(username);
      return setting;
    }
    const setting = await this.settingsRepository.findById(id);
    return setting;
  }
}

export { GetSettingsUseCase };
