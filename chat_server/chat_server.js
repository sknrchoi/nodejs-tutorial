var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');

io.on('connection',(socket) => {
    console.log('user connected');
    console.log('socket id = ', socket.id);

    socket.on('login', (msg) => {
        console.log('client answer [login] = ', msg);
        io.emit('login', socket.id + ' is logined');
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