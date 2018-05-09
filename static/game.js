var socket = io();

var playId;

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});

socket.on('playerId', function (plId) {
    var key = document.getElementById('key');
    console.log(plId.num);
    playId = plId.num;
    key.innerHTML="<p>Ваш ключ:" + playId + "</p>";
});

setInterval(function() {
  socket.emit('pId', playId);
  socket.emit('movement', movement);
}, 1000 / 60);

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
socket.on('state', function(players) {
  //console.log(players);
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'red';
  var player = players[playId];
  context.beginPath();
  context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
  context.fill();
});

