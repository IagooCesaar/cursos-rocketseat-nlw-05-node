import { Router } from "express";

import { CreateSettingsController } from "@modules/settings/useCases/createSettings/CreateSettingsController";
import { GetSettingsController } from "@modules/settings/useCases/getSettingsForUsername/GetSettingsController";
import { UpdateSettingsController } from "@modules/settings/useCases/updateSettings/UpdateSettingsController";

const settingsRoutes = Router();

const createSettingsController = new CreateSettingsController();
const getSettingsController = new GetSettingsController();
const updateSettingsController = new UpdateSettingsController();

settingsRoutes.post("/", createSettingsController.handle);
settingsRoutes.get("/:username", getSettingsController.handle);
settingsRoutes.patch("/:username", updateSettingsController.handle);

export { settingsRoutes };
