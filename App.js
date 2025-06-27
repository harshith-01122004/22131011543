import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import ShortenerPage from './pages/ShortenerPage';
import StatisticsPage from './pages/StatisticsPage';

const App = () => (
  <BrowserRouter>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>URL Shortener</Typography>
        <Button color="inherit" component={Link} to="/">Shortener</Button>
        <Button color="inherit" component={Link} to="/stats">Statistics</Button>
      </Toolbar>
    </AppBar>
    <Routes>
      <Route path="/" element={<ShortenerPage />} />
      <Route path="/stats" element={<StatisticsPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
