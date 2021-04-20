import { ICreateSettingsDTO } from "../dtos/ICreateSettingsDTO";
import { Settings } from "../entities/Settings";

interface ISettingsRepository {
  create({ id, username, chat }: ICreateSettingsDTO): Promise<Settings>;
}

export { ISettingsRepository };
