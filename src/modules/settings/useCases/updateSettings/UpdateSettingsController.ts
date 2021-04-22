import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateSettingsUseCase } from "./UpdateSettingsUseCase";

class UpdateSettingsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const { chat } = request.body;

    const updateSettingsUseCase = container.resolve(UpdateSettingsUseCase);
    const setting = await updateSettingsUseCase.execute({
      username,
      chat,
    });

    return response.json(setting);
  }
}

export { UpdateSettingsController };
