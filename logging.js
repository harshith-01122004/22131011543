const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' });

function logMiddleware(req, res, next) {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logEntry = `${new Date().toISOString()} | ${req.method} ${req.url} | ${res.statusCode} | ${duration}ms\n`;
        logStream.write(logEntry);
    });
    next();
}

module.exports = logMiddleware;
