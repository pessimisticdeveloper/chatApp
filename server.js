const express = require('express')    // This code has a filename of server.js and is written in JavaScript.
const socket = require('socket.io')

const app = express(); //express modülünü çağır
const server = app.listen(3000) //dinleme işlemi

app.use(express.static('public')) //public klasörünü aç

const io = socket(server) //SERVER CAĞIRMA

io.on('connection', (socket) => { // bağlantıların idlerini görmek için
    console.log("bağlantı id'si "+socket.id); //bağlantı id'si

    socket.on('chat', data => {  //datayı al
        io.sockets.emit('chat', data) //datay
    })

    server.on('typing', data => { //datayı al
        socket.broadcast.emit('typing', data) //data
    })
})
