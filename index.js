var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){

    console.log('[Server] User connected!');

    socket.on('disconnect', function(){

        console.log('[Server] User disconnected!');

    });

    socket.on('requestData', function (msg) {

        var lineReader = require('readline').createInterface({

            input: require('fs').createReadStream('gpsDataFile.txt')

        });

        lineReader.on('line', function (line) {

            var split = line.split(",");
            socket.send({lat: parseInt(split[0]), lng: parseInt(split[1])});

        });

    });

});

http.listen(3000, function(){
    console.log('[Server] listening on *:3000');
});