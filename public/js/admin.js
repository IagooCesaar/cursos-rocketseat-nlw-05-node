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
    console.log("here", connections);
  },
};

socketHandler.init();
