import { Router } from "express";

import { CreateSettingsController } from "@modules/settings/useCases/createSettings/CreateSettingsController";
import { GetSettingsController } from "@modules/settings/useCases/getSettingsForUsername/GetSettingsController";

const settingsRoutes = Router();

const createSettingsController = new CreateSettingsController();
const getSettingsController = new GetSettingsController();

settingsRoutes.post("/", createSettingsController.handle);
settingsRoutes.get("/:username", getSettingsController.handle);

export { settingsRoutes };
