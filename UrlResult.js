import React from 'react';
import { Box, Typography } from '@mui/material';

const UrlResult = ({ originalUrl, shortUrl, expiryDate }) => {
  return (
    <Box sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
      <Typography>Original: {originalUrl}</Typography>
      <Typography>
        Shortened: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
      </Typography>
      <Typography>Expires: {expiryDate}</Typography>
    </Box>
  );
};

export default UrlResult;
