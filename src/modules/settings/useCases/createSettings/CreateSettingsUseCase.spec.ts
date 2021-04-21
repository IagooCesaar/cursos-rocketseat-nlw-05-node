import { InMemorySettingsRepository } from "@modules/settings/repositories/in-memory/InMemorySettingsRepository";

import { CreateSettingsError } from "./CreateSettingsError";
import { CreateSettingsUseCase } from "./CreateSettingsUseCase";

let settingsRepository: InMemorySettingsRepository;
let createSettingsUseCase: CreateSettingsUseCase;

describe("CreateSettingsUseCase", () => {
  beforeEach(() => {
    settingsRepository = new InMemorySettingsRepository();
    createSettingsUseCase = new CreateSettingsUseCase(settingsRepository);
  });

  it("Should be able to create a new setting", async () => {
    const setting = {
      username: "test",
      chat: true,
    };
    const createdSetting = await createSettingsUseCase.execute(setting);
    expect(createdSetting).toHaveProperty("id");
  });

  it("Should not be able to create a new setting if already exists for a username", async () => {
    const setting = {
      username: "test",
      chat: true,
    };
    await createSettingsUseCase.execute(setting);

    await expect(createSettingsUseCase.execute(setting)).rejects.toBeInstanceOf(
      CreateSettingsError.UsernameAlreadyExists
    );
  });
});
