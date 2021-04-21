import { Router } from "express";

import { accountsRoutes } from "./accounts.routes";
import { settingsRoutes } from "./settings.routes";

const router = Router();

router.use("/settings", settingsRoutes);
router.use("/accounts", accountsRoutes);

export { router };
