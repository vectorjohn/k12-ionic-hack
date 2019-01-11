let app = require('express')();
let fs = require('fs');
let https = require('https').Server(Object.assign({}, app, {
    key: fs.readFileSync(process.env.SSL_KEY, 'utf8'),
    cert: fs.readFileSync(process.env.SSL_CRT, 'utf8')
}));

let io = require('socket.io')(https);

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

https.listen(port, function () {
    console.log('listening in http://localhost:' + port);
});