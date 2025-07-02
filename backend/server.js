require('dotenv').config(); // Library: Loads environment variables from .env file into process.env
const express = require('express'); // Framework: Imports the Express web framework for Node.js
const cors = require('cors'); // Library: Imports CORS middleware to enable Cross-Origin Resource Sharing, allowing the frontend to make requests to the backend
const multer = require('multer'); // Library: Imports Multer for handling file uploads (multipart/form-data)
const axios = require('axios'); // Library: Imports Axios for making HTTP requests to the VirusTotal API
const FormData = require('form-data'); // Library: Imports FormData for constructing form data for file uploads with Axios requests
const app = express(); // Framework: Creates an Express application instance
const upload = multer(); // Library: Initializes Multer for parsing multipart/form-data (file uploads)

const API_URL = 'https://www.virustotal.com/vtapi/v2/file/scan';
const REPORT_URL = 'https://www.virustotal.com/vtapi/v2/file/report';
const DOMAIN_REPORT_URL = 'https://www.virustotal.com/vtapi/v2/domain/report';
const API_KEY = process.env.VIRUSTOTAL_API_KEY;

app.use(cors());
app.use(express.json());

// Helper for error logging
function handleError(res, error) {
  if (error.response) {
    console.error('VirusTotal API error:', error.response.data);
    res.status(500).json({ error: error.response.data });
  } else {
    console.error('Server error:', error.message);
    res.status(500).json({ error: error.message });
  }
}

// GET route to verify API is live
app.get('/api/scan', (req, res) => {
  res.json({ message: 'API is live, but this endpoint requires a POST request to scan a file.' });
});

// POST /api/scan endpoint
app.post('/api/scan', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const MAX_SIZE = 5 * 1024 * 1024;
  if (req.file.size > MAX_SIZE) {
    return res.status(400).json({ error: 'File is too large. Max 5MB allowed.' });
  }

  const allowedTypes = [
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/pdf'
  ];
  if (!allowedTypes.includes(req.file.mimetype)) {
    return res.status(400).json({ error: 'Invalid file type.' });
  }

  const formData = new FormData();
  formData.append('file', req.file.buffer, req.file.originalname);
  formData.append('apikey', API_KEY);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: formData.getHeaders(),
    });
    res.json(response.data);
  } catch (error) {
    handleError(res, error);
  }
});

// POST /api/report endpoint (for file reports)
app.post('/api/report', async (req, res) => {
  const { resource } = req.body;
  if (!resource) {
    return res.status(400).json({ error: 'Missing resource identifier.' });
  }

  try {
    const response = await axios.post(REPORT_URL, null, {
      params: {
        apikey: API_KEY,
        resource,
      },
    });
    res.json(response.data);
  } catch (error) {
    handleError(res, error);
  }
});

// POST /api/domain-report endpoint (for domain reports)
app.post('/api/domain-report', async (req, res) => {
  const { domain } = req.body;
  if (!domain) {
    return res.status(400).json({ error: 'Missing domain.' });
  }

  try {
    const response = await axios.get(DOMAIN_REPORT_URL, {
      params: {
        apikey: API_KEY,
        domain,
      },
    });
    res.json(response.data);
  } catch (error) {
    handleError(res, error);
  }
});

app.listen(5000, () => console.log('Proxy server running on port 5000'));