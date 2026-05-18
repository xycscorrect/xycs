const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// remove previous declaration
html = html.replace("let botChats = DB.get('botChats', {});", "// let botChats removed here");

// insert near other globals
html = html.replace("let aiproChat = DB.get('aipro', []);", "let botChats = DB.get('botChats', {});\\nlet aiproChat = DB.get('aipro', []);");

fs.writeFileSync('index.html', html);
console.log('Fixed BotChats ReferenceError');
