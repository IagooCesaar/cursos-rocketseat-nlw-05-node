const Utils = {
  FormatDate(string_date) {
    return dayjs(string_date).format("DD/MM/YYYY HH:mm:ss");
  },

  currentTimestamp() {
    return dayjs();
  },
};

const Connections = {
  list: [],
  getBySocketId(socket_id) {
    return Connections.list.find(
      (connection) => connection.socket_id === socket_id
    );
  },
};

const chatForm = {
  socketHandler: null,

  usersList: document.getElementById("list_users"),
  supportChat: document.getElementById("supports"),

  userListTemplate: document.getElementById("template"),
  adminListTemplate: document.getElementById("admin_template"),

  renderUsersList() {
    chatForm.usersList.innerHTML = "";

    Connections.list.forEach((connection) => {
      const rendered = Mustache.render(chatForm.userListTemplate.innerHTML, {
        id: connection.socket_id,
        email: connection.user.email,
      });

      chatForm.usersList.innerHTML += rendered;
    });
  },

  call(socket_id) {
    const { user } = Connections.getBySocketId(socket_id);

    const rendered = Mustache.render(chatForm.adminListTemplate.innerHTML, {
      email: user.email,
      id: user.id,
    });
    chatForm.supportChat.innerHTML += rendered;

    const params = {
      user_id: user.id,
    };
    chatForm.socketHandler.requestAllUserMessages(params);
  },

  renderMessages(messages) {
    messages.forEach(chatForm.renderOneMessage);
  },

  renderOneMessage(message) {
    const { user_id } = message;

    const divMessages = document.getElementById(`allMessages${user_id}`);
    const email = document.getElementById(`email${user_id}`).innerHTML;

    const newDiv = document.createElement("div");

    if (!message.admin_id) {
      newDiv.className = "admin_message_client";
      newDiv.innerHTML = `<span>${email}</span>`;
      newDiv.innerHTML += `<span>${message.text}</span>`;
      newDiv.innerHTML += `<span class="admin_date">${Utils.FormatDate(
        message.created_at
      )}</span>`;
    } else {
      newDiv.className = "admin_message_admin";
      newDiv.innerHTML = `Atendente: <span>${message.text}</span>`;
      newDiv.innerHTML += `<span class="admin_date">${Utils.FormatDate(
        message.created_at
      )}</span>`;
    }

    divMessages.appendChild(newDiv);
  },

  sendMessage(user_id) {
    const textElement = document.getElementById(`send_message_${user_id}`);
    const text = textElement.value;
    textElement.value = "";

    const message = {
      text,
      created_at: Utils.currentTimestamp(),
      user_id,
      admin_id: chatForm.socketHandler.socket.id,
    };
    chatForm.renderOneMessage(message);

    const params = {
      text,
      user_id,
    };
    chatForm.socketHandler.socket.emit("admin_send_message", params);
  },
};

const socketHandler = {
  socket: null,

  init() {
    socketHandler.socket = io();
    socketHandler.socket.on(
      "admin_list_all_users",
      socketHandler.onGetListUsers
    );
    socketHandler.socket.on(
      "admin_new_client_connection",
      socketHandler.onGetListUsers
    );
    socketHandler.socket.on(
      "client_send_to_admin",
      socketHandler.onReceiveMessage
    );
  },

  onReceiveMessage(message) {
    chatForm.renderOneMessage(message);
    // console.log("onReceiveMessage", message);
  },

  onGetListUsers(connections) {
    Connections.list = connections;
    chatForm.renderUsersList();
  },

  requestAllUserMessages(params) {
    socketHandler.socket.emit(
      "admin_list_messages_by_user",
      params,
      (messages) => {
        chatForm.renderMessages(messages);
      }
    );
  },
};

socketHandler.init();
chatForm.socketHandler = socketHandler;
