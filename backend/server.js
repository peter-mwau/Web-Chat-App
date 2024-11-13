const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let messages = [];

wss.on('connection', (ws) => {
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

            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify([joinMessage]));
                }
            });
        } else {
            messages.push(parsedMessage);

            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify([parsedMessage]));
                }
            });
        }
    });
});

console.log('WebSocket server is running on ws://localhost:8080');