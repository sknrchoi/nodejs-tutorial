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

        var room = data.room;
        socket.join(room);
        socket.room = room;
        socket.broadcast.to(room).emit('login', data.userId);
    });

    socket.on('logout', (data) => {
        console.log('[logout] = ', data);
        
        if(typeof socket.room !== "undefined" && socket.room !== null) {
            socket.broadcast.to(socket.room).emit('logout', data.userId);
        }
    });

    socket.on('message', (data) => {
        console.log('[message] = ', data);
        
        if(typeof socket.room !== "undefined" && socket.room !== null) {
            io.in(socket.room).emit('message', {
                type : 'message',
                userId : data.userId,
                msg : data.msg
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('[disconnect]');

        if(typeof socket.room !== "undefined" && socket.room !== null) {
            socket.broadcast.to(socket.room).emit('logout', data.userId);
        }
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