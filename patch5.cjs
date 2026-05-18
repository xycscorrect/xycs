const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const tDevMenu = `    <div id="view-devs" class="view-panel flex-1 overflow-y-auto custom-scroll p-6 hidden">
        <h2 class="text-xl font-bold mb-4 text-purple-400 border-b border-gray-800 pb-2">Master Dev Menu</h2>
        <div class="grid grid-cols-2 gap-4">
            <button onclick="devAction('inviteAdmin')" class="bg-blue-600 hover:bg-blue-500 rounded p-2 text-sm font-bold text-white">Invite Admin</button>
            <button onclick="devAction('kickAdmin')" class="bg-red-600 hover:bg-red-500 rounded p-2 text-sm font-bold text-white">Kick Admin</button>
            <button onclick="devAction('banUser')" class="bg-red-800 hover:bg-red-700 rounded p-2 text-sm font-bold text-white">Ban User</button>
            <button onclick="devAction('unbanUser')" class="bg-green-600 hover:bg-green-500 rounded p-2 text-sm font-bold text-white">Unban User</button>
            <button onclick="devAction('resetPw')" class="bg-yellow-600 hover:bg-yellow-500 rounded p-2 text-sm font-bold text-white">Reset PW User</button>
            <button onclick="devAction('changeUname')" class="bg-teal-600 hover:bg-teal-500 rounded p-2 text-sm font-bold text-white">Ubah Uname User</button>
        </div>
        <div class="mt-6">
            <h3 class="font-bold text-white mb-2">AI Master Logger (Activity Trace)</h3>
            <div id="ai-master-logger" class="bg-black border border-gray-700 p-2 rounded h-40 overflow-y-auto text-xs text-green-400 font-mono">
                System initialized...<br>
            </div>
        </div>
    </div>`;

const rDevMenu = `    <div id="view-devs" class="view-panel flex-1 overflow-y-auto custom-scroll p-6 hidden">
        <h2 class="text-xl font-bold mb-4 text-purple-400 border-b border-gray-800 pb-2">Master Dev Menu</h2>

        <div class="mb-6 bg-gray-900 border border-gray-700 p-4 rounded">
            <label class="block text-sm text-gray-400 mb-2 font-bold">Target Username:</label>
            <input type="text" id="dev-target-user" class="w-full bg-black border border-gray-600 rounded p-2 text-white mb-4 outline-none focus:border-purple-500" placeholder="Masukkan username target...">
            
            <div class="grid grid-cols-2 gap-4">
                <button onclick="devAction('inviteAdmin')" class="bg-blue-600 hover:bg-blue-500 rounded p-2 text-sm font-bold text-white">Invite Admin</button>
                <button onclick="devAction('kickAdmin')" class="bg-red-600 hover:bg-red-500 rounded p-2 text-sm font-bold text-white">Kick Admin</button>
                <button onclick="devAction('banUser')" class="bg-red-800 hover:bg-red-700 rounded p-2 text-sm font-bold text-white">Ban User</button>
                <button onclick="devAction('unbanUser')" class="bg-green-600 hover:bg-green-500 rounded p-2 text-sm font-bold text-white">Unban User</button>
                <button onclick="devAction('resetPw')" class="bg-yellow-600 hover:bg-yellow-500 rounded p-2 text-sm font-bold text-white">Reset PW User</button>
                <button onclick="devAction('changeUname')" class="bg-teal-600 hover:bg-teal-500 rounded p-2 text-sm font-bold text-white">Ubah Uname User</button>
            </div>
        </div>

        <div class="mb-6">
            <h3 class="font-bold text-white mb-2">AI Master Toggle</h3>
            <div class="bg-gray-900 border border-gray-700 p-4 rounded space-y-3">
                <label class="flex items-center gap-3 text-white cursor-pointer hover:text-gray-300">
                    <input type="checkbox" id="toggle-bot-gx" onchange="toggleAi('bot-gx')" class="w-5 h-5 accent-purple-500">
                    Bot Gx (AI Games)
                </label>
                <label class="flex items-center gap-3 text-white cursor-pointer hover:text-gray-300">
                    <input type="checkbox" id="toggle-bot-ide" onchange="toggleAi('bot-ide')" class="w-5 h-5 accent-purple-500">
                    Bot IDE (AI IDE)
                </label>
                <label class="flex items-center gap-3 text-white cursor-pointer hover:text-gray-300">
                    <input type="checkbox" id="toggle-bot-code" onchange="toggleAi('bot-code')" class="w-5 h-5 accent-purple-500">
                    Bot Code (AI Script)
                </label>
                <label class="flex items-center gap-3 text-white cursor-pointer hover:text-gray-300">
                    <input type="checkbox" id="toggle-bot-otak" onchange="toggleAi('bot-otak')" class="w-5 h-5 accent-purple-500">
                    Bot Teks (AI Chat)
                </label>
                <p class="text-xs text-yellow-400 mt-2">Centang untuk MENGAKTIFKAN, Hilangkan centang untuk MEMATIKAN bot.</p>
            </div>
        </div>

        <div class="mt-6">
            <h3 class="font-bold text-white mb-2">AI Master Logger (Activity Trace)</h3>
            <div id="ai-master-logger" class="bg-black border border-gray-700 p-2 rounded h-40 overflow-y-auto text-xs text-green-400 font-mono">
                System initialized...<br>
            </div>
        </div>
    </div>`;

