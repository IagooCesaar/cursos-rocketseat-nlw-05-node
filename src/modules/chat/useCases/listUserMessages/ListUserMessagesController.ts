import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUserMessageUseCase } from "./ListUserMessagesUseCase";

class ListUserMessagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listUserMessagesUseCase = container.resolve(ListUserMessageUseCase);
    const messages = await listUserMessagesUseCase.execute(user_id);

    return response.json(messages);
  }
}

export { ListUserMessagesController };
