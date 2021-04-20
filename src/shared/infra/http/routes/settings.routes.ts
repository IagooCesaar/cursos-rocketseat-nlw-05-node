import { Router } from "express";

import { CreateSettingsController } from "@modules/settings/useCases/createSettings/CreateSettingsController";

const settingsRoutes = Router();

const createSettingsController = new CreateSettingsController();

settingsRoutes.post("/", createSettingsController.handle);

export { settingsRoutes };
