var socket = io();
socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected to server");
});

socket.on("newMessage", function(message) {
  console.log("New Message", message);
  var li = jQuery("<li></li>");
  li.text(`${message.from}: ${message.text}`);
  jQuery("#messages").append(li);
});
socket.on("newLocationMessage", function(message) {
  var li = jQuery("<li></li>");
  var a = jQuery("<a target='_blank'>My current location</a>");
  li.text(`${message.from}: `);
  a.attr("href", message.url);
  li.append(a);
  jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: "User",
      text: jQuery("[name=message]").val()
    },
    function() {}
  );
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function() {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your broswer");
  }
  navigator.geolocation.getCurrentPosition(
    function(position) {
      console.log(position);
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitute: position.coords.longitude
      });
    },
    function() {
      alert("unable to fetch location");
    }
  );
});
