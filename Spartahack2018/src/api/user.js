/**
 * Project: Spartahack2018
 * File name: user
 * Created by:  joshbenner on 1/20/18.
 *
 * Outside references:
 *
 * Purpose:
 */
'use strict';

module.exports = function( router, User ) {

    /**
     * Create a patient
     * @return: a patient
     */
    router.post('/user/', function(req, res){
        const user = req.body
        console.log(`req: ${req.body}`);
        User.create(user, {new: true}, function(err, user){
            if(err){
                console.log(`err: ${JSON.stringify(err)}`);
                return res.status(500).json({message: `Failed to create the patient`});
            }
            return res.status(200).json({'user': user, message: `Successfully created the patient`});
        });
    });

    /**
     * Find a Patient/User
     * @return:
     */
    router.get('/user/:name', function(req, res){
        const firstName = req.params.name;
        User.findOne({"firstName": firstName}, function(err, user){
            if(err){
                return res.status(500).json({message: `Failed to find patient ${firstName}`});
            }
            return res.status(200).json({'user': user, message: `Successfully found the patient ${firstName}`});
        });
    });
};