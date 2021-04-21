import { Router } from "express";

import { CreateMessageController } from "@modules/chat/useCases/createMessage/CreateMessageController";
import { ListUserMessagesController } from "@modules/chat/useCases/listUserMessages/ListUserMessagesController";

const chatRoutes = Router();

const createMessageController = new CreateMessageController();
const listUserMessagesController = new ListUserMessagesController();

chatRoutes.post("/", createMessageController.handle);
chatRoutes.get("/:user_id", listUserMessagesController.handle);

export { chatRoutes };
