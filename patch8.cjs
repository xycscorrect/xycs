const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const helper = `window.extractImageUrl = function(input) {
    if(!input) return input;
    let match = input.match(/src=["']([^"']+)["']/);
    if(match) return match[1];
    let hrefMatch = input.match(/href=["']([^"']+)["']/);
    if(hrefMatch && input.match(/<a /)) return hrefMatch[1];
    let urlMatch = input.match(/(https?:\\/\\/[^\\s"'<>]+)/);
    if (urlMatch) return urlMatch[1];
    return input;
};
    function generateId`;

html = html.replace('    function generateId', helper);

// patch saveBg
html = html.replace(
    `let url = document.getElementById('admin-bg-url').value;
    settings.bgUrl = url;`,
    `let url = extractImageUrl(document.getElementById('admin-bg-url').value);
    settings.bgUrl = url;
    document.getElementById('admin-bg-url').value = url;`
);

// patch saveProfile
html = html.replace(
    `viewProfUser.bgLink = document.getElementById('prof-bg-input').value;`,
    `viewProfUser.bgLink = extractImageUrl(document.getElementById('prof-bg-input').value);`
);

fs.writeFileSync('index.html', html);
console.log('patched image extract');
