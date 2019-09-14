var socket = require("socket.io-client")();
let r = document.cookie;
socket.emit("room", r);

function setup() {
  socket.on("start", (data) => {
    document.getElementsByClassName('logo')[0].innerText = data.message;
  });
  socket.on("question", (data) => {
    console.log(data);
  })
}
setup();
