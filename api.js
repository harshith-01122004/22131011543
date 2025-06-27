import axios from 'axios';
import { logAction } from './logging';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your backend port
});

export const shortenUrls = async (urls) => {
  try {
    await logAction('shortenUrls', { urls });
    const response = await api.post('/api/shorten/batch', urls);
    return response.data;
  } catch (error) {
    await logAction('shortenUrlsError', { error: error.message });
    throw error;
  }
};

export const getUrlStats = async () => {
  try {
    await logAction('getUrlStats', {});
    const response = await api.get('/api/stats');
    return response.data;
  } catch (error) {
    await logAction('getUrlStatsError', { error: error.message });
    throw error;
  }
};
