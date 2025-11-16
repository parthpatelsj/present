const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

let currentVideoId = "QoytNH5Lq6M";

// Improved CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://present-baps.netlify.app']
  : ['http://localhost:3000', 'http://localhost:5000'];

const io = socketIO(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  },
});

app.use(express.json({ limit: '10kb' })); // Limit payload size

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
};

app.use(cors(corsOptions));

let currentText = ''; // Initialize empty

// Validation helpers
const isValidYouTubeId = (id) => {
  // YouTube video IDs are typically 11 characters
  return /^[a-zA-Z0-9_-]{11}$/.test(id);
};

const sanitizeText = (text) => {
  if (typeof text !== 'string') return '';
  // Limit text length and remove potential XSS
  return text.slice(0, 500).replace(/[<>]/g, '');
};

// API endpoints with validation
app.post('/api/sendText', (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid text provided'
      });
    }

    const sanitizedText = sanitizeText(text);
    currentText = sanitizedText;
    console.log('Received text:', currentText);

    io.emit('text', { text: currentText });

    res.json({ success: true, message: 'Text sent successfully' });
  } catch (error) {
    console.error('Error in sendText:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.get('/api/getVideoId', (req, res) => {
  try {
    res.json({ videoId: currentVideoId });
  } catch (error) {
    console.error('Error in getVideoId:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.post('/api/saveVideoId', (req, res) => {
  try {
    const { videoId } = req.body;

    if (!videoId || !isValidYouTubeId(videoId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid YouTube video ID. Must be 11 characters.'
      });
    }

    currentVideoId = videoId;
    console.log('Video ID updated to:', currentVideoId);

    io.emit('videoId', { videoId: currentVideoId });

    res.json({ success: true, message: 'Video ID saved successfully' });
  } catch (error) {
    console.error('Error in saveVideoId:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
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
