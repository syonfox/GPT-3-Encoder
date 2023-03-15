//aiia/expressai


//authenticate with jan jwt

// creat an aiia instance in the server for handling this user.

//allow api interaction from the frontend through socketio link


// we need:
// api

// one liner docs: jan tab tab :) init -> checkAuthenticated generateToken
//
let jan = require('jan');
let pool = new Pool({

})
jan.init( {
    jwtSecret: "holamonami_where_did_yougetthis323cool-idea:(Sajkda"
})



let exp = require('express');

let socketio = require('socket.io');

let aiia = require('aiia');

app.get("/getAssistant", jan.checkAuthenticated, (req,res)=> {

    //billing model
    //users -> usage -> bill

    //

    //users
    //groups
    //clients -> customers -> cards
    //usage -> clients -> bills
    //access -> sites/apis


    // Ok lets actualy make somthing end goal.

    // AN chat/ text api that is so easy and only marked up by 100%

    // to do this we need to provide both at frontend and a backend
    // and elagent api
    // a billing system
    // a sales page
    // a frontend component




    let user = req.user

    // let


})

// Authenticate with Jan JWT
jan.authenticateWithJwt(function (err, response) {
    if (err) {
        console.error('Jan JWT authentication error:', err);
        return;
    }

// Create an AIIA instance for handling this user
    let aiiaInstance = aiia.createInstance(response.accessToken);

// Create an Express app
    let app = exp();

// Allow API interaction from the frontend through Socket.io link
    let io = socketio.listen(app.listen(process.env.PORT || 3000));

// Handle incoming API requests through Socket.io
    io.on('connection', function (socket) {
        socket.on('aiiaRequest', function (request) {
            aiiaInstance.processRequest(request, function (response) {
                socket.emit('aiiaResponse', response);
            });
        });
    });
});