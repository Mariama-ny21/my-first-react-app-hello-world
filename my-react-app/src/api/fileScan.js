import axios from 'axios';

const API_URL = 'http://localhost:5000/api/scan';
const REPORT_URL = 'http://localhost:5000/api/report';
const DOMAIN_REPORT_URL = 'http://localhost:5000/api/domain-report';

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