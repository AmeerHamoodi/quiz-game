var socket = require("socket.io-client")();
let r = document.cookie;

var letterOptions = ["a", "b", "c", "d"];

(function setup() {
  let c = 0;
  socket.emit("room", "test");
  socket.on("start", (data) => {
    document.getElementsByClassName('logo')[0].innerText = data.message;
  });
  socket.on("lob", (data) => {
    window.location.hash = data;
  })
  socket.on("question", (data) => {
    if(c < 1){
      document.getElementsByClassName('dio')[0].style.display = "none";
      document.getElementsByClassName('logo')[0].innerText = data.question;
      document.getElementsByClassName('aboutV')[0].style.height = "100vh";
      document.getElementById('container').classList.remove('container');
      document.getElementById('container').classList.add("container2");
    } else {
      let cont = document.getElementsByClassName('options');
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
})();

function eventListen() {
  console.log(document.getElementById('0'));
    document.getElementById("0").addEventListener("click", (event) => {
      socket.emit("answer", 0);
    }), document.getElementById("1").addEventListener("click", (event) => {
      socket.emit("answer", 1);
    }), document.getElementById("2").addEventListener("click", (event) => {
      socket.emit("answer", 2);
    }), document.getElementById("3").addEventListener("click", (event) => {
      socket.emit("answer", 3);
    });
}
eventListen();
