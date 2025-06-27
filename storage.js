const storage = new Map();

function saveUrl(shortcode, longUrl, expiresAt) {
    storage.set(shortcode, {
        longUrl,
        expiresAt,
        visits: 0
    });
}

function getUrl(shortcode) {
    const entry = storage.get(shortcode);
    if (!entry || (entry.expiresAt && new Date() > new Date(entry.expiresAt))) {
        return null;
    }
    entry.visits++;
    return entry.longUrl;
}

function getAnalytics(shortcode) {
    const entry = storage.get(shortcode);
    if (!entry) return null;
    return { visits: entry.visits };
}

function isShortcodeUnique(shortcode) {
    return !storage.has(shortcode);
}

function isValidShortcode(shortcode) {
    return /^[a-zA-Z0-9]{4,20}$/.test(shortcode);
}

module.exports = { saveUrl, getUrl, getAnalytics, isShortcodeUnique, isValidShortcode };
