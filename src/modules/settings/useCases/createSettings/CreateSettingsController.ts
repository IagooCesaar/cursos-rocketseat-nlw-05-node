import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSettingsUseCase } from "./CreateSettingsUseCase";

class CreateSettingsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, chat } = request.body;

    const createSettingsUseCase = container.resolve(CreateSettingsUseCase);
    const settings = await createSettingsUseCase.execute({ username, chat });

    return response.status(201).json(settings);
  }
}

export { CreateSettingsController };
