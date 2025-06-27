import axios from 'axios';

export const logAction = async (action, details) => {
  try {
    await axios.post('http://localhost:3000/api/logs', {
      action,
      details,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Handle silently or show in UI, but do NOT use console.log
  }
};
