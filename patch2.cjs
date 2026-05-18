const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const t1 = `<div class="opacity-0 group-hover:opacity-100 transition absolute top-2 right-2 flex gap-1 bg-gray-800 p-1 rounded shadow">`;
const r1 = `<div class="opacity-0 group-hover:opacity-100 transition absolute top-2 right-2 flex gap-1 bg-gray-800 p-1 rounded shadow">
    <button onclick="bookmarkMsg('\${m.id}', '\${listType}', '\${listKey}')" class="text-gray-400 hover:text-yellow-400 p-1"><i class="fas fa-bookmark \${m.bookmarked ? 'text-yellow-400' : ''}"></i></button>`;

html = html.split(t1).join(r1);

const t2 = `c.innerHTML = botChats[currentBot].map(m => renderHtmlMsg(m, 'bot')).join('');`;
const r2 = `let bc = [...botChats[currentBot]].sort((a,b) => (b.bookmarked?1:0) - (a.bookmarked?1:0));
    c.innerHTML = bc.map(m => renderHtmlMsg(m, 'bot')).join('');`;

html = html.split(t2).join(r2);

const t3 = "function delMsg(id, type, key='') {";
const r3 = `window.bookmarkMsg = function(id, type, key='') {
        let items = type === 'global' ? globalChat : (type === 'bot' ? botChats[currentBot] : pms[key]);
        let m = items.find(x => x.id === id);
        if(m) { m.bookmarked = !m.bookmarked; }
        if(type === 'global') { DB.set('global', globalChat); renderGlobal(); }
        else if(type === 'bot') { renderBotChat(); }
        else { DB.set('pms', pms); renderPMChat(); }
    };
    function delMsg(id, type, key='') {`;

html = html.split(t3).join(r3);

fs.writeFileSync('index.html', html);
console.log("Bookmarks patched final.");
