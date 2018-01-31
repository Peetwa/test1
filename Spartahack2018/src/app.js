/**
 * Project: Spartahack2018
 * File name: index
 * Created by:  joshbenner on 1/20/18.
 *
 * Outside references:
 *
 * Purpose:
 */
"use strict";


const express = require('express');
const parser = require('body-parser');
const router = require('./api/index');

const app = express();
const http = require( "http" ).Server( app );
let io = require('socket.io')(http);

require('./database');
app.use(parser.json());
app.use('/', router);
app.use('/', express.static('./public'));


const PORT = 3000;

io.on('connection', function(socket){
    console.log('a user connected');
});

http.listen( PORT, function() {
    console.log( `listening on port :${PORT}` );
} );
    
