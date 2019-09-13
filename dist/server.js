const express = require("express");
const utils = require("./utils.js");
var app = express();
var server = require("http").Server(app);
var SOCKET_LIST = {};
var rString = utils.randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
var lobbies = [];
var users = [];
var htmlDir = __dirname + "/client";

var questions = require("./questions.js");

server.listen(3000);
console.log("Starting server");

app.get("/", function(req, res){
  res.sendFile(__dirname + "/client/index.html");
});

app.use(express.static(htmlDir, { extensions: ['html'] }));

var io = require("socket.io")(server);

class User{
  constructor(id, name, page){
    this.id = id;
    this.name = name;
    this.score = 0;
    this.page = page;
    this.room = "default";
  }
  join(room){
    this.room = room;
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
    this.category = "Biology";
    this.phase = "menu";
    this.q = 0;
  }
  startGame(){
    io.emit("start", {message: "Starting game . . . "});
    this.phase = "game";
  }
  sendQuestions(){
    io.to(this.name).emit("question", {q: questions[0].question, a: questions[0].answers});
  }
}

lobbies.push(new Room(rString, "default"));

io.on("connection", function(socket){
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  users.push(new User(socket.id, "Guest"));
  socket.room = lobbies[0].name;
  socket.join("default");
  socket.emit("init", lobbies);
  socket.on("newLobby", function(data){
    let u;
    let ri = utils.randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    let n = data;
    lobbies.push(new Room(ri, n));
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
        socket.broadcast.emit("lobbies", lobbies[i]);
        socket.emit("lob", {id: lobbies[i].id, name: lobbies[i].name});
      }
    }
  });

  socket.on("room", function(data) {
    socket.join(data);
    socket.leave("default");
    socket.room = data;
    lobbies[0].people ++;
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

function checkRooms() {
  for(i=0; i < lobbies.length; i ++){
    if(lobbies[i].people >= 2){
      lobbies[i].startGame();
      console.log("checking");
    }
  }
}
setInterval(checkRooms, 500);
