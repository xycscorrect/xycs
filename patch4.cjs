const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Reverse img and content order
html = html.replace(
    `            \${content}
            \${imgBlock}`,
    `            \${imgBlock}
            \${content}`
);

fs.writeFileSync('index.html', html);
console.log('Swapped imgBlock and content');
