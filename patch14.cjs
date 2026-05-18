const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace('<script>\\\\nwindow.extractImageUrl', '<script>\\nwindow.extractImageUrl');

fs.writeFileSync('index.html', html);
console.log('fixed script tag');
