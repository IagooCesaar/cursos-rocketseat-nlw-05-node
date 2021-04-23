const socketHandler = {
  socket: null,
  chatForm: null,

  init(chatForm) {
    socketHandler.chatForm = chatForm;
    socketHandler.socket = io();
    socketHandler.socket.on("connect", socketHandler.onConnect);

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

    socketHandler.socket.on(
      "client_list_all_messages",
      socketHandler.onGetAllMessages
    );
  },

  onGetAllMessages(messages) {
    const templateClient = socketHandler.chatForm.templateClient.innerHTML;
    const templateAdmin = socketHandler.chatForm.templateAdmin.innerHTML;

    messages.forEach((message) => {
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
    });
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

  init() {
    console.log("Iniciou o chat");
    if (socketHandler.init(chatForm)) {
      chatForm.changeToHistory();
    }
  },
};
