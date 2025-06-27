import express from 'express';
import { errorLogger } from './middleware/errorLogger';

const app = express();

// Add the error logger middleware for all routes
app.use(errorLogger('handler'));

app.get('/test', (req, res, next) => {
    try {
        // ... your logic ...
        res.send('OK');
    } catch (err) {
        next(err);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
