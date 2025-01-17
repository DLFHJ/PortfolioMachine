const osc = require("osc");

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
            } else {
                console.log("No arguments received for /exhibit/rfid");
            }
            break;

        case '/exhibit/motion':
            if (oscMsg.args && oscMsg.args.length > 0) {
                console.log("Motion argument:", oscMsg.args[0]);
            } else {
                console.log("No arguments received for /exhibit/motion");
            }
            break;

        default:
            console.log("Unknown OSC address:", oscMsg.address);
            break;
    }
});

// Error handling
udpPort.on("error", function (error) {
    console.log("Error occurred:", error);
});