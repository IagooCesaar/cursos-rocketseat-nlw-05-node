import { Router } from "express";

import { CreateMessageController } from "@modules/chat/useCases/createMessage/CreateMessageController";

const chatRoutes = Router();

const createMessageController = new CreateMessageController();

chatRoutes.post("/", createMessageController.handle);

export { chatRoutes };
