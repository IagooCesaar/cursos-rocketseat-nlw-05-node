import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateMessageUseCase } from "./CreateMessageUseCase";

class CreateMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { admin_id, text, user_id } = request.body;

    const createMessageUseCase = container.resolve(CreateMessageUseCase);
    const message = await createMessageUseCase.execute({
      admin_id,
      text,
      user_id,
    });

    return response.status(201).json(message);
  }
}

export { CreateMessageController };
