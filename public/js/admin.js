const Connections = {
  list: [],
  getBySocketId(socket_id) {
    return Connections.list.find(
      (connection) => connection.socket_id === socket_id
    );
  },
};

const chatForm = {
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

    console.log(rendered);

    chatForm.supportChat.innerHTML += rendered;
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
  },

  onGetListUsers(connections) {
    Connections.list = connections;
    chatForm.renderUsersList();
  },
};

socketHandler.init();
