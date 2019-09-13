var socket = require("socket.io-client")(),
elemHandler = require("./elements.js");

function socketSetup() {
  socket.on("init", (data) => {
    console.log(data);
    for(let i = 0; i < data.length; i++){
      elemHandler.room(data[i], i);
    }
  });
}

for(i=0; i < elemHandler.rooms; i++){
  console.log("test");
  document.getElementById('join_' + i).addEventListener("click", (e) => {
    window.location.href = "/games?" + elemHandler.rooms.id;
  });
}

socketSetup();
