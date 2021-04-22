import { Server, Socket } from "socket.io";
import { container } from "tsyringe";

import { User } from "@modules/accounts/entities/Users";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { UserProfileUseCase } from "@modules/accounts/useCases/userProfile/UserProfileUseCase";
import { CreateConnectionUseCase } from "@modules/chat/useCases/createConnection/CreateConnectionUseCase";
import { CreateMessageUseCase } from "@modules/chat/useCases/createMessage/CreateMessageUseCase";

interface IParams {
  text: string;
  email: string;
}

const clientSocketHandler = (io: Server, socket: Socket) => {
  socket.on("client_first_access", async (params) => {
    const { text, email } = params as IParams;

    let user: User = null;
    try {
      const createUserUseCase = container.resolve(CreateUserUseCase);
      user = await createUserUseCase.execute(email);
    } catch (error) {
      const userProfileUseCase = container.resolve(UserProfileUseCase);
      user = await userProfileUseCase.execute({
        email,
      });
    }

    const createConnectionUseCase = container.resolve(CreateConnectionUseCase);
    const connection = await createConnectionUseCase.execute({
      email,
      socket_id: socket.id,
    });

    const createMessageUseCase = container.resolve(CreateMessageUseCase);
    const message = await createMessageUseCase.execute({
      user_id: user.id,
      text,
    });
  });
};

export { clientSocketHandler };
