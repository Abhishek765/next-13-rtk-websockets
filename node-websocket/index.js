// const WebSocket = require("ws");
// const wss = new WebSocket.Server({ port: 8080 });

// wss.on("connection", (ws) => {
//   // Handle incoming messages
//   ws.on("message", (message) => {
//     // Broadcast the received message to all connected clients
//     wss.clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });
// });

const { WebSocketServer } = require("ws");
const sockserver = new WebSocketServer({ port: 8080 });

sockserver.on("connection", (ws) => {
  console.log("New client connected!");
  ws.send(`{ "init": "connection established" }`);
  ws.on("close", () => console.log("Client has disconnected!"));
  //   ws.on("message", (data) => {
  //     sockserver.clients.forEach((client) => {
  //       console.log(`distributing message: ${data}`);
  //       client.send(`${data}`);
  //     });
  //   });
  // Handle incoming messages
  ws.on("message", (message) => {
    // Broadcast the received message to all connected clients
    sockserver.clients.forEach((client) => {
      if (client !== ws && client.readyState) {
        const parsedMessage = JSON.parse(message);
        const stringifiedMessage = JSON.stringify(parsedMessage);

        // console.log({ message: stringifiedMessage });

        // console.log({ message: message.toJSON() });
        client.send(`{ "send": "${message}" }`);
      }
    });
  });
  ws.onerror = function () {
    console.log("websocket error");
  };
});
