var socket = io();
socket.on("connect", () => {
  console.log("Connected to server");

  socket.emit("createMessage", {
    from: "Emmanuel",
    text: "Hello world"
  });
});

socket.on("disconnect", () => {
  console.log("Disconnected to server");
});

socket.on("newMessage", function(message) {
  console.log("New Message", message);
});
