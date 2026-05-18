const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace("let botChats = DB.get('botChats', {});\\\\nlet aiproChat", "let botChats = DB.get('botChats', {});\\nlet aiproChat");

fs.writeFileSync('index.html', html);
console.log('Fixed BotChats newline');
