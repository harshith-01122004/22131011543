import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Grid } from '@mui/material';
import UrlInput from '../components/UrlInput';
import UrlResult from '../components/UrlResult';
import { shortenUrls } from '../services/api';

const ShortenerPage = () => {
  const [urls, setUrls] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleAdd = () => {
    if (urls.length < 5) setUrls([...urls, { url: '', validity: '', shortcode: '' }]);
  };

  const handleRemove = (index) => {
    if (urls.length > 1) {
      const newUrls = [...urls];
      newUrls.splice(index, 1);
      setUrls(newUrls);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    for (const [i, item] of urls.entries()) {
      if (!item.url) {
        setError(`URL ${i + 1} is required`);
        return;
      }
      try {
        new URL(item.url);
      } catch (e) {
        setError(`URL ${i + 1} is invalid`);
        return;
      }
      if (item.validity && !/^\d+$/.test(item.validity)) {
        setError(`Validity for URL ${i + 1} must be a number`);
        return;
      }
    }

    try {
      const response = await shortenUrls(urls);
      setResults(response);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          {urls.map((url, index) => (
            <UrlInput
              key={index}
              index={index}
              url={url.url}
              validity={url.validity}
              shortcode={url.shortcode}
              onChange={handleChange}
              onRemove={urls.length > 1 ? handleRemove : null}
            />
          ))}
          <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
            <Grid item>
              <Button
                variant="outlined"
                onClick={handleAdd}
                disabled={urls.length >= 5}
              >
                Add URL
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Shorten
              </Button>
            </Grid>
          </Grid>
        </form>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {results.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Shortened URLs</Typography>
            {results.map((result, index) => (
              <UrlResult
                key={index}
                originalUrl={result.originalUrl}
                shortUrl={result.shortUrl}
                expiryDate={result.expiryDate}
              />
            ))}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ShortenerPage;
