import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListUserMessagesUseCase } from "./ListUserMessagesUseCase";

class ListUserMessagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const listUserMessagesUseCase = container.resolve(ListUserMessagesUseCase);
    const messages = await listUserMessagesUseCase.execute(user_id);

    return response.json(messages);
  }
}

export { ListUserMessagesController };
