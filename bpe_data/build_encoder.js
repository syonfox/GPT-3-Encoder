const fs = require('fs');
const path = require('path');

const encoder = JSON.parse(fs.readFileSync(path.join(__dirname, './encoder.json')));

console.log("Breaks stuff i think i might hav manualy made it a json -> js");

fs.writeFileSync('./encoderMapToTokens2.js', `module.exports = ${JSON.stringify(encoder)};`);
