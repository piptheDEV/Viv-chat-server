const WebSocket = require('ws');

const PORT = process.env.PORT || 10000;
const server = new WebSocket.Server({ port: PORT });

let clients = [];

server.on('connection', socket => {
    console.log('New connection');
    clients.push(socket);

    socket.on('message', message => {
        console.log('Received:', message);
        // Send to all other clients
        for (let client of clients) {
            if (client !== socket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        }
    });

    socket.on('close', () => {
        clients = clients.filter(c => c !== socket);
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on port', PORT);
