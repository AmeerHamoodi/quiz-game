var socket = require("socket.io-client")(),
  r = document.cookie,
  letterOptions = ["a", "b", "c", "d"],
  player = {
    id: null,
    score: 0,
    name: null
  };

(function setup() {
  let c = 0;
  socket.emit("room", "test");
  socket.on("start", (data) => {
    document.getElementsByClassName('logo')[0].innerText = data.message;
  });
  socket.on("lob", (data) => {
    window.location.hash = data.lob;
    player.id = data.id;
  })
  socket.on("question", (data) => {
    if(c < 1){
      document.getElementsByClassName('dio')[0].style.display = "none";
      document.getElementsByClassName('logo')[0].innerText = data.question;
      document.getElementsByClassName('aboutV')[0].style.height = "100vh";
      document.getElementById('container').classList.remove('container');
      document.getElementById('container').classList.add("container2");
    } else {
      enable();
      document.getElementsByClassName('response')[0].innerHTML = "";
      let cont = document.getElementsByClassName('options');
      document.getElementsByClassName('aboutV')[0].style.display = "block";
      document.getElementById('q').style.display = "block";
      document.getElementsByClassName('box')[0].style.display = "none";
      document.getElementsByClassName('logo')[0].innerText = data.question;
      document.getElementsByClassName('options')[0].innerHTML = "";
      for(i=0; i < data.answers.length; i++){
        let a = data.answers[i];
        let span = document.createElement("span");
        span.innerText = letterOptions[i] + ". " + a + "   ";
        let br = document.createElement("br");
        let br2 = document.createElement("br");
        document.getElementsByClassName('options')[0].appendChild(span);
        document.getElementsByClassName('options')[0].appendChild(br);
        document.getElementsByClassName('options')[0].appendChild(br2);
      }
    }
    c++;
  });

  socket.on("response", (data) => {
    if(data.response) {
      document.getElementsByClassName('response')[0].innerText = "Nice you got it right!";
    } else {
      document.getElementsByClassName('response')[0].innerText = "That's an F in the chat, rip you got it wrong :(";
    }
  })
})();

function eventListen() {
  console.log(document.getElementById('0'));
    document.getElementById("0").addEventListener("click", (event) => {
      socket.emit("answer", {ans: 0, id: player.id});
      console.log("hitt");
      document.getElementsByClassName('aboutV')[0].style.display = "none";
      document.getElementById("0").disabled = true;
    }), document.getElementById("1").addEventListener("click", (event) => {
      socket.emit("answer", {ans: 1, id: player.id});
      document.getElementsByClassName('aboutV')[0].style.display = "none";
      document.getElementById("1").disabled = true;
    }), document.getElementById("2").addEventListener("click", (event) => {
      socket.emit("answer", {ans: 2, id: player.id});
      document.getElementsByClassName('aboutV')[0].style.display = "none";
      document.getElementById("2").disabled = true;
    }), document.getElementById("3").addEventListener("click", (event) => {
      socket.emit("answer", {ans: 3, id: player.id});
      document.getElementsByClassName('aboutV')[0].style.display = "none";
      document.getElementById("3").disabled = true;
    });
}
eventListen();

function enable() {
  document.getElementById("0").disabled = false;
  document.getElementById("1").disabled = false;
  document.getElementById("2").disabled = false;
  document.getElementById("3").disabled = false;
}
