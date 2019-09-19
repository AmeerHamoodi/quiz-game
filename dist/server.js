var questions =  [
  {
    question: "Are you ready?????"
  },
  {
    question: "What system plays a vital role in the existence of the human species?",
    answers: ["cardiovascular system", "respiratory system", "digestive system", "reproductive system"],
    correct: 3
  },
  {
    question: "What type of cell does not have membrane-bound organelles?",
    answers: ["plant", "eukaryotic", "somatic", "prokaryotic"],
    correct: 3
  },
  {
    question: "An ATP molecule is made up of",
    answers: [
      "matrix, inner membrane, and outer membrane.",
      "NADH, NADPH, and FADH.",
      "adenine, phosphate groups, and ribose.",
      "guacamole"
    ],
    correct: 2
  },
  {
    question: "Are enzymes reusable?",
    answers: ["yes", "no", "sometimes", "only when they're happy"],
    correct: 0
  },
  {
    question: "How many major categories of macromolecules are there?",
    answers: ["2", "3", "4", "5"],
    correct: 3
  },
  {
    question: "Which is not a part of the circulatory system?",
    answers: ["lung", "heart", "blood", "oxygen"],
    correct: 0
  },
  {
    question: "What property makes phospholipids the ideal organic molecule to make up the cell membrane?",
    answers: [
      "Phospholipids dissolve easily in water, so materials can pass through them without the need for energy.",
      "Phospholipids contain many mitochondria, so the cell membrane has all the energy it needs to undergo mitosis.",
      "Phospholipids maintain their shape all the time, so organisms made from these cells can grow very large.",
      "Phospholipids have hydrophobic and hydrophilic ends, so cells can live in an aqueous environment and still carry out all their functions."
    ],
    correct: 3
  },
  {
    question: "Protein-building information is carried from the nucleus to the ribosomes by",
    answers: [
      "DNA.",
      "endoplasmic reticulum.",
      "vacuoles.",
      "RNA."
    ],
    correct: 3
  },
  {
    question: "All are properties of water except",
    answers: [
      "adhesion.",
      "cohesion",
      "heat capacity.",
      "enzyme ability."
    ],
    correct: 3
  },
  {
    question: "Enzymes and some hormones are examples of",
    answers: [
      "proteins.",
      "carbohydrates.",
      "lipids.",
      "nucleic acids."
    ],
    correct: 0
  },
  {
    question: "Game Over!"
  }
]

const express = require("express");
const utils = require("./utils.js");
var app = express();
var server = require("http").Server(app);
var SOCKET_LIST = {};
var rString = utils.randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
var lobbies = [];
var users = [];
var htmlDir = __dirname + "/client";

server.listen(process.env.PORT || 3000);
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
    this.count = 0;
  }
  startGame(){
    this.phase = "game";
    io.emit("start", {message: "Starting game . . . "});
  }
  sendQuestions(){
    this.phase = "response";
    console.log(this.phase);
    io.emit("question", questions[this.count]);
    this.response();
  }
  response() {
    this.count++;
    console.log(this.count);
    if(this.count % 2 == 0){
      this.phase = "game";
    }
  }
  checkResponse(index){
    if(questions[this.count].correct == index){
      return true
    } else {
      return false;
    }
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
  for(i=0; i < lobbies.length; i++){
    io.to("default").emit("lobbies", lobbies[i]);
  }

  socket.on("room", function(data) {
    lobbies[0].people++
    console.log(lobbies[0].people);
    socket.emit("lob", "lobby="+lobbies[0].id);
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
  for(let i=0; i < lobbies.length; i ++){
    if(lobbies[i].people >= 2){
      if(lobbies[i].phase == "menu"){
        lobbies[i].startGame();
      }
    }
  }
}
function sendQuestions() {
  for(let i=0; i < lobbies.length; i ++){
    if(lobbies[i].phase == "game" && lobbies[i].phase != "response"){
      lobbies[i].sendQuestions();
      respond();
    }
  }
}
function respond() {
  setTimeout(function() {
    lobbies[0].response();
  }, 4000);
}
function clientResponse() {
  for(var i in SOCKET_LIST){
    var socket = SOCKET_LIST[i];
    socket.on("answer", function(data) {
      console.log(data);
      if(lobbies[0].checkResponse(data)){
        socket.emit("response", {response: true});
      } else {
        socket.emit("response", {response: false});
      }
    });
  }
}
clientResponse();
setInterval(sendQuestions, 500);
setInterval(checkRooms, 500);
