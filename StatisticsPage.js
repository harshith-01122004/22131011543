import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { getUrlStats } from '../services/api';

const StatisticsPage = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getUrlStats();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>URL Shortener Statistics</Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <List>
          {stats.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={<a href={item.shortUrl} target="_blank" rel="noopener noreferrer">{item.shortUrl}</a>}
                  secondary={
                    <>
                      <Typography component="span" display="block">Created: {item.createdAt}</Typography>
                      <Typography component="span" display="block">Expires: {item.expiryDate}</Typography>
                      <Typography component="span" display="block">Total Clicks: {item.totalClicks}</Typography>
                    </>
                  }
                />
              </ListItem>
              <Box sx={{ ml: 4 }}>
                <Typography variant="subtitle2">Click Details:</Typography>
                <List>
                  {item.clicks?.map((click, idx) => (
                    <ListItem key={idx}>
                      <ListItemText
                        primary={`${click.timestamp} - ${click.source}`}
                        secondary={`Location: ${click.location}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default StatisticsPage;
