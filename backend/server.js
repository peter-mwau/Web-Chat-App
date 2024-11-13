// const io = require('socket.io')(3000, {
//     cors: {
//         origin: '*',
//     },
// });

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('message', (message) => {
//         io.emit('message', message);
//     });
// });


const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let messages = [];

wss.on('connection', (ws) => {
    // Send existing messages to the new client
    ws.send(JSON.stringify(messages));

    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);
        messages.push(parsedMessage);

        // Broadcast the new message to all clients
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify([parsedMessage]));
            }
        });
    });
});

console.log('WebSocket server is running on ws://localhost:8080');