const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

let currentVideoId = "QoytNH5Lq6M";
const io = socketIO(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? 'https://present-baps.netlify.app' : '*',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? 'https://present-baps.netlify.app' : '*',
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));

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

app.get('/api/getVideoId', (req, res) => {
  // Return the current video ID
  res.json({ videoId: currentVideoId });
});

app.post('/api/saveVideoId', (req, res) => {
  const { videoId } = req.body;

  // Save the new video ID
  currentVideoId = videoId;

  // Respond to the API request
  res.json({ success: true, message: 'Video ID saved successfully' });

  // Emit the updated video ID to connected clients (if using Socket.IO)
  io.emit('videoId', { videoId: currentVideoId });
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