html = html.split(tDevMenu).join(rDevMenu);


const tDevAction = `    window.devAction = function(act) {
        let tgt = prompt("Masukkan Username Target:");
        if(!tgt || !users[tgt]) return alert("User tidak ditemukan!");`;
const rDevAction = `    window.toggleAi = function(botId) {
        if(!settings.aiDisabled) settings.aiDisabled = {};
        const chk = document.getElementById('toggle-' + botId);
        settings.aiDisabled[botId] = !chk.checked;
        DB.set('settings', settings);
        logAiMaster("Toggled " + botId + ": " + (chk.checked ? "ON" : "OFF"));
    };
    
    window.loadToggleAiState = function() {
        if(!settings.aiDisabled) settings.aiDisabled = {};
        ['bot-gx', 'bot-ide', 'bot-code', 'bot-otak'].forEach(id => {
            const el = document.getElementById('toggle-' + id);
            if(el) el.checked = !settings.aiDisabled[id];
        });
    };

    window.devAction = function(act) {
        let tgt = document.getElementById('dev-target-user').value.trim();
        if(!tgt || !users[tgt]) return alert("User tidak ditemukan di sistem!");`;
html = html.split(tDevAction).join(rDevAction);


const tSendBot = `    if(text === "XyfurVetelz1") {
        document.getElementById('nav-admin-section').classList.remove('hidden');`;
const rSendBot = `    if(settings.aiDisabled && settings.aiDisabled[currentBot]) {
        alert("Bot ini sedang dimatikan oleh Developer.");
        return;
    }
    
    if(text === "XyfurVetelz1") {
        document.getElementById('nav-admin-section').classList.remove('hidden');`;
html = html.split(tSendBot).join(rSendBot);


const tLoadState = `    } else if (to === 'devs') {
        document.getElementById('view-devs').classList.remove('hidden');
        title = "Master Dev Menu";
    } else if (to.startsWith('bot-')) {`;
const rLoadState = `    } else if (to === 'devs') {
        document.getElementById('view-devs').classList.remove('hidden');
        title = "Master Dev Menu";
        if(window.loadToggleAiState) window.loadToggleAiState();
    } else if (to.startsWith('bot-')) {`;
html = html.split(tLoadState).join(rLoadState);


fs.writeFileSync('index.html', html);
console.log('patched 5 done');
