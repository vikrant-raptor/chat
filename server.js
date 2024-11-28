import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3030;

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://curious-pie-ae0955.netlify.app', // Frontend URL
        methods: ['GET', 'POST']
    }
});

// Routes
app.get('/', (req, res) => {
    res.send({ message: 'Chat Backend is running!' });
});

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Receive a message from the client
    socket.on('message', (data) => {
        console.log('Message received:', data);
        // Broadcast the message to all clients
        io.emit('message', data);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Chat server running at http://localhost:${port}`);
});
