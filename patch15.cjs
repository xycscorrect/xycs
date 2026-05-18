const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// I will split manually
html = html.split('<script>\\nwindow.extractImageUrl').join('<script>\\nwindow.extractImageUrl');

fs.writeFileSync('index.html', html);
console.log('fixed script tag 2');
