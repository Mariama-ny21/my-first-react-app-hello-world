import axios from 'axios'; //Imports axios for making HTTP requests

//Defines API endpoint URLs for file scan, file report, and domain report

const API_URL = 'http://localhost:5000/api/scan';
const REPORT_URL = 'http://localhost:5000/api/report';
const DOMAIN_REPORT_URL = 'http://localhost:5000/api/domain-report';

// Exports three async functions
// Functions to scan a file using the backend API

export const scanFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error scanning file:', error.response || error.message || error);
    throw error;
  }
};

export const getFileReport = async (resource) => {
  try {
    const response = await axios.post(REPORT_URL, { resource });
    return response.data;
  } catch (error) {
    console.error('Error fetching report:', error.response || error.message || error);
    throw error;
  }
};

export const getDomainReport = async (domain) => {
  try {
    const response = await axios.post(DOMAIN_REPORT_URL, { domain });
    return response.data;
  } catch (error) {
    console.error('Error fetching domain report:', error.response || error.message || error);
    throw error;
  }
};

/**
 * Exports three async functions:

scanFile(file):
Uploads a file to the backend using multipart/form-data.
Returns the scan result from the backend.

getFileReport(resource):
Requests a scan report for a specific file/resource from the backend.
Returns the report data.

getDomainReport(domain):
Requests a domain report from the backend for a given domain.
Returns the domain report data.
All functions handle errors by logging them and re-throwing for the caller to handle.
This file acts as an API helper for the React frontend to communicate with your backend.
 */