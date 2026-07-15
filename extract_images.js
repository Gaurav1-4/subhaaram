const fs = require('fs');
const content = fs.readFileSync('zareqia.js', 'utf8');
const urls = content.match(/https?:\/\/[^\s"'`]+(?:png|jpe?g|gif|webp|svg)/gi) || [];
const relativeUrls = content.match(/\/[^\s"'`]+(?:png|jpe?g|gif|webp|svg)/gi) || [];
console.log('Absolute URLs:', [...new Set(urls)].slice(0, 20));
console.log('Relative URLs:', [...new Set(relativeUrls)].slice(0, 20));
