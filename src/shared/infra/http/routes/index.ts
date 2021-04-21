import { Router } from "express";

import { accountsRoutes } from "./accounts.routes";
import { chatRoutes } from "./chat.routes";
import { settingsRoutes } from "./settings.routes";

const router = Router();

router.use("/settings", settingsRoutes);
router.use("/accounts", accountsRoutes);
router.use("/chat", chatRoutes);

export { router };
