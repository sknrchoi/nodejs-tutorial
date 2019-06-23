var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');

io.on('connection',(socket) => {
    console.log('user connected');
    console.log('socket id = ', socket.id);

    socket.on('login', (data) => {
        console.log('[login] = ', data);
        io.emit('login', data.userId);
    });

    socket.on('logout', (data) => {
        console.log('[logout] = ', data);
        delete socket_id[data.userId];
        io.emit('logout', data.userId);
    });

    socket.on('message', (data) => {
        console.log('[message] = ', data);
        socket.broadcast.emit('message', data.userId + " : " + data.msg);
    });
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));

app.get('/', (req, res) => {
    res.render('index');
});

http.listen(3000, () => {
    console.log('Server on 3000 port');
});