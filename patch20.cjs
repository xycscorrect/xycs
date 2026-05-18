const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace("let botChats = DB.get('botChats', {});\\\\nlet aiproChat = DB.get('aipro', []);", "let botChats = DB.get('botChats', {});\\nlet aiproChat = DB.get('aipro', []);");

fs.writeFileSync('index.html', html);
console.log('Fixed BotChats newline with replace');
