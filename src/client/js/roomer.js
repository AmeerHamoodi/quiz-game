console.log("a");

exports.socketSetup = function () {
  console.log("w");
  socket.on("init", (data) => {
    for(let i = 0; i < data.length; i++){
      elemHandler.room(data[i]);
    }
  });
}
