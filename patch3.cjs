const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add VIP Panel HTML globally
html = html.replace('<!-- Profil Modal & Settings -->', `
    <!-- VIP Modal / Panel -->
    <div id="modal-image-preview" class="hidden fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 cursor-pointer" onclick="this.classList.add('hidden')">
        <img id="image-preview-content" class="max-w-full max-h-full rounded-lg shadow-2xl object-contain">
    </div>

    <div id="modal-vip" class="hidden fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
        <div class="bg-gray-800 rounded-2xl w-full max-w-sm border border-yellow-600 overflow-hidden shadow-2xl">
            <div class="h-20 bg-gradient-to-r from-yellow-500 to-yellow-700 flex items-center justify-center">
                <h2 class="text-2xl font-bold text-white shadow-sm font-sans tracking-widest"><i class="fas fa-crown text-yellow-300"></i> MENU VIP <i class="fas fa-crown text-yellow-300"></i></h2>
            </div>
            <div class="p-6">
                <p class="text-sm text-gray-300 mb-4 text-center">Fitur VIP khusus untuk user berdonasi. Dapatkan kelebihan warna spesial, custom badge, dan prioritas antrian.</p>
                <div class="space-y-2">
                    <button class="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 rounded transition">Beli VIP</button>
                    <button class="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded transition" onclick="document.getElementById('modal-vip').classList.add('hidden')">Tutup</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Profil Modal & Settings -->
`);

// 2. Add function for image preview
html = html.replace(
    `let imgBlock = m.img ? \`<img src="\${m.img}" class="mt-2 rounded-lg max-h-64 cursor-pointer hover:opacity-90 max-w-full" onclick="window.open(this.src)">\` : '';`,
    `let imgBlock = m.img ? \`<img src="\${m.img}" class="mt-2 rounded-lg max-h-64 cursor-pointer hover:opacity-90 max-w-full" onclick="window.previewImage(this.src)">\` : '';`
);

html = html.replace(
    'function generateId() {',
    `window.previewImage = function(src) {
        document.getElementById('image-preview-content').src = src;
        document.getElementById('modal-image-preview').classList.remove('hidden');
    };
    function generateId() {`
);

// 3. Add background profile link to Edit Profile
html = html.replace(
    `<select id="prof-theme-input" class="hidden w-full bg-gray-900 border border-gray-600 rounded p-1 mb-2 text-xs text-white outline-none">`,
    `<input type="text" id="prof-bg-input" class="hidden w-full bg-gray-900 border border-gray-600 rounded p-2 mb-2 text-xs text-white outline-none" placeholder="Link BG Profil (URL img)">
     <select id="prof-theme-input" class="hidden w-full bg-gray-900 border border-gray-600 rounded p-1 mb-2 text-xs text-white outline-none">`
);

html = html.replace(
    `document.getElementById('prof-theme-input').value = viewProfUser.theme || 'default';`,
    `document.getElementById('prof-bg-input').value = viewProfUser.bgLink || '';
    document.getElementById('prof-bg-input').classList.remove('hidden');
    document.getElementById('prof-theme-input').value = viewProfUser.theme || 'default';`
);

html = html.replace(
    `viewProfUser.theme = document.getElementById('prof-theme-input').value;`,
    `viewProfUser.bgLink = document.getElementById('prof-bg-input').value;
    document.getElementById('prof-bg-input').classList.add('hidden');
    viewProfUser.theme = document.getElementById('prof-theme-input').value;`
);

html = html.replace(
    `document.getElementById('profile-card').firstElementChild.className = headerCls;`,
    `document.getElementById('profile-card').firstElementChild.className = headerCls;
    if(viewProfUser.bgLink) {
        document.getElementById('profile-card').firstElementChild.style.backgroundImage = \`url('\${viewProfUser.bgLink}')\`;
        document.getElementById('profile-card').firstElementChild.style.backgroundSize = 'cover';
        document.getElementById('profile-card').firstElementChild.style.backgroundPosition = 'center';
    } else {
        document.getElementById('profile-card').firstElementChild.style.backgroundImage = '';
    }`
);

// 4. Add action in nav
html = html.replace(
    `<button onclick="nav('chats')" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-gray-700 transition" id="nav-chats">
                        <i class="fas fa-comments w-5 text-center"></i> Chats Global
                    </button>`,
    `<button onclick="nav('chats')" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-gray-700 transition" id="nav-chats">
                        <i class="fas fa-comments w-5 text-center"></i> Chats Global
                    </button>
                    <button onclick="document.getElementById('modal-vip').classList.remove('hidden')" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-gray-700 transition text-yellow-400">
                        <i class="fas fa-crown w-5 text-center"></i> Menu VIP
                    </button>`
);

// Write to index.html
fs.writeFileSync('index.html', html);
console.log('patched 3 done');
