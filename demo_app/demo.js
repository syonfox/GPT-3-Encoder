// import {encode, decode, countTokens, tokenStats} from "gpt-3-encoder"
//or
const express = require('express');
const path = require('path');
const gptoken  = require('gptoken');

require('dotenv').config();


const streamOne  = require('./streamOne');

const {encode, decode, countTokens, tokenStats} = gptoken;

const utils = require("./utils");
const aiia = require("./aiia");

// import aiia from "./aiia"
// streamOne.test();

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
app.use('/js/gptoken', express.static(path.join(__dirname, 'node_modules/gptoken')));

const publicPath = path.join(__dirname, 'public');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/chat', async (req,res)=>{
    // let other = utils.reqGetData(req, 'other');//todo pig pub key
    // let username = utils.reqGetData(req, 'username');
    // let user = utils.reqGetData(req, 'user');
    // //todo
    // let group = utils.reqGetData(req, 'group');
    // let file = utils.reqGetData(req, 'file');

    // let uu, access;

    let uuid = utils.uuidv4();



    // if(!user) {
    //     user = username;
    // }
    // if(!user) {
    //     //well no user provided chat with the bot.
    //     console.warn("Chat: No other user found. NOt chating with anyone but yourself.")
    // }
    //this is importent it is the access check to ensure these useres are a part of the same organizations
    // this happens when a user is a member of the same group.  We can add this but editing the user group relations table
    // let ret = await rm.access_user_user_named.select('*', {u1:req.user.id, u2:user})
    // if(ret.success && ret.data[0]) {
    //     access = true;
    //     uu = ret.data[0]
    // }

    res.render('chat', {title: 'AIIA Chat' ,req});
})


app.use(express.static(publicPath));

// app.get(, (req, res) => {
//     res.sendFile(path.join(__dirname, 'node_modules', 'gptoken', 'browser.js'));
// });


// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});