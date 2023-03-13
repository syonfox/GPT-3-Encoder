// import {encode, decode, countTokens, tokenStats} from "gpt-3-encoder"
//or
const express = require('express');
const path = require('path');
const gptoken  = require('gptoken');

require('dotenv').config();


const streamOne  = require('./streamOne');

const {encode, decode, countTokens, tokenStats} = gptoken;

const aiia = require("./aiia");
// import aiia from "./aiia"
streamOne.test();

const str = 'This is an example sentence to try encoding out on!'
const encoded = encode(str)
console.log('Encoded this string looks like: ', encoded)

console.log('We can look at each token and what it represents')
for (let token of encoded) {
    console.log({token, string: decode([token])})
}

//example count tokens usage
if (countTokens(str) > 5) {
    console.log("String is over five tokens, inconcevable");
}


console.log("String Token Stats: ", tokenStats("foo foo bar bar baz"));

const decoded = decode(encoded)
console.log('We can decode it back into:\n', decoded)


aiia.init.openai(process.env.OPENAI_API_KEY)


const app = express();

// Serve the 'public' folder at the root of the application using an absolute path
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});