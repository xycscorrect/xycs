const fs = require('fs');
let code = fs.readFileSync('patch2.cjs', 'utf8');
code = code.split('const replStr = \\`<div').join('const replStr = `<div');
code = code.split('</button>\\`;').join('</button>`;');
fs.writeFileSync('patch2.cjs', code);
console.log("Fixed backticks.");
