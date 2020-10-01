// npm instal express
const express = require("express");
const app = express();

//Server
const httpServer = require("http").createServer(app);
const socketServer = require("socket.io")(httpServer);
//const path = require("path");
app.use(express.static("Activity"));

socketServer.on("connection", function (socket) {
    console.log("New client connected")
    console.log(socket.id);
    // listener=> recieve
    socket.on("colorChange", function (color) {
        console.log(color);
    })
})
