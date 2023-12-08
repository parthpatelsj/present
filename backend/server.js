const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(cors());

let currentText = 'Default Text'; // Initialize with a default value

app.post('/api/sendText', (req, res) => {
  const { text } = req.body;

  // Update the currentText
  currentText = text;
  console.log('Received: ', currentText);

  // Emit the updated text to connected clients
  io.emit('text', { text: currentText });

  // Respond to the API request
  res.json({ success: true, message: 'Text sent successfully' });
});

// Initial connection, send the current text to the client
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.emit('text', { text: currentText });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
