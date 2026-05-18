const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    'let botChats = {};',
    "let botChats = DB.get('botChats', {});"
);

html = html.replace(
    'renderBotChat();',
    "DB.set('botChats', botChats); renderBotChat();"
);
html = html.replace(
    'renderBotChat();',
    "DB.set('botChats', botChats); renderBotChat();"
);
html = html.replace(
    'renderBotChat();',
    "DB.set('botChats', botChats); renderBotChat();"
);
html = html.replace(
    'renderBotChat();',
    "DB.set('botChats', botChats); renderBotChat();"
);
html = html.replace(
    'renderBotChat();',
    "DB.set('botChats', botChats); renderBotChat();"
);

fs.writeFileSync('index.html', html);
console.log('patched bot saving!');
