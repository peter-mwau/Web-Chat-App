const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let messages = [];

wss.on('connection', (ws) => {
    // Send existing messages to the new client
    ws.send(JSON.stringify(messages));

    ws.on('message', (message) => {
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type === 'userJoined') {
            const joinMessage = {
                sender: 'System',
                text: `${parsedMessage.username} has joined the chat`,
                type: 'notification',
            };
            messages.push(joinMessage);

            // Broadcast the join message to all clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify([joinMessage]));
                }
            });
        } else {
            messages.push(parsedMessage);

            // Broadcast the new message to all clients
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify([parsedMessage]));
                }
            });
        }
    });
});

console.log('WebSocket server is running on ws://localhost:8080');