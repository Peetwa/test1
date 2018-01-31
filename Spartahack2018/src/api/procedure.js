/**
 * Project: Spartahack2018
 * File name: procedure
 * Created by:  joshbenner on 1/21/18.
 *
 * Outside references:
 *
 * Purpose:
 */
'use strict';

const moment = require("moment");

module.exports = function( router, User ) {

    /**
     * Start a procedure
     */
    router.post('/procedure/start/', function(req, res){
        User.findOneAndUpdate({"firstName": "Peter"}, {$set: {startTime: new Date().toISOString()}}, {new: true}, function(err, user){
            if(err){
                return res.status(500).json({message: `Failed to start the procedure`});
            }
            return res.status(200).json({'user': user, message: `The procedure has started`});
        });
    });

    /**
     * End a procedure
     */
    router.post('/procedure/end/', function(req, res){
        User.findOneAndUpdate({"firstName": "Peter"}, {$set: {endTime: new Date().toISOString()}}, {new: true}, function(err, user){
            if(err){
                return res.status(500).json({message: `Failed to end the procedure`});
            }
            return res.status(200).json({'user': user, message: `The procedure has ended`});
        });
    });

    /**
     * Get how long the procedure is so far
     */
    router.get('/procedure/length', function(req, res){
        User.findOneAndUpdate({"firstName": "Peter"}, {new: true}, function(err, user){
            if(err){
                return res.status(500).json({message: `Sorry we couldn't determine how long the procedure was`});
            }
            return res.status(200).json({'user': user, message: `The current duration of the procedure is ${parseInt(moment.duration(moment().diff(user.startTime)).asHours())} hours and ${parseInt(moment.duration(moment().diff(user.startTime)).asMinutes())} as minutes`});
        });
    });
};