import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ConnectionsRepository } from "@modules/chat/infra/repositories/ConnectionsRepository";
import { MessagesRepository } from "@modules/chat/infra/repositories/MessagesRepository";
import { IConnectionsRepository } from "@modules/chat/repositories/IConnectionsRepository";
import { IMessageRepository } from "@modules/chat/repositories/IMessagesRepository";
import { SettingsRepository } from "@modules/settings/infra/repositories/SettingsRepository";
import { ISettingsRepository } from "@modules/settings/repositories/ISettingsRepository";

container.registerSingleton<ISettingsRepository>(
  "SettingsRepository",
  SettingsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IMessageRepository>(
  "MessagesRepository",
  MessagesRepository
);

container.registerSingleton<IConnectionsRepository>(
  "ConnectionsRepository",
  ConnectionsRepository
);
