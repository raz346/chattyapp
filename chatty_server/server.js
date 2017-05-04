
const express = require('express');
const SocketServer = require('ws').Server;
const PORT = 3001;
const uuid = require('uuid');
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', function incoming(message) {
    const receivedMessage = JSON.parse(message);
    const sentMessage = {id: uuid.v1(), username : receivedMessage.username, content: receivedMessage.content};
      for(let client of wss.clients) {
      client.send(JSON.stringify(sentMessage));
      }
  });

  ws.on('close', () => console.log('Client disconnected'));
});
