var socket = require("socket.io-client")();
let r = document.cookie;
socket.emit("room", r);



function setup() {
  let c = 0;
  socket.on("start", (data) => {
    document.getElementsByClassName('logo')[0].innerText = data.message;
  });
  socket.on("question", (data) => {
    if(c < 1){
      document.getElementsByClassName('dio')[0].style.display = "none";
      document.getElementsByClassName('logo')[0].innerText = data.question;
      document.getElementsByClassName('aboutV')[0].style.height = "100vh";
      document.getElementById('container').classList.remove('container');
      document.getElementById('container').classList.add("container2");
    } else {
      document.getElementById('q').style.display = "block";
    }
    c++;
  });
}
setup();
