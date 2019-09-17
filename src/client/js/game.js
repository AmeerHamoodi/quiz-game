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
      document.getElementById('q').style.display = "block";
      document.getElementsByClassName('box')[0].style.display = "none";
      document.getElementsByClassName('logo')[0].innerText = data.question;
      document.getElementsByClassName('questions')[0].innerHTML = "<button>A</button><button>B</button><button>C</button><button>D</button>";
      let cont = document.createElement("div");
      cont.classList.add("options");
      document.getElementsByClassName('questions')[0].appendChild(cont);
      for(i=0; i < data.answers.length; i++){
        let a = data.answers[i];
        let span = document.createElement("span");
        span.innerHTML = letterOptions[i] + ". " + a;
        let br = document.createElement("br");
        span.appendChild(br);
        cont.appendChild(span);
      }
    }
    c++;
  });
})();
