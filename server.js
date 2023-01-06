const express = require('express');
const app = express();
const server = require('http').Server(app);
require('dotenv').config();
const PORT = process.env.PORT;

app.use(express.json());
app.set('view engine', "ejs");
app.use(express.static('public'));
server.listen(PORT, () => {
    console.log("server is running");
});