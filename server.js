const express = require('express');
const app = express();
const server = require('http').Server(app);
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const io = require('socket.io')(server);
const PORT = process.env.PORT;

app.use(express.json());
app.set('view engine', "ejs");
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/uuid', (req, res) => {
    res.redirect('/' + uuidv4());
})

app.get('/:room', (req, res) => {
    res.render('rooms', {
        roomId: req.params.room
    })
})
server.listen(PORT, () => {
    console.log("server is running");
});