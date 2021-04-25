import { InMemorySettingsRepository } from "@modules/settings/repositories/in-memory/InMemorySettingsRepository";

import { GetSettingsUseCase } from "./GetSettingsUseCase";

let settingsRepository: InMemorySettingsRepository;
let getSettingsUseCase: GetSettingsUseCase;

describe("GetSettingsUseCase", () => {
  beforeEach(() => {
    settingsRepository = new InMemorySettingsRepository();
    getSettingsUseCase = new GetSettingsUseCase(settingsRepository);
  });

  it("Should be able to get settings by id", async () => {
    const settings = await settingsRepository.create({
      chat: true,
      username: "admin",
    });

    const obtainedSettings = await getSettingsUseCase.execute({
      id: settings.id,
    });

    expect(obtainedSettings).toHaveProperty("id");
    expect(obtainedSettings.id).toBe(settings.id);
  });

  it("Should be able to get settings by username", async () => {
    const settings = await settingsRepository.create({
      chat: true,
      username: "admin",
    });

    const obtainedSettings = await getSettingsUseCase.execute({
      username: settings.username,
    });

    expect(obtainedSettings).toHaveProperty("id");
    expect(obtainedSettings.id).toBe(settings.id);
  });
});
