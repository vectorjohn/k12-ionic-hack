import express = require('express');
let app = express();
let fs = require('fs');
let https: any;
let baseUrl: string;
if (process.env.SSL_KEY && process.env.SSL_CRT) {
  console.log('Using secure https server');
  https = require('https').Server({...app, ...{
      key: fs.readFileSync(process.env.SSL_KEY, 'utf8'),
      cert: fs.readFileSync(process.env.SSL_CRT, 'utf8')
  }});
  baseUrl = 'https://localhost';
}
else {
  console.log('Using insecure http server');
  https = require('http').Server(app);
  baseUrl = 'http://localhost';
}

import socketio from 'socket.io';
let io = socketio(https);

interface MySocket extends socketio.Socket {
  nickname?: string;
}

interface Message {
  text: string;
  from: string;
  created: Date;
}

const history: Message[] = [];

io.on('connection', (socket: MySocket) => {

    console.log('NEW CONNECTION');

    socket.on('disconnect', function () {
        console.log('Disconnect: ', socket.nickname);
        io.emit('users-changed', {user: socket.nickname, event: 'left'});
    });

    socket.on('set-nickname', (nickname) => {
        console.log('set-nickname', nickname);
        socket.nickname = nickname;
        io.emit('users-changed', {user: nickname, event: 'joined'});
        //send the last 100 messages to the new user
        history.slice(-100).forEach(msg => {
          socket.emit('add-message', msg);
        })
    });

    socket.on('add-message', (message) => {
        console.log('msg:', socket.nickname, message.text);
        const emitMessage: Message = {
          text: message.text,
          from: socket.nickname || 'Unknown User', //should not be allowed
          created: new Date()
        };
        history.push(emitMessage);
        io.emit('message', emitMessage);
    });
});

var port = process.env.PORT || 3001;

https.listen(port, function () {
    console.log('listening in http://localhost:' + port);
});
