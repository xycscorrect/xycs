const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/DB\\.set\\('botChats', botChats\\); /g, '');

const t1 = "window.tempBotImg = null;\\n    inp.value=''; inp.style.height='48px'; renderBotChat();";
const r1 = "window.tempBotImg = null;\\n    inp.value=''; inp.style.height='48px'; DB.set('botChats', botChats); renderBotChat();";
html = html.split(t1).join(r1);

const t2 = "ts: Date.now()\\n        });\\n        renderBotChat();";
const r2 = "ts: Date.now()\\n        });\\n        DB.set('botChats', botChats); renderBotChat();";
html = html.split(t2).join(r2);

const t3 = "else if(type === 'bot') { renderBotChat(); }";
const r3 = "else if(type === 'bot') { DB.set('botChats', botChats); renderBotChat(); }";
html = html.split(t3).join(r3);

const t4 = "botChats[currentBot] = botChats[currentBot].filter(m => m.id !== id);\\n        renderBotChat();";
const r4 = "botChats[currentBot] = botChats[currentBot].filter(m => m.id !== id);\\n        DB.set('botChats', botChats); renderBotChat();";
html = html.split(t4).join(r4);

const t5 = "else if(editingMsgType.type === 'bot') { renderBotChat(); }";
const r5 = "else if(editingMsgType.type === 'bot') { DB.set('botChats', botChats); renderBotChat(); }";
html = html.split(t5).join(r5);

fs.writeFileSync('index.html', html);
console.log('patched bot saving cleanly with splits!');
