import { WebSocketServer } from 'ws';
import { prismaClient } from "db/index"

const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', function connection(ws) {
  console.log('New WebSocket connection established');

  ws.on('message', async function message(data) {
    try {
      // Create a new user in the database
      await prismaClient.user.create({
        data: {
          username: Math.random().toString(),
          password: Math.random().toString()
        }
      });
      
      // Echo the message back to the client
      ws.send(data);
    } catch (error) {
      console.error('Error creating user:', error);
      ws.send(JSON.stringify({ error: 'Failed to create user' }));
    }
  });

  ws.on('close', function close() {
    console.log('WebSocket connection closed');
  });

  ws.on('error', function error(err) {
    console.error('WebSocket error:', err);
  });
});

console.log('WebSocket server running on port 8081');