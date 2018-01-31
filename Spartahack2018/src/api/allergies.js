/**
 * Project: Spartahack2018
 * File name: allergies
 * Created by:  joshbenner on 1/21/18.
 *
 * Outside references:
 *
 * Purpose:
 */
'use strict';

module.exports = function( router, User ) {


    /**
     * Get all the active tools
     * @return:
     */
    router.get('/allergy/', function(req, res){
        User.findOne({"firstName": "Peter"}, {"allergies": true},  function(err, user){
            if(err){
                return res.status(500).json({message: `Failed to grab the allergies`});
            }
            res.status(200).json({'allergies': user.allergies, message: `Peter's allergies are ${user.allergies}`});
        });
    });

    /**
     * Add the allergies to the patient
     * @param: allergies to add to the patient
     * @return:
     */
    router.post('/allergy/', function(req, res){
        const allergies = req.query.allergies;
        const allergyNames = allergies.split(",");
        User.findOneAndUpdate({"firstName": "Peter"}, {$push : {allergies: {$each: allergyNames}}}, {new: true}, function(err, user){
            if(err){
                return res.status(500).json({message: `Failed to add allergies`});
            }
            res.status(200).json({'user': user, message: `Successfully added ${allergyNames} as allergies`});
        });
    });
};