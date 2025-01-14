// Socket IO fehlt
// SQL Light fehlt
// -> Von Protestwand Code holen (auch mal nach UDP Protokoll suchen)


// --------------------- UDP -------------------------
const udp = require('dgram');

// creating a udp server
const serverudp = udp.createSocket('udp4');
const HOST = '0.0.0.0';
const PORT = 30000;

// emits when any error occurs
serverudp.on('error',function(error){
  console.log('Error: ' + error);
  serverudp.close();
});

//receiving messages
serverudp.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

// Check if server is listening
serverudp.on('listening', () => {
    const address = serverudp.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

serverudp.bind({
    address: HOST,
    port: PORT,
    exclusive: true
});


// --------------------- Database Connection -------------------------
// const sqlite3 = require("sqlite3");
// const db = new sqlite3.Database("hambacherschloss.db");


// --------------------- Server Connection und Socket -------------------------
const express = require('express');
const app = express();


const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

const publicpath = path.join(__dirname, 'public');

app.use(express.static(publicpath, {extensions: ['html']}));

server.listen(9000, () => {
  console.log('listening on *:9000');
});


io.on('connection', (socket) => {
    console.log('Socket IO connection success');

});

