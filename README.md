# 🎯 Present - BAPS Kirtan Presentation Tool

A modern, innovative presentation platform designed specifically for displaying BAPS kirtans (devotional songs) with synchronized video backgrounds and real-time remote control capabilities.

![Version](https://img.shields.io/badge/version-2.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18.0.0-61dafb)
![Node](https://img.shields.io/badge/Node-14.x-339933)

## ✨ Features

### Core Features
- 🎵 **1,955+ Kirtans** - Extensive library of devotional songs with complete lyrics
- 🎬 **Dynamic Video Backgrounds** - YouTube video integration with smooth transitions
- 🔄 **Real-Time Control** - Remote admin panel for live presentation management
- ⌨️ **Keyboard Shortcuts** - Comprehensive keyboard navigation (press `?` for help)
- 🎨 **Modern UI/UX** - Beautiful gradient designs with smooth animations
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices

### Innovative Features
- 🎯 **Dual Presentation Modes** - Toggle between lyrics and video with `P` key
- 🔍 **Advanced Search** - Instantly search through all kirtans
- ⚡ **Optimized Performance** - Efficient socket connections and state management
- 🎪 **Live Footer Broadcast** - Send real-time messages to all presentations
- 🛡️ **Security Hardened** - Input validation, XSS protection, and proper CORS
- ♿ **Accessible** - Keyboard navigation and focus management

## 🚀 Quick Start

### Prerequisites
- Node.js 14.x or higher
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/parthpatelsj/present.git
   cd present
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Configuration**

   Create `.env` file in the frontend directory:
   ```env
   # For local development
   REACT_APP_BACKEND_URL=http://localhost:5001

   # For production
   # REACT_APP_BACKEND_URL=https://your-backend-url.herokuapp.com
   ```

4. **Run the application**

   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:5001
   ```

   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm start
   # App opens on http://localhost:3000
   ```

## 🎮 Usage

### For Presenters

1. **Navigate to** `http://localhost:3000` (or your deployed URL)
2. **Press `K`** to open the kirtan selector
3. **Search** for your desired kirtan or scroll through the list
4. **Use arrow keys** to navigate slides
5. **Press `P`** to toggle between presentation and video mode
6. **Press `F`** for fullscreen
7. **Press `?`** for keyboard shortcuts help

### For Administrators

1. **Navigate to** `http://localhost:3000/admin`
2. **Footer Text Control**
   - Enter text to broadcast to all presentations
   - Click "Broadcast Text" to send
3. **Video Background Control**
   - Enter YouTube video ID (11 characters)
   - Example: `QoytNH5Lq6M` from `youtube.com/watch?v=QoytNH5Lq6M`
   - Click "Update Video" to apply to all presentations

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `↑` / `↓` | Navigate vertically |
| `K` | Toggle kirtan selector |
| `P` | Toggle video/presentation mode |
| `F` | Fullscreen mode |
| `O` | Slide overview |
| `S` | Speaker notes |
| `?` | Help menu |
| `Esc` | Exit fullscreen/Close modals |

## 🏗️ Architecture

```
present/
├── frontend/                 # React application
│   ├── src/
│   │   ├── Components/       # React components
│   │   │   ├── AdminPage.js           # Admin control panel
│   │   │   ├── KirtanSelector.js      # Kirtan selection modal
│   │   │   ├── KeyboardShortcuts.js   # Shortcuts help
│   │   │   ├── VideoBackground.js     # Video player
│   │   │   └── RevealComponents/      # Presentation components
│   │   ├── Slides/           # Slide components
│   │   ├── Themes/           # CSS themes
│   │   └── useKirtanContext.js  # State management
│   └── public/
│       └── kirtans/          # 1,955 kirtan JSON files
│
├── backend/                  # Express server
│   └── server.js             # API and WebSocket server
│
└── kirtan-scraper/          # Data collection tool
    └── kirtans.py           # Web scraper
```

## 🔧 API Documentation

### Endpoints

#### `GET /api/getVideoId`
Get current video ID
- **Response**: `{ videoId: string }`

#### `POST /api/saveVideoId`
Update video ID for all presentations
- **Body**: `{ videoId: string }` (11 characters)
- **Response**: `{ success: boolean, message: string }`

#### `POST /api/sendText`
Broadcast footer text to all presentations
- **Body**: `{ text: string }` (max 500 chars)
- **Response**: `{ success: boolean, message: string }`

#### `GET /api/health`
Health check endpoint
- **Response**: `{ status: 'healthy', timestamp: string }`

### WebSocket Events

#### Server → Client
- `text` - New footer text: `{ text: string }`
- `videoId` - New video ID: `{ videoId: string }`
- `connect` - Connection established
- `disconnect` - Connection closed

## 🚀 Deployment

### Frontend (Netlify)
The frontend deploys automatically via Netlify on every push to main branch.

**Manual deployment**:
```bash
cd frontend
npm run build
# Deploy the build/ folder to Netlify
```

### Backend (Heroku)
```bash
git push heroku main
```

**Environment Variables** (set in Heroku):
- `NODE_ENV=production`
- `PORT=5001` (or your preferred port)

## 🛠️ Development

### Code Quality
- **State Management**: Context API for global state
- **Styling**: Styled Components with consistent theming
- **Performance**: Optimized socket connections, memoization
- **Security**: Input validation, XSS protection, proper CORS
- **Accessibility**: Keyboard navigation, focus management

### Adding New Kirtans
1. Add kirtan JSON file to `frontend/public/kirtans/`
2. Run `npm run generate-kirtan-list` in frontend directory
3. Kirtan will appear in selector on next build

### Kirtan JSON Format
```json
{
  "title": "Kirtan Title",
  "verses": [
    "Verse 1 line 1",
    "Verse 1 line 2"
  ],
  "metadata": {
    "raag": "Musical raga",
    "category": "Category",
    "author": "Author name"
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **BAPS Swaminarayan Sanstha** - For the spiritual content
- **Reveal.js** - Presentation framework
- **Anirdesh.com** - Kirtan data source

## 📧 Support

For issues and questions:
- GitHub Issues: https://github.com/parthpatelsj/present/issues
- Live Demo: https://present-baps.netlify.app

---

Built with ❤️ for the BAPS community
