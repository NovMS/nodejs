var socket = io();

var playId;

var movement = {
    up: false,
    down: false,
    left: false,
    right: false
}

bLeft = document.getElementById('left');
bRight = document.getElementById('right');
bUp = document.getElementById('up');
bDown = document.getElementById('down');

bLeft.addEventListener('mousedown', function(event) {
    movement.left = true;
});
bRight.addEventListener('mousedown', function(event) {
    movement.right = true;
});
bUp.addEventListener('mousedown', function(event) {
    movement.up = true;
});
bDown.addEventListener('mousedown', function(event) {
    movement.down = true;
});

bLeft.addEventListener('mouseup', function(event) {
    movement.left = false;
});
bRight.addEventListener('mouseup', function(event) {
    movement.right = false;
});
bUp.addEventListener('mouseup', function(event) {
    movement.up = false;
});
bDown.addEventListener('mouseup', function(event) {
    movement.down = false;
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