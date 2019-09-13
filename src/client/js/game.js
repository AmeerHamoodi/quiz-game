var socket = require("socket.io-client")();
let r = document.cookie;
socket.emit("room", r);

function setup() {
  socket.on("")
  socket.on("start", (data) => {
    document.getElementsByClassName('logo')[0].innerText = data.message;
  });
}
setup();
