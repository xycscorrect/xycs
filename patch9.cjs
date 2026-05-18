const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    `function saveLogos() {
    Object.keys(LOGO_FIELDS).forEach(k => {
        settings.logos[k] = document.getElementById(\`inp-logo-\${k}\`).value;
    });`,
    `function saveLogos() {
    Object.keys(LOGO_FIELDS).forEach(k => {
        settings.logos[k] = extractImageUrl(document.getElementById(\`inp-logo-\${k}\`).value);
    });`
);

fs.writeFileSync('index.html', html);
console.log('patched saveLogos with extractImageUrl');
