const socketHandler = {
  socket: null,
  chatForm: null,
  admin_id: null,

  init(chatForm) {
    socketHandler.chatForm = chatForm;
    socketHandler.socket = io();
    socketHandler.socket.on("connect", socketHandler.onConnect);
    socketHandler.socket.on(
      "client_list_all_messages",
      socketHandler.onGetAllMessages
    );
    socketHandler.socket.on(
      "admin_send_to_client",
      socketHandler.onReceiveMessage
    );

    return true;
  },

  onConnect() {
    const params = {
      text: socketHandler.chatForm.textArea.value,
      email: socketHandler.chatForm.email.value,
    };

    socketHandler.socket.emit(
      "client_first_access",
      params,
      (callback, err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(callback);
        }
      }
    );
  },

  onGetAllMessages(messages) {
    const templateClient = socketHandler.chatForm.templateClient.innerHTML;
    const templateAdmin = socketHandler.chatForm.templateAdmin.innerHTML;

    messages.forEach(chatForm.renderMessage);
  },

  onReceiveMessage(data) {
    const { text, socket_id } = data;
    socketHandler.admin_id = socket_id;

    const message = {
      text,
      admin_id: socket_id,
    };
    socketHandler.chatForm.renderMessage(message);
  },
};

const chatForm = {
  chatHelp: document.querySelector("#chat_help"),
  chatInSupport: document.querySelector("#chat_in_support"),

  templateClient: document.getElementById("message-user-template"),
  templateAdmin: document.getElementById("admin-template"),

  textArea: document.getElementById("txt_help"),
  email: document.getElementById("email"),

  changeToHistory() {
    chatForm.chatHelp.style.display = "none";
    chatForm.chatInSupport.style.display = "block";
  },

  renderMessage(message) {
    const templateClient = chatForm.templateClient.innerHTML;
    const templateAdmin = chatForm.templateAdmin.innerHTML;

    if (!message.admin_id) {
      const rendered = Mustache.render(templateClient, {
        message: message.text,
        email: message.user.email,
      });

      document.getElementById("messages").innerHTML += rendered;
    } else {
      const rendered = Mustache.render(templateAdmin, {
        message_admin: message.text,
      });
      document.getElementById("messages").innerHTML += rendered;
    }
  },

  init() {
    console.log("Iniciou o chat");
    if (socketHandler.init(chatForm)) {
      chatForm.changeToHistory();
    }
  },
};
