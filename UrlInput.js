import React from 'react';
import { TextField, Grid, Button, Typography } from '@mui/material';

const UrlInput = ({ index, url, validity, shortcode, onChange, onRemove }) => {
  return (
    <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">URL {index + 1}</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Long URL"
          variant="outlined"
          value={url}
          onChange={(e) => onChange(index, 'url', e.target.value)}
          required
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          fullWidth
          label="Validity (minutes)"
          variant="outlined"
          type="number"
          value={validity}
          onChange={(e) => onChange(index, 'validity', e.target.value)}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          fullWidth
          label="Preferred Shortcode"
          variant="outlined"
          value={shortcode}
          onChange={(e) => onChange(index, 'shortcode', e.target.value)}
        />
      </Grid>
      {onRemove && (
        <Grid item xs={12}>
          <Button variant="outlined" color="error" onClick={() => onRemove(index)}>
            Remove
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default UrlInput;
