const express = require("express");
const utils = require("./utils.js");
var app = express();
var server = require("http").Server(app);
var SOCKET_LIST = {};
var rString = utils.randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
var lobbies = [{name:"default", id:rString, members:0, max:2}];
var users = [];

server.listen(3000);
console.log("Starting server");

app.get("/", function(req, res){
  res.sendFile(__dirname + "/client/index.html");
});

app.use(express.static({extensions: ['html', 'htm'], path: __dirname + "/client"}));

var io = require("socket.io")(server);

class User{
  constructor(id, name, page){
    this.id = id;
    this.name = name;
    this.score = 0;
    this.page = page;
  }
  join(room){
    let socket = SOCKET_LIST[this.id];
    socket.join(room.name);
    socket.emit("newRoom", room);
  }
  disconnect(){
    delete SOCKET_LIST[this.id];
  }
}

class Room{
  constructor(id, name){
    this.id = id;
    this.name = name;
    this.people = 0;
    this.max = 2;
    this.users = [];
  }
}

io.on("connection", function(socket){
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  users.push(new User(socket.id, "Guest"));
  socket.room = lobbies[0].name;
  socket.join("default");
  socket.emit("init", {room: lobbies[0].name, id: lobbies[0].id});
  for(i=0; i < lobbies.length; i++){
    io.to("default").emit("lobbies", lobbies[i]);
  }
  socket.on("newLobby", function(data){
    let u;
    let ri = utils.randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    let n = data;
    lobbies.push(new Room(ri, n));
    console.log(lobbies);
    for(e=0; e < users.length; e++){
      if(users[e].id == socket.id){
        u = users[e];
      }
    }
    for(i=0; i < lobbies.length; i++){
      if(lobbies[i].id == ri){
        lobbies[i].users.push(u);
        lobbies[i].people++;
        socket.leave("default");
        socket.join(n);
        socket.room = n;
        console.log(socket.room);
        socket.broadcast.emit("lobbies", lobbies[i]);
        socket.emit("lob", {id: lobbies[i].id, name: lobbies[i].name});
      }
    }
  });

  socket.on("disconnect", function(data){
    for(i=0; i < users.length; i++){
      if(users[i].id == socket.id){
        users[i].disconnect();
        users.splice(i, 1);
      }
    }
  });
});
