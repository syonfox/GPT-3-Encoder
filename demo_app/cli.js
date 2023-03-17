

let chat = [];

let aiia = require('./aiia');
const {encode, decode, countTokens, tokenStats} = gptoken;

require("dotenv").config()
aiia.init()