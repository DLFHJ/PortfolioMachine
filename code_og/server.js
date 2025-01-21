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
              // selectStudent(oscMsg.args[0]);
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
  let obj = {}; // Object to hold student data

  try {
    // Step 1: Query to select student details
    const selectStudentQuery = "SELECT id, name, lastname, major, link FROM students WHERE rfid = ?";

    const thisStudent = await new Promise((resolve, reject) => {
      db.get(selectStudentQuery, [studentId], function (err, row) {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    if (!thisStudent) {
      console.log('Error: Student not found.');
      return;
    }

    // Step 2: Assign the student's data to obj
    obj['vorname'] = thisStudent.name;
    obj['nachname'] = thisStudent.lastname;
    obj['major'] = thisStudent.major;
    obj['link'] = thisStudent.link;

    // Step 3: Query to select projects for the student
    const selectProjectsQuery = "SELECT id, title, shorttitle, tags, year, cooperationId, cooperationName, team, position FROM projects WHERE studentId = ?";

    const projects = await new Promise((resolve, reject) => {
      db.all(selectProjectsQuery, [thisStudent.id], function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    // Step 4: For each project, get the content and combine it
    const projectData = await Promise.all(projects.map(async (project, index) => {
      // Query to select content for this project
      const selectContentQuery = "SELECT text, position, fileformat FROM content WHERE projectId = ?";

      const content = await new Promise((resolve, reject) => {
        db.all(selectContentQuery, [project.id], function (err, rows) {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      // Step 5: Query to get the actual cooperation name from the cooperationId
      const selectCooperationQuery = "SELECT name FROM cooperations WHERE id = ?";

      const cooperationName = await new Promise((resolve, reject) => {
        db.get(selectCooperationQuery, [project.cooperationId], function (err, row) {
          if (err) {
            reject(err);
          } else {
            resolve(row ? row.name : 'Unknown');
          }
        });
      });

      // Map the content to the appropriate structure
      const contentData = content.map(item => ({
        text: item.text,
        position: item.position,
        fileformat: item.fileformat,
      }));

      // Return the project data including its content and cooperation name
      return {
        titel: project.title,
        shorttitel: project.shorttitle,
        tags: project.tags,
        year: project.year,
        cooperation: cooperationName, // Replacing the cooperationId with the actual name
        cooperationName: project.cooperationName, // If this field exists separately
        team: project.team,
        position: project.position,
        content: contentData
      };
    }));

    // Step 6: Assign the project data to the student object
    projectData.forEach((project, index) => {
      obj[`projekt${index + 1}`] = project;
    });

  } catch (err) {
    console.log('Error:', err);
  } finally {
    // Pretty-print the entire student object with content for better visibility
    console.log('Student Data: ', JSON.stringify(obj, null, 2));
    io.emit('studentData', obj); // Emit the assembled student data
  }
}

// Call the function for student ID 2
selectStudent(2);
