/**
 * Project: Spartahack2018
 * File name: tools
 * Created by:  joshbenner on 1/20/18.
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
    router.get('/tool/in/', function(req, res){
        User.findOne({"firstName": "Peter"}, {"inTools": true},  function(err, user){
            if(err){
                return res.status(500).json({message: `Failed to grab the activate tools`});
            }
            res.status(200).json({'user': user.inTools, message: `${user.inTools} are active`});
        });
    });

    /**
     * Get all the inactive tools
     * @return:
     */
    router.get('/tool/out/', function(req, res){
        User.findOne({"firstName": "Peter"}, {"outTools": true},  function(err, user){
            if(err){
                return res.status(500).json({message: `Failed to grab the inactive tools`});
            }
            res.status(200).json({'user': user.outTools, message: `${user.outTools} are inactive`});
        });
    });


    /**
     * Add the tools to the activated list
     * @param: tools to add to the patient
     * @return:
     */
    router.post('/tool/', function(req, res){
        const tools = req.query.tools;
        const toolNames = tools.split(",");
        User.findOneAndUpdate({"firstName": "Peter"}, {$push : {inTools: {$each: toolNames}}}, {new: true}, function(err, user){
            if(err){
                return res.status(500).json({message: `Failed to add tool to the activated tools`});
            }
            res.status(200).json({'user': user, message: `Successfully added ${toolNames} to the activated tools`});
        });
    });

    /**
     * Remove the tools from the activated list
     * @param: tools to add to the patient
     * @return:
     */
    router.post('/tool/delete/', function(req, res){
        const tools = req.query.tools;
        const toolNames = tools.split(",");
        User.findOneAndUpdate({"firstName": "Peter"}, {$pullAll : {inTools: toolNames}}, {new: true}, function(err, user){
            if(err){
                return res.status(500).json({message: `Failed to remove tool from the active tools`});
            }
            return res.status(200).json({'user': user, message: `Successfully removed ${user.inTools} from the active tools`});
        });
        // User.findOneAndUpdate({"firstName": "Peter"}, {$push : {inTools: {$each: toolNames}}}, {new: true}, function(err, user){
        //     if(err){
        //         return res.status(500).json({message: `Failed to remove tool from the active tools`});
        //     }
        //     return res.status(200).json({'user': user, message: `Successfully removed ${user.inTools} from the active tools`});
        // });

    });
};