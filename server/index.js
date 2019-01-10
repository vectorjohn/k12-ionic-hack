let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {

    console.log('NEW CONNECTION');

    socket.on('disconnect', function () {
        console.log('Disconnect: ', socket.nickname);
        io.emit('users-changed', {user: socket.nickname, event: 'left'});
    });

    socket.on('set-nickname', (nickname) => {
        console.log('set-nickname', nickname);
        socket.nickname = nickname;
        io.emit('users-changed', {user: nickname, event: 'joined'});
    });

    socket.on('add-message', (message) => {
        console.log('msg:', socket.nickname, message.text);
        io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});
    });
});

var port = process.env.PORT || 3001;

http.listen(port, function () {
    console.log('listening in http://localhost:' + port);
});