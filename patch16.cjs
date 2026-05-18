const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// The literal characters in the file are: < s c r i p t > \ n
// Let's replace them
html = html.replace(/<script>\\\\nwindow\\.extractImageUrl/, '<script>\\nwindow.extractImageUrl');

fs.writeFileSync('index.html', html);
console.log('fixed script tag 3');
