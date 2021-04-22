import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserProfileUseCase } from "./UserProfileUseCase";

class UserProfileController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { user_id, email } = request.body;
    const userProfileUseCase = container.resolve(UserProfileUseCase);
    const user = await userProfileUseCase.execute({
      user_id,
      email,
    });
    return response.json(user);
  }
}

export { UserProfileController };
