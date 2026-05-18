const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const fExtract = `window.extractImageUrl = function(input) {
    if(!input) return input;
    let match = input.match(/src=["']([^"']+)["']/);
    if(match) return match[1];
    let hrefMatch = input.match(/href=["']([^"']+)["']/);
    if(hrefMatch && input.match(/<a /)) return hrefMatch[1];
    let urlMatch = input.match(/(https?:\\/\\/[^\\s"'<>]+)/);
    if (urlMatch) return urlMatch[1];
    return input;
};`;

// Remove original definition
html = html.replace(fExtract, '');

// Insert just inside <script>
html = html.replace('<script>', '<script>\\n' + fExtract);

fs.writeFileSync('index.html', html);
console.log('moved extract function');
