const express = require("express");
const app = express();
const server = require("http").Server(app);

var SOCKET_LIST = {};
var users = [];
var rooms = [];

server.listen(process.env.PORT || 3000);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/client/index.html");
});

app.use(express.static(__dirname + "/client"));

var io = require("socket.io")(server);

io.on("connection", function(socket) {
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;
});
