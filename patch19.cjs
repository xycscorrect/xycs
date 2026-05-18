const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.split("let botChats = DB.get('botChats', {});\\nlet aiproChat").join("let botChats = DB.get('botChats', {});\\nlet aiproChat");

fs.writeFileSync('index.html', html);
console.log('Fixed BotChats newline with split');
