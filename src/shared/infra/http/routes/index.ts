import { Router } from "express";

import { settingsRoutes } from "./settings.routes";

const router = Router();

router.use("/settings", settingsRoutes);

export { router };
