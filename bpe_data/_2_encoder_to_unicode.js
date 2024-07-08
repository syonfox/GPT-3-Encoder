const fs = require('fs');
const path = require('path');

let files = [
    "encoder_p50k_base.json",
    "encoder_cl100k_base.json"
]


const encoder = JSON.parse(
    fs.readFileSync(path.join(__dirname, './encoder.json')));

console.log("Breaks stuff i think i might hav manualy made it a json -> js");

fs.writeFileSync('./encoderMapToTokens2.js', `module.exports = ${JSON.stringify(encoder)};`);
