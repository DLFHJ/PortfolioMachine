// --------------------- UDP & OSC-------------------------
const udp = require('dgram');
const osc = require("osc");

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


// Create an OSC UDP Port listening for incoming messages on port 3333
const udpPort = new osc.UDPPort({
  localAddress: "0.0.0.0", // Listen on all available IP addresses
  localPort: 7000           // The port to listen on (should match your Arduino's destination port)
});

// Open the UDP Port
udpPort.open();

// When a message is received, this callback will be invoked
udpPort.on("message", function (oscMsg) {
  // Check the address of the OSC message
  switch (oscMsg.address) {
      case '/exhibit/rfid':
          if (oscMsg.args && oscMsg.args.length > 0) {
              console.log("RFID argument:", oscMsg.args[0]);
              selectStudent(oscMsg.args[0]);
          } else {
              console.log("No arguments received for /exhibit/rfid");
          }
          break;

      case '/exhibit/motion':
          if (oscMsg.args && oscMsg.args.length > 0) {
              console.log("Motion argument:", oscMsg.args[0]);
              io.emit('yValue', oscMsg.args[0]);
          } else {
              console.log("No arguments received for /exhibit/motion");
          }
          break;

      default:
          console.log("Unknown OSC address:", oscMsg.address);
          break;
  }
});

udpPort.on("listening", function () {
  console.log("UDP listening on ", localPort);

});

// Error handling
udpPort.on("error", function (error) {
  console.log("Error occurred:", error);
});


// --------------------- Database Connection -------------------------
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("db/portfolioMachine.db", (err) => {
  if (err) {
    console.error("Error opening database: ", err.message);
    return;
  }
  console.log("Connected to the SQLite database.");
});



io.on('connection', (socket) => {
    console.log('Socket IO connection success');

    socket.on('start', () => {
      console.log('socket funktioniert');
      io.emit('sockeeeeet');

    });

});




// ------------------ DB Abfragen ------------------------------
async function selectStudent(studentId) {

  let obj = {};

  try {
    const selectStudentquery = "SELECT id, name, lastname, major FROM students WHERE rfid = ?";

    const thisStudent = await new Promise((resolve, reject) => {
      db.get(selectStudentquery, [studentId], function (err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    if(thisStudent){
      obj['id'] = thisStudent.id;
      obj['name'] = thisStudent.name;
      obj['lastname'] = thisStudent.lastname;
      obj['major'] = thisStudent.major;
    } else{
      console.log('errooooooor');
    }


    // let c = 0;
    // thisStudent.forEach((row) => {
    //   obj[c] = {};
    //   obj[c]['id'] = row['id'];
    //   obj[c]['name'] = row['name'];
    //   obj[c]['lastname'] = row['lastname'];
    //   obj[c]['major'] = row['major'];
    //   obj[c]['link'] = row['link'];
    //   c++;
    // });

  } catch (err) {
    console.log(err);
  } finally {
    console.log('Student Data: ', obj);
    io.emit('studentData', obj);
  }
}

selectStudent(2);
