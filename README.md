# 🔒 Interactive Web Application with Security Features

## 📋 Project Overview

This is an open-source project where I participated in building a "Hello World" React application that evolved into a comprehensive security scanning tool. What started as a simple React learning exercise has grown into a full-featured application that demonstrates real-world development practices and API integration.

A full-stack web application that allows users to upload files for virus scanning and check domain reputation using the VirusTotal API. Built with React frontend and Node.js/Express backend.

## 🌟 Features

- **File Upload & Virus Scanning**: Upload files and scan them for malware using VirusTotal API
- **Domain Security Check**: Check domain reputation and view WHOIS information
- **Real-time Results**: Get instant feedback on file safety and domain status
- **Responsive UI**: Clean, modern interface built with React and Vite
- **Secure API Integration**: Backend handles sensitive API calls to VirusTotal

## 🏗️ Project Structure

```
my-first-react-app-hello-world/
├── backend/                    # Express.js Backend
│   ├── server.js              # Main server file with API endpoints
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables (API keys)
│
├── my-react-app/              # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.jsx # File upload component
│   │   │   └── DomainSearch.jsx # Domain search component
│   │   ├── api/
│   │   │   └── fileScan.js    # API helper functions
│   │   └── App.jsx            # Main app component
│   ├── package.json           # Frontend dependencies
│   └── vite.config.js         # Vite configuration
│
└── README.md                  # This file
```

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite (build tool)
- Axios (HTTP client)
- CSS3 (styling)

**Backend:**
- Node.js
- Express.js (web framework)
- Multer (file upload handling)
- Axios (API requests)
- CORS (cross-origin support)
- dotenv (environment variables)

**External APIs:**
- VirusTotal API (file scanning & domain analysis)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm
- VirusTotal API key (free at [virustotal.com](https://www.virustotal.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mariama-ny21/my-first-react-app-hello-world.git
   cd my-first-react-app-hello-world
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```
   
   Create a `.env` file in the `backend` folder:
   ```env
   VIRUSTOTAL_API_KEY=your_virustotal_api_key_here
   ```

3. **Set up the Frontend**
   ```bash
   cd ../my-react-app
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   node server.js
   ```
   Backend will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
   ```bash
   cd my-react-app
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## 📖 Usage

### File Scanning
1. Click "Choose File" to select a file from your computer
2. Click "Scan File" to upload and scan for viruses
3. View the scan results showing threat detection status

### Domain Checking
1. Enter a domain name (e.g., `example.com`)
2. Click "Check Domain" to analyze domain reputation
3. View results including safety score and WHOIS information

## 🔐 Security Features

- API keys are stored securely in environment variables
- All file scanning is handled server-side
- CORS is properly configured for cross-origin requests
- Input validation on both frontend and backend

## 🌐 API Endpoints

- `POST /api/scan` - Upload and scan a file
- `GET /api/report/:resource` - Get scan report for a file
- `POST /api/domain-report` - Get domain reputation report

## 👩‍💻 Author

**Mariama N Nyodeka** - *Open Source Project, 2025*
- GitHub: [@Mariama-ny21](https://github.com/Mariama-ny21)

## 📄 License

This project is open source. License details to be determined by mentors.

