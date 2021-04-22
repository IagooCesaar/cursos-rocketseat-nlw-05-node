import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetSettingsUseCase } from "./GetSettingsUseCase";

class GetSettingsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username } = request.params;
    const getSettinsUseCase = container.resolve(GetSettingsUseCase);
    const settings = await getSettinsUseCase.execute({ username });
    return response.json(settings);
  }
}

export { GetSettingsController };
