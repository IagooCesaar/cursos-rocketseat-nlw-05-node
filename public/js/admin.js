const chatForm = {
  usersList: document.getElementById("list_users"),
  userListTemplate: document.getElementById("template"),

  renderUsersList(connections) {
    chatForm.usersList.innerHTML = "";

    connections.forEach((connection) => {
      const rendered = Mustache.render(chatForm.userListTemplate.innerHTML, {
        id: connection.socket_id,
        email: connection.user.email,
      });

      chatForm.usersList.innerHTML += rendered;
    });
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
    chatForm.renderUsersList(connections);
  },
};

socketHandler.init();
