import { Router } from "express";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";

const accountsRoutes = Router();

const createUserController = new CreateUserController();

accountsRoutes.post("/", createUserController.handle);

export { accountsRoutes };
