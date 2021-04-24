import { Server, Socket } from "socket.io";
import { container } from "tsyringe";

import { User } from "@modules/accounts/entities/Users";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { UserProfileUseCase } from "@modules/accounts/useCases/userProfile/UserProfileUseCase";
import { CreateClientConnectionUseCase } from "@modules/chat/useCases/createClienteConnection/CreateClientConnectionUseCase";
import { CreateMessageUseCase } from "@modules/chat/useCases/createMessage/CreateMessageUseCase";
import { GetClientsWithoutAdminUseCase } from "@modules/chat/useCases/getClientsWithoutAdmin/GetClientsWithoutAdminUseCase";
import { ListUserMessagesUseCase } from "@modules/chat/useCases/listUserMessages/ListUserMessagesUseCase";

interface IParams {
  text: string;
  email: string;
}

const CreateClientConnectionSocketHandler = (io: Server, socket: Socket) => {
  return async (params: IParams): Promise<void> => {
    const { text, email } = params;

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

    const createConnectionUseCase = container.resolve(
      CreateClientConnectionUseCase
    );
    await createConnectionUseCase.execute({
      email,
      socket_id: socket.id,
    });

    const createMessageUseCase = container.resolve(CreateMessageUseCase);
    await createMessageUseCase.execute({
      user_id: user.id,
      text,
    });

    const listUserMessages = container.resolve(ListUserMessagesUseCase);
    const allMessages = await listUserMessages.execute(user.id);

    socket.emit("client_list_all_messages", allMessages);

    const getClientsWithoutAdminUseCase = container.resolve(
      GetClientsWithoutAdminUseCase
    );
    const connections = await getClientsWithoutAdminUseCase.execute();
    io.emit("admin_new_client_connection", connections);
  };
};

export { CreateClientConnectionSocketHandler };
