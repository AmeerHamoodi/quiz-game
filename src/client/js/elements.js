window.rooms = [];
exports.room = function (room, e) {
  let con = document.createElement("div");
  con.classList.add("game");
  let gameNam = document.createElement("div");
  gameNam.classList.add("gameName");
  let users = document.createElement("div");
  users.classList.add("users");
  let category = document.createElement("div");
  category.classList.add("category");
  let join = document.createElement("button");
  join.classList.add("join");

  gameNam.innerHTML = room.name;
  users.innerHTML = "Number of players:" + "<span>"+room.people+"</span>";
  category.innerHTML = "Category: " + "<span>" + room.category + "</span>";

  con.appendChild(gameNam);
  con.appendChild(users);
  con.appendChild(category);
  con.appendChild(join);

  join.id = "room_" + e;
  join.addEventListener("click", (e) => {
    window.location.href = "game.html";
  });
  rooms.push(room);
  join.innerHTML = "Join";

  document.getElementById('games').appendChild(con);
}

exports.rooms = rooms;
