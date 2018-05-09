// Зависимости
var express = require('express');
var bodyParser = require("body-parser");
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

var players = {};
var id = {
    num: 0
}

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

app.use('/way', express.static(__dirname + '/way'));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

app.use('/form_tel', bodyParser.urlencoded({
    extended: true
}));

app.post('/form_tel', function(req, res) {
    console.dir(req.body);
    id.num = req.body.first_name;
    if (players[id.num]){
        res.redirect('way/gamepad.html');
    }
    else {
        res.status(404).send('Такого подключения не существует')
    }

});

app.use('/form_pc', bodyParser.urlencoded({
    extended: true
}));

app.post('/form_pc', function(req, res) {
    console.dir(req.body);
    id.num = req.body.first_name;
    if (players[id.num]){}
    else {
        players[id.num] = {
            x: 300,
            y: 300
        };
    }
    console.dir(id);
    res.redirect('way/game.html');
});

io.on('connection', function(socket) {

    var plId;

    socket.emit('playerId', id);

    socket.on('pId', function (pId) {
        plId=pId;
    });

  socket.on('movement', function(data) {
    var player = players[plId] || {};
    if (data.left && player.x != 0) {
      player.x -= 5;
    }
    if (data.up && player.y != 0) {
      player.y -= 5;
    }
    if (data.right && player.x != 800) {
      player.x += 5;
    }
    if (data.down && player.y != 600) {
      player.y += 5;
    }
  });
});


setInterval(function() {
  io.sockets.emit('state', players);
}, 1000 / 60);
