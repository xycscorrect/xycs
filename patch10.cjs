const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const cleanupStr = `// Clean up bad URLs in DB
if(settings.bgUrl) settings.bgUrl = extractImageUrl(settings.bgUrl);
if(settings.logos) {
    Object.keys(settings.logos).forEach(k => {
        settings.logos[k] = extractImageUrl(settings.logos[k]);
    });
}
Object.keys(users).forEach(u => {
    if(users[u].photo) users[u].photo = extractImageUrl(users[u].photo);
    if(users[u].bgLink) users[u].bgLink = extractImageUrl(users[u].bgLink);
});
DB.set('settings', settings);
DB.set('users', users);
`;

html = html.replace("let aiproChat = DB.get('aipro', []);", "let aiproChat = DB.get('aipro', []);\\n" + cleanupStr);

fs.writeFileSync('index.html', html);
console.log("Cleanup added");
