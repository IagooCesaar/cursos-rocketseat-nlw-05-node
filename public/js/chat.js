const chatForm = {
  socket: null,

  chatHelp: document.querySelector("#chat_help"),
  chatInSupport: document.querySelector("#chat_in_support"),

  textArea: document.getElementById("txt_help"),
  email: document.getElementById("email"),

  changeToHistory() {
    chatForm.chatHelp.style.display = "none";
    chatForm.chatInSupport.style.display = "block";
  },

  init() {
    console.log("Iniciou o chat");
    chatForm.socket = io();

    const params = {
      text: chatForm.textArea.value,
      email: chatForm.email.value,
    };

    chatForm.socket.on("connect", () => {
      chatForm.socket.emit("client_first_access", params, (call, err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(call);
        }
      });
    });

    chatForm.changeToHistory();
  },
};
