const express = require('express');
const { saveUrl, getUrl, getAnalytics, isShortcodeUnique, isValidShortcode } = require('./storage');
const logMiddleware = require('./logging');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logMiddleware);

function generateShortcode() {
    return uuidv4().substring(0, 6);
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

// POST /shorturls
app.post('/shorturls', (req, res) => {
    const { url, validity, shortcode } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'url is required' });
    }
    if (!isValidUrl(url)) {
        return res.status(400).json({ error: 'invalid url format' });
    }

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + (validity || 30));

    let code;
    if (shortcode) {
        if (!isValidShortcode(shortcode)) {
            return res.status(400).json({ error: 'invalid shortcode format' });
        }
        if (!isShortcodeUnique(shortcode)) {
            return res.status(409).json({ error: 'shortcode already in use' });
        }
        code = shortcode;
    } else {
        code = generateShortcode();
    }

    saveUrl(code, url, expiresAt);
    res.status(201).json({
        shortLink: `http://localhost:${PORT}/${code}`,
        expiry: expiresAt.toISOString()
    });
});

// GET /:shortcode
app.get('/:shortcode', (req, res) => {
    const longUrl = getUrl(req.params.shortcode);
    if (!longUrl) {
        return res.status(404).json({ error: 'shortcode not found or expired' });
    }
    res.redirect(302, longUrl);
});

// GET /:shortcode/analytics
app.get('/:shortcode/analytics', (req, res) => {
    const analytics = getAnalytics(req.params.shortcode);
    if (!analytics) {
        return res.status(404).json({ error: 'shortcode not found' });
    }
    res.json(analytics);
});

app.listen(PORT, () => {
    console.log(`Server running on port 3000`);
});
