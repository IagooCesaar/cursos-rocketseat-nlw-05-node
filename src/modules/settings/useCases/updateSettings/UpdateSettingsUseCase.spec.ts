import { InMemorySettingsRepository } from "@modules/settings/repositories/in-memory/InMemorySettingsRepository";

import { UpdateSettingsError } from "./UpdateSettingsError";
import { UpdateSettingsUseCase } from "./UpdateSettingsUseCase";

let settingsRepository: InMemorySettingsRepository;
let updateSettingsUseCase: UpdateSettingsUseCase;

describe("UpdateSettingsUseCase", () => {
  beforeEach(() => {
    settingsRepository = new InMemorySettingsRepository();
    updateSettingsUseCase = new UpdateSettingsUseCase(settingsRepository);
  });

  it("Should be able to update settings with a valid username", async () => {
    await settingsRepository.create({
      chat: true,
      username: "admin",
    });

    const updated = await updateSettingsUseCase.execute({
      chat: false,
      username: "admin",
    });

    expect(updated).toHaveProperty("id");
  });

  it("Should not be able to update settings wit a invalid username", async () => {
    await expect(
      updateSettingsUseCase.execute({
        chat: false,
        username: "admin",
      })
    ).rejects.toBeInstanceOf(UpdateSettingsError.SettingNotFound);
  });
});
