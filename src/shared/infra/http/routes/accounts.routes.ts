import { Router } from "express";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UserProfileController } from "@modules/accounts/useCases/userProfile/UserProfileController";

const accountsRoutes = Router();

const createUserController = new CreateUserController();
const userProfileController = new UserProfileController();

accountsRoutes.post("/", createUserController.handle);

accountsRoutes.get("/email/:email?", userProfileController.handle);
accountsRoutes.get("/id/:user_id?", userProfileController.handle);

export { accountsRoutes };
