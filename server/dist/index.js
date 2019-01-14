"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var fs = require('fs');
var https;
var baseUrl;
if (process.env.SSL_KEY && process.env.SSL_CRT) {
    console.log('Using secure https server');
    https = require('https').Server(__assign({}, app, {
        key: fs.readFileSync(process.env.SSL_KEY, 'utf8'),
        cert: fs.readFileSync(process.env.SSL_CRT, 'utf8')
    }));
    baseUrl = 'https://localhost';
}
else {
    console.log('Using insecure http server');
    https = require('http').Server(app);
    baseUrl = 'http://localhost';
}
var socket_io_1 = __importDefault(require("socket.io"));
var io = socket_io_1.default(https);
io.on('connection', function (socket) {
    console.log('NEW CONNECTION');
    socket.on('disconnect', function () {
        console.log('Disconnect: ', socket.nickname);
        io.emit('users-changed', { user: socket.nickname, event: 'left' });
    });
    socket.on('set-nickname', function (nickname) {
        console.log('set-nickname', nickname);
        socket.nickname = nickname;
        io.emit('users-changed', { user: nickname, event: 'joined' });
    });
    socket.on('add-message', function (message) {
        console.log('msg:', socket.nickname, message.text);
        io.emit('message', { text: message.text, from: socket.nickname, created: new Date() });
    });
});
var port = process.env.PORT || 3001;
https.listen(port, function () {
    console.log('listening in http://localhost:' + port);
});
